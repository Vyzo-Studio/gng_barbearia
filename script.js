const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');
const navLinks = Array.from(
  document.querySelectorAll('.main-nav a')
);

function updateHeaderState() {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle(
    'is-scrolled',
    window.scrollY > 20
  );
}

function openMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  mainNav.classList.add('is-open');
  menuToggle.classList.add('is-active');

  menuToggle.setAttribute(
    'aria-expanded',
    'true'
  );

  menuToggle.setAttribute(
    'aria-label',
    'Fechar menu'
  );

  document.body.classList.add(
    'menu-open'
  );
}

function closeMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  mainNav.classList.remove('is-open');
  menuToggle.classList.remove('is-active');

  menuToggle.setAttribute(
    'aria-expanded',
    'false'
  );

  menuToggle.setAttribute(
    'aria-label',
    'Abrir menu'
  );

  document.body.classList.remove(
    'menu-open'
  );
}

function toggleMenu() {
  if (!mainNav) {
    return;
  }

  if (
    mainNav.classList.contains(
      'is-open'
    )
  ) {
    closeMenu();
  } else {
    openMenu();
  }
}

function handleNavLinkClick() {
  closeMenu();
}

function handleOutsideClick(event) {
  if (
    !mainNav ||
    !menuToggle ||
    !mainNav.classList.contains(
      'is-open'
    )
  ) {
    return;
  }

  const clickedInsideMenu =
    mainNav.contains(
      event.target
    );

  const clickedToggle =
    menuToggle.contains(
      event.target
    );

  if (
    !clickedInsideMenu &&
    !clickedToggle
  ) {
    closeMenu();
  }
}

function handleEscape(event) {
  if (event.key !== 'Escape') {
    return;
  }

  closeMenu();
}

function handleResize() {
  if (
    window.innerWidth > 980
  ) {
    closeMenu();
  }
}

function smoothScrollToSection(event) {
  const anchor =
    event.currentTarget;

  const href =
    anchor.getAttribute(
      'href'
    );

  if (
    !href ||
    !href.startsWith('#') ||
    href === '#'
  ) {
    return;
  }

  const target =
    document.querySelector(
      href
    );

  if (!target) {
    return;
  }

  event.preventDefault();

  const headerHeight =
    siteHeader
      ? siteHeader.offsetHeight
      : 0;

  const targetPosition =
    target.getBoundingClientRect()
      .top +
    window.scrollY -
    headerHeight +
    1;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  closeMenu();
}

function setupSmoothScroll() {
  const anchors =
    Array.from(
      document.querySelectorAll(
        'a[href^="#"]'
      )
    );

  anchors.forEach(
    (anchor) => {
      anchor.addEventListener(
        'click',
        smoothScrollToSection
      );
    }
  );
}

function setupRevealAnimations() {
  const elements =
    Array.from(
      document.querySelectorAll(
        [
          '.section-heading',
          '.service-card',
          '.portfolio-intro',
          '.portfolio-card',
          '.portfolio-text-card',
          '.experience-content',
          '.experience-feature',
          '.membership-heading',
          '.membership-card',
          '.space-content',
          '.space-image',
          '.booking-content',
          '.location-heading',
          '.location-item'
        ].join(',')
      )
    );

  if (!elements.length) {
    return;
  }

  elements.forEach(
    (element) => {
      element.classList.add(
        'reveal-item'
      );
    }
  );

  if (
    !(
      'IntersectionObserver' in window
    )
  ) {
    elements.forEach(
      (element) => {
        element.classList.add(
          'is-visible'
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => {
            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target
              .classList.add(
                'is-visible'
              );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.12,
        rootMargin:
          '0px 0px -45px 0px'
      }
    );

  elements.forEach(
    (element) => {
      observer.observe(
        element
      );
    }
  );
}

function setupActiveNavigation() {
  const sections =
    Array.from(
      document.querySelectorAll(
        'main section[id]'
      )
    );

  if (
    !sections.length ||
    !navLinks.length ||
    !(
      'IntersectionObserver' in window
    )
  ) {
    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        const visibleEntries =
          entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

        if (
          !visibleEntries.length
        ) {
          return;
        }

        const activeId =
          visibleEntries[0]
            .target.id;

        navLinks.forEach(
          (link) => {
            const isActive =
              link.getAttribute(
                'href'
              ) ===
              `#${activeId}`;

            link.classList.toggle(
              'is-active',
              isActive
            );
          }
        );
      },
      {
        rootMargin:
          '-30% 0px -55% 0px',
        threshold: [
          0,
          0.1,
          0.25,
          0.5
        ]
      }
    );

  sections.forEach(
    (section) => {
      observer.observe(
        section
      );
    }
  );
}

function setupHeroMotion() {
  const heroMedia =
    document.querySelector(
      '.hero-media img'
    );

  if (!heroMedia) {
    return;
  }

  let ticking = false;

  function updateHero() {
    const scrollY =
      Math.max(
        0,
        window.scrollY
      );

    const movement =
      Math.min(
        scrollY * 0.08,
        45
      );

    heroMedia.style.transform =
      `scale(1.025) translateY(${movement}px)`;

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) {
      return;
    }

    ticking = true;

    window.requestAnimationFrame(
      updateHero
    );
  }

  window.addEventListener(
    'scroll',
    requestUpdate,
    {
      passive: true
    }
  );
}

function setupBrandStripMotion() {
  const track =
    document.querySelector(
      '.brand-strip-track'
    );

  if (!track) {
    return;
  }

  let ticking = false;

  function updateStrip() {
    const rect =
      track.parentElement
        .getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;

    const progress =
      Math.max(
        0,
        Math.min(
          1,
          (
            viewportHeight -
            rect.top
          ) /
          (
            viewportHeight +
            rect.height
          )
        )
      );

    const translate =
      (progress - 0.5) * 40;

    track.style.transform =
      `translateX(${translate}px)`;

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) {
      return;
    }

    ticking = true;

    window.requestAnimationFrame(
      updateStrip
    );
  }

  window.addEventListener(
    'scroll',
    requestUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    'resize',
    requestUpdate
  );

  requestUpdate();
}

function setupPortfolioTilt() {
  const cards =
    Array.from(
      document.querySelectorAll(
        '.portfolio-card'
      )
    );

  if (
    !cards.length ||
    window.matchMedia(
      '(pointer: coarse)'
    ).matches
  ) {
    return;
  }

  cards.forEach(
    (card) => {
      card.addEventListener(
        'mousemove',
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width;

          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;

          const rotateY =
            (x - 0.5) * 2;

          const rotateX =
            (0.5 - y) * 2;

          card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      );

      card.addEventListener(
        'mouseleave',
        () => {
          card.style.transform = '';
        }
      );
    }
  );
}

function setupPageShow() {
  window.addEventListener(
    'pageshow',
    () => {
      updateHeaderState();
      closeMenu();
    }
  );
}

menuToggle?.addEventListener(
  'click',
  toggleMenu
);

navLinks.forEach(
  (link) => {
    link.addEventListener(
      'click',
      handleNavLinkClick
    );
  }
);

document.addEventListener(
  'click',
  handleOutsideClick
);

document.addEventListener(
  'keydown',
  handleEscape
);

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener(
  'scroll',
  updateHeaderState,
  {
    passive: true
  }
);

updateHeaderState();
setupSmoothScroll();
setupRevealAnimations();
setupActiveNavigation();
setupHeroMotion();
setupBrandStripMotion();
setupPortfolioTilt();
setupPageShow();
