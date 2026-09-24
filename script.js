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

  if (window.scrollY > 20) {
    siteHeader.classList.add('is-scrolled');
  } else {
    siteHeader.classList.remove('is-scrolled');
  }
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

  document.body.classList.add('menu-open');
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

  document.body.classList.remove('menu-open');
}

function toggleMenu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!mainNav) {
    return;
  }

  if (mainNav.classList.contains('is-open')) {
    closeMenu();
    return;
  }

  openMenu();
}

function scrollToSection(target) {
  if (!target) {
    return;
  }

  const headerHeight =
    siteHeader
      ? siteHeader.offsetHeight
      : 0;

  const position =
    target.getBoundingClientRect().top +
    window.scrollY -
    headerHeight +
    1;

  window.scrollTo({
    top: position,
    behavior: 'smooth'
  });
}

function handleInternalLink(link, event) {
  const href = link.getAttribute('href');

  if (
    !href ||
    href.charAt(0) !== '#' ||
    href === '#'
  ) {
    return false;
  }

  const target = document.querySelector(href);

  if (!target) {
    return false;
  }

  event.preventDefault();
  event.stopPropagation();

  closeMenu();
  scrollToSection(target);

  return true;
}

function isWhatsAppLink(link) {
  const href = link.href || '';

  return (
    href.indexOf('wa.me/') !== -1 ||
    href.indexOf('api.whatsapp.com/') !== -1 ||
    href.indexOf('web.whatsapp.com/') !== -1
  );
}

function openWhatsApp(link, event) {
  if (!isWhatsAppLink(link)) {
    return false;
  }

  event.preventDefault();
  event.stopPropagation();

  closeMenu();

  const url = link.href;

  if (!url) {
    return true;
  }

  window.location.assign(url);

  return true;
}

function handleGlobalClick(event) {
  const link = event.target.closest('a[href]');

  if (!link) {
    return;
  }

  if (isWhatsAppLink(link)) {
    openWhatsApp(link, event);
    return;
  }

  handleInternalLink(
    link,
    event
  );
}

function handleDocumentClick(event) {
  if (
    !mainNav ||
    !menuToggle ||
    !mainNav.classList.contains('is-open')
  ) {
    return;
  }

  if (mainNav.contains(event.target)) {
    return;
  }

  if (menuToggle.contains(event.target)) {
    return;
  }

  closeMenu();
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

function handleResize() {
  if (window.innerWidth > 980) {
    closeMenu();
  }
}

function setupRevealAnimations() {
  const selectors = [
    '.section-heading',
    '.service-card',
    '.portfolio-intro',
    '.portfolio-card',
    '.portfolio-text-card',
    '.experience-content',
    '.experience-features > div',
    '.membership-heading',
    '.membership-benefit',
    '.membership-card',
    '.space-content',
    '.space-image',
    '.booking-content',
    '.location-heading',
    '.location-item'
  ];

  const elements = Array.from(
    document.querySelectorAll(
      selectors.join(',')
    )
  );

  if (!elements.length) {
    return;
  }

  elements.forEach(function (element) {
    element.classList.add('reveal-item');
  });

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (element) {
      element.classList.add('is-visible');
    });

    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          'is-visible'
        );

        observer.unobserve(
          entry.target
        );
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  elements.forEach(function (element) {
    observer.observe(element);
  });
}

function setupActiveNavigation() {
  const sections = Array.from(
    document.querySelectorAll(
      'main section[id]'
    )
  );

  if (
    !sections.length ||
    !navLinks.length ||
    !('IntersectionObserver' in window)
  ) {
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      const visible = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          return (
            b.intersectionRatio -
            a.intersectionRatio
          );
        });

      if (!visible.length) {
        return;
      }

      const id =
        visible[0].target.id;

      navLinks.forEach(function (link) {
        const active =
          link.getAttribute('href') ===
          '#' + id;

        if (active) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: [
        0,
        0.1,
        0.25,
        0.5
      ]
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function setupHeroMotion() {
  const heroImage =
    document.querySelector(
      '.hero-media img'
    );

  if (!heroImage) {
    return;
  }

  if (
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    return;
  }

  let ticking = false;

  function updateHero() {
    const scroll =
      Math.max(
        0,
        window.scrollY
      );

    const movement =
      Math.min(
        scroll * 0.08,
        45
      );

    heroImage.style.transform =
      'scale(1.025) translateY(' +
      movement +
      'px)';

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

  if (
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    return;
  }

  let ticking = false;

  function updateStrip() {
    if (!track.parentElement) {
      ticking = false;
      return;
    }

    const rect =
      track.parentElement
        .getBoundingClientRect();

    const viewport =
      window.innerHeight;

    const progress =
      Math.max(
        0,
        Math.min(
          1,
          (
            viewport -
            rect.top
          ) /
          (
            viewport +
            rect.height
          )
        )
      );

    const movement =
      (progress - 0.5) * 40;

    track.style.transform =
      'translateX(' +
      movement +
      'px)';

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
  if (
    window.matchMedia(
      '(pointer: coarse)'
    ).matches
  ) {
    return;
  }

  const cards = Array.from(
    document.querySelectorAll(
      '.portfolio-card'
    )
  );

  cards.forEach(function (card) {
    card.addEventListener(
      'mousemove',
      function (event) {
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
          'perspective(1000px) ' +
          'rotateX(' +
          rotateX +
          'deg) ' +
          'rotateY(' +
          rotateY +
          'deg)';
      }
    );

    card.addEventListener(
      'mouseleave',
      function () {
        card.style.transform = '';
      }
    );
  });
}

function initializeSite() {
  updateHeaderState();

  if (menuToggle) {
    menuToggle.addEventListener(
      'click',
      toggleMenu
    );
  }

  document.addEventListener(
    'click',
    handleGlobalClick
  );

  document.addEventListener(
    'click',
    handleDocumentClick
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

  window.addEventListener(
    'pageshow',
    function () {
      updateHeaderState();
      closeMenu();
    }
  );

  setupRevealAnimations();
  setupActiveNavigation();
  setupHeroMotion();
  setupBrandStripMotion();
  setupPortfolioTilt();
}

if (
  document.readyState === 'loading'
) {
  document.addEventListener(
    'DOMContentLoaded',
    initializeSite
  );
} else {
  initializeSite();
}
