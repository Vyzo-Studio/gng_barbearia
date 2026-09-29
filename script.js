const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const year = document.getElementById("year");

const bookingService = document.getElementById("booking-service");
const bookingDays = document.getElementById("booking-days");
const bookingTimes = document.getElementById("booking-times");
const bookingSubmit = document.getElementById("booking-submit");

const summaryService = document.getElementById("summary-service");
const summaryPrice = document.getElementById("summary-price");
const summaryDate = document.getElementById("summary-date");
const summaryTime = document.getElementById("summary-time");

const serviceLinks = Array.from(
  document.querySelectorAll("[data-service-link]")
);

const WHATSAPP_NUMBER = "5561994075539";
const SUPABASE_URL =
  "https://ueqfokfnjsjgocotvdae.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_YqWCSylIzOdQcxuJFpE9dQ_3mVV4oji";

const BUSINESS_TIMEZONE =
  "America/Sao_Paulo";

const SLOT_START_HOUR = 9;
const SLOT_START_MINUTE = 0;

const SLOT_END_HOUR = 19;
const SLOT_END_MINUTE = 30;

const SLOT_INTERVAL = 30;
const BOOKING_DAYS_COUNT = 7;

const MOBILE_BREAKPOINT = 680;
const MOBILE_SERVICES_VISIBLE_COUNT = 5;

let bookingBarber = null;
let bookingCustomerName = null;
let bookingCustomerPhone = null;

let summaryBarber = null;
let summaryCustomer = null;

let barbers = [];

let selectedBarberId = null;
let selectedBarberName = "";

let selectedDate = null;
let selectedTime = null;

let blockedSlots = new Map();

let bookingRequestInProgress = false;

let mobileServicesExpanded = false;
let servicesToggleButton = null;

let mobileBookingOpenStep = null;
let mobileNavTicking = false;

if (year) {
  year.textContent =
    new Date().getFullYear();
}

function isMobileLayout() {
  return window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  ).matches;
}

function setupDeviceDetection() {
  const userAgent =
    navigator.userAgent || "";

  const platform =
    navigator.platform || "";

  const touchPoints =
    navigator.maxTouchPoints || 0;

  const isIPadDesktopMode =
    platform === "MacIntel" &&
    touchPoints > 1;

  const isIOS =
    /iPhone|iPad|iPod/i.test(
      userAgent
    ) ||
    isIPadDesktopMode;

  const isAndroid =
    /Android/i.test(
      userAgent
    );

  const isMacOS =
    !isIOS &&
    /Macintosh|Mac OS X/i.test(
      userAgent
    );

  const isWindows =
    /Windows/i.test(
      userAgent
    );

  let device =
    "desktop";

  if (isIOS) {
    device =
      "ios";
  } else if (isAndroid) {
    device =
      "android";
  } else if (isMacOS) {
    device =
      "macos";
  } else if (isWindows) {
    device =
      "windows";
  } else if (
    isMobileLayout()
  ) {
    device =
      "mobile";
  }

  const root =
    document.documentElement;

  root.classList.remove(
    "device-ios",
    "device-android",
    "device-mobile",
    "device-macos",
    "device-windows",
    "device-desktop"
  );

  root.classList.add(
    "device-" + device
  );

  root.dataset.device =
    device;

  return device;
}

function getDeviceType() {
  return (
    document.documentElement
      .dataset.device ||
    setupDeviceDetection()
  );
}

function isMobileDevice() {
  const device =
    getDeviceType();

  return (
    device === "ios" ||
    device === "android" ||
    device === "mobile"
  );
}

function digitsOnly(value) {
  return String(
    value || ""
  ).replace(
    /\D/g,
    ""
  );
}

function buildWhatsappUrl(
  number,
  message
) {
  const cleanNumber =
    digitsOnly(
      number
    );

  const encodedMessage =
    encodeURIComponent(
      message || ""
    );

  if (
    isMobileDevice()
  ) {
    return (
      "https://wa.me/" +
      cleanNumber +
      "?text=" +
      encodedMessage
    );
  }

  return (
    "https://web.whatsapp.com/send?phone=" +
    cleanNumber +
    "&text=" +
    encodedMessage
  );
}

function readWhatsappLink(
  link
) {
  const href =
    link.getAttribute(
      "href"
    );

  if (!href) {
    return null;
  }

  try {
    const url =
      new URL(
        href,
        window.location.href
      );

    let number =
      "";

    if (
      url.hostname ===
        "wa.me" ||
      url.hostname.endsWith(
        ".wa.me"
      )
    ) {
      number =
        url.pathname.replace(
          /\D/g,
          ""
        );
    }

    if (
      url.hostname.includes(
        "web.whatsapp.com"
      ) ||
      url.hostname.includes(
        "api.whatsapp.com"
      )
    ) {
      number =
        digitsOnly(
          url.searchParams.get(
            "phone"
          )
        );
    }

    if (!number) {
      return null;
    }

    return {
      number,

      message:
        url.searchParams.get(
          "text"
        ) || ""
    };

  } catch (error) {
    return null;
  }
}

function setupDeviceAwareWhatsappLinks() {
  const links =
    Array.from(
      document.querySelectorAll(
        'a[href*="wa.me"], a[href*="whatsapp.com"]'
      )
    );

  links.forEach(
    function (link) {
      const data =
        readWhatsappLink(
          link
        );

      if (!data) {
        return;
      }

      link.href =
        buildWhatsappUrl(
          data.number,
          data.message
        );

      link.target =
        "_blank";

      link.rel =
        "noopener noreferrer";
    }
  );
}

function closeMenu() {
  if (
    !menuToggle ||
    !mainNav
  ) {
    return;
  }

  mainNav.classList.remove(
    "is-open"
  );

  menuToggle.classList.remove(
    "is-active"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Abrir menu"
  );

  document.body.classList.remove(
    "menu-open"
  );
}

function openMenu() {
  if (
    !menuToggle ||
    !mainNav
  ) {
    return;
  }

  mainNav.classList.add(
    "is-open"
  );

  menuToggle.classList.add(
    "is-active"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Fechar menu"
  );

  document.body.classList.add(
    "menu-open"
  );
}

function setupMenu() {
  if (
    !menuToggle ||
    !mainNav
  ) {
    return;
  }

  menuToggle.addEventListener(
    "click",
    function () {
      if (
        mainNav.classList.contains(
          "is-open"
        )
      ) {
        closeMenu();
      } else {
        openMenu();
      }
    }
  );

  mainNav
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      function (link) {
        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );

  document.addEventListener(
    "click",
    function (event) {
      if (
        !mainNav.classList.contains(
          "is-open"
        )
      ) {
        return;
      }

      if (
        mainNav.contains(
          event.target
        ) ||
        menuToggle.contains(
          event.target
        )
      ) {
        return;
      }

      closeMenu();
    }
  );

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key ===
        "Escape"
      ) {
        closeMenu();
      }
    }
  );

  window.addEventListener(
    "resize",
    function () {
      if (
        window.innerWidth >
        860
      ) {
        closeMenu();
      }
    }
  );
}

function setupMobileServices() {
  const servicesSection =
    document.getElementById(
      "servicos"
    );

  if (!servicesSection) {
    return;
  }

  const tableBody =
    servicesSection.querySelector(
      ".price-table tbody"
    );

  const tableShell =
    servicesSection.querySelector(
      ".price-table-shell"
    );

  if (
    !tableBody ||
    !tableShell
  ) {
    return;
  }

  const rows =
    Array.from(
      tableBody.querySelectorAll(
        "tr"
      )
    );

  if (
    rows.length <=
    MOBILE_SERVICES_VISIBLE_COUNT
  ) {
    return;
  }

  const existingButton =
    document.getElementById(
      "mobile-services-toggle"
    );

  if (existingButton) {
    servicesToggleButton =
      existingButton;
  } else {
    const button =
      document.createElement(
        "button"
      );

    button.type =
      "button";

    button.id =
      "mobile-services-toggle";

    button.className =
      "btn btn-secondary full";

    button.style.marginTop =
      "12px";

    button.style.minHeight =
      "46px";

    button.style.fontSize =
      "0.84rem";

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    button.setAttribute(
      "aria-controls",
      "services-mobile-list"
    );

    tableBody.id =
      "services-mobile-list";

    tableShell.insertAdjacentElement(
      "afterend",
      button
    );

    servicesToggleButton =
      button;

    button.addEventListener(
      "click",
      function () {
        mobileServicesExpanded =
          !mobileServicesExpanded;

        updateMobileServices();
      }
    );
  }

  function updateMobileServices() {
    if (
      !isMobileLayout()
    ) {
      rows.forEach(
        function (row) {
          row.hidden =
            false;
        }
      );

      if (
        servicesToggleButton
      ) {
        servicesToggleButton.style.display =
          "none";
      }

      return;
    }

    if (
      servicesToggleButton
    ) {
      servicesToggleButton.style.display =
        "inline-flex";
    }

    rows.forEach(
      function (
        row,
        index
      ) {
        row.hidden =
          !mobileServicesExpanded &&
          index >=
            MOBILE_SERVICES_VISIBLE_COUNT;
      }
    );

    if (
      servicesToggleButton
    ) {
      servicesToggleButton.textContent =
        mobileServicesExpanded
          ? "Mostrar menos"
          : "Ver todos os serviços (" +
            rows.length +
            ")";

      servicesToggleButton.setAttribute(
        "aria-expanded",
        mobileServicesExpanded
          ? "true"
          : "false"
      );
    }
  }

  updateMobileServices();

  const mediaQuery =
    window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    );

  if (
    typeof mediaQuery.addEventListener ===
    "function"
  ) {
    mediaQuery.addEventListener(
      "change",
      updateMobileServices
    );

  } else if (
    typeof mediaQuery.addListener ===
    "function"
  ) {
    mediaQuery.addListener(
      updateMobileServices
    );
  }
}

function injectDynamicStyles() {
  if (
    document.getElementById(
      "gng-dynamic-styles"
    )
  ) {
    return;
  }

  const style =
    document.createElement(
      "style"
    );

  style.id =
    "gng-dynamic-styles";

  style.textContent = `
    .booking-customer-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .booking-customer-field {
      display: grid;
      gap: 8px;
    }

    .booking-customer-field label {
      color: var(--navy-deep);
      font-size: .84rem;
      font-weight: 800;
    }

    .booking-input {
      width: 100%;
      min-height: 58px;
      padding: 0 16px;
      border: 1px solid #c8d1dc;
      border-radius: 14px;
      background: var(--white);
      color: var(--navy-deep);
      font-size: 1rem;
      font-weight: 700;
    }

    .booking-input:focus-visible {
      outline: 4px solid rgba(34, 51, 79, .20);
      outline-offset: 3px;
      border-color: var(--navy);
    }

    .booking-field-hint {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: .78rem;
    }

    .booking-day.is-disabled,
    .booking-day:disabled {
      opacity: .48;
      cursor: not-allowed;
      background: #e5e8ec;
      border-color: #d5d9df;
      box-shadow: none;
      transform: none;
    }

    .booking-time.is-occupied {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      background: #e6e8eb;
      border-color: #cfd3d8;
      color: #6e7680;
      text-decoration: none;
      opacity: 1;
    }

    .booking-time-value {
      text-decoration: line-through;
      opacity: .72;
    }

    .booking-time-status {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #7d8794;
      background: transparent;
      font-size: 1rem;
      font-weight: 900;
      line-height: 1;
      text-decoration: none;
    }

    .mobile-app-nav {
      display: none;
    }

    .mobile-step-selection {
      display: none;
    }

    @media (max-width: 680px) {
      body {
        padding-bottom:
          calc(
            88px +
            env(
              safe-area-inset-bottom,
              0px
            )
          ) !important;
      }

      .mobile-booking {
        display: none !important;
      }

      .mobile-app-nav {
        position: fixed;
        left: 8px;
        right: 8px;
        bottom:
          calc(
            7px +
            env(
              safe-area-inset-bottom,
              0px
            )
          );
        z-index: 1400;
        display: grid;
        grid-template-columns:
          repeat(
            4,
            minmax(0, 1fr)
          );
        gap: 5px;
        min-height: 62px;
        padding: 6px;
        border:
          1px solid
          rgba(
            34,
            51,
            79,
            .13
          );
        border-radius: 19px;
        background:
          rgba(
            248,
            249,
            251,
            .96
          );
        box-shadow:
          0 16px 40px
          rgba(
            13,
            23,
            40,
            .22
          );
        -webkit-backdrop-filter:
          blur(18px);
        backdrop-filter:
          blur(18px);
        transition:
          opacity .2s ease,
          transform .2s ease;
      }

      .mobile-app-nav a {
        min-width: 0;
        min-height: 48px;
        padding: 6px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2px;
        border-radius: 13px;
        color: #697688;
        font-size: .61rem;
        font-weight: 800;
        line-height: 1;
        text-align: center;
      }

      .mobile-app-nav a span:first-child {
        min-width: 25px;
        height: 22px;
        display: grid;
        place-items: center;
        color: currentColor;
        font-family:
          "Bebas Neue",
          sans-serif;
        font-size: .95rem;
        letter-spacing: .02em;
      }

      .mobile-app-nav
      a.is-active:not(.is-primary) {
        background: #e7ebf1;
        color: var(--navy-deep);
      }

      .mobile-app-nav a.is-primary {
        background:
          linear-gradient(
            145deg,
            var(--navy),
            var(--navy-deep)
          );
        color: var(--white);
        box-shadow:
          0 8px 20px
          rgba(
            13,
            23,
            40,
            .22
          );
      }

      .mobile-app-nav
      a.is-primary.is-active {
        box-shadow:
          0 8px 22px
          rgba(
            13,
            23,
            40,
            .32
          );
      }

      body.mobile-keyboard-open
      .mobile-app-nav {
        opacity: 0;
        pointer-events: none;
        transform:
          translateY(120%);
      }

      .booking-step.is-mobile-collapsed {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .booking-step.is-mobile-collapsed
      > :not(.booking-step-heading) {
        display: none !important;
      }

      .booking-step.is-mobile-collapsed
      .booking-step-heading {
        margin-bottom: 0;
      }

      .booking-step.is-mobile-collapsed
      .booking-step-heading
      small:not(.mobile-step-selection) {
        display: none;
      }

      .booking-step.is-mobile-complete
      .booking-step-number {
        background:
          var(--success);
      }

      .booking-step.is-mobile-locked {
        opacity: .52;
      }

      .booking-step.is-mobile-locked
      .booking-step-number {
        background: #8c96a4;
      }

      .booking-step.is-mobile-current {
        border-color:
          rgba(
            34,
            51,
            79,
            .28
          );
        box-shadow:
          0 10px 30px
          rgba(
            13,
            23,
            40,
            .10
          );
      }

      .booking-step-heading
      .mobile-step-clickable {
        cursor: pointer;
      }

      .booking-step-heading.mobile-step-clickable {
        cursor: pointer;
      }

      .booking-step.is-mobile-complete
      .mobile-step-selection {
        color: #657386;
      }

      .booking-step.is-mobile-complete
      .booking-step-heading {
        cursor: pointer;
      }

      .booking-step.is-mobile-complete
      .booking-step-heading
      .mobile-step-selection {
        margin-top: 2px;
      }

      .booking-step.is-mobile-complete
      .booking-step-heading
      .mobile-step-selection {
        font-size: .69rem;
        font-weight: 700;
        line-height: 1.25;
      }

      .booking-step.is-mobile-complete
      .booking-step-heading
      .mobile-step-selection {
        display: none;
      }

      .booking-step.is-mobile-complete.is-mobile-collapsed
      .mobile-step-selection {
        display: block;
      }

      .booking-step.is-mobile-complete.is-mobile-collapsed
      .booking-step-heading::after {
        content: "Alterar";
        margin-left: auto;
        color: var(--navy);
        font-size: .65rem;
        font-weight: 800;
      }

      .booking-step.is-mobile-locked
      .booking-step-heading::after {
        content: "";
      }

      .booking-customer-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 370px) {
      .mobile-app-nav a {
        font-size: .56rem;
      }
    }
  `;

  document.head.appendChild(
    style
  );
}

function createMobileBottomNav() {
  if (
    document.getElementById(
      "mobile-app-nav"
    )
  ) {
    return;
  }

  const nav =
    document.createElement(
      "nav"
    );

  nav.id =
    "mobile-app-nav";

  nav.className =
    "mobile-app-nav";

  nav.setAttribute(
    "aria-label",
    "Navegação rápida"
  );

  nav.innerHTML = `
    <a
      href="#servicos"
      data-mobile-nav="servicos"
    >
      <span>R$</span>
      <span>Valores</span>
    </a>

    <a
      href="#agendamento"
      data-mobile-nav="agendamento"
      class="is-primary"
    >
      <span>+</span>
      <span>Agendar</span>
    </a>

    <a
      href="#assinaturas"
      data-mobile-nav="assinaturas"
    >
      <span>GNG</span>
      <span>Planos</span>
    </a>

    <a
      href="#localizacao"
      data-mobile-nav="localizacao"
    >
      <span>DF</span>
      <span>Local</span>
    </a>
  `;

  document.body.appendChild(
    nav
  );
}

function updateMobileNavActiveState() {
  const nav =
    document.getElementById(
      "mobile-app-nav"
    );

  if (
    !nav ||
    !isMobileLayout()
  ) {
    return;
  }

  const ids = [
    "servicos",
    "agendamento",
    "assinaturas",
    "localizacao"
  ];

  const marker =
    window.scrollY +
    window.innerHeight *
      0.42;

  let activeId =
    "";

  ids.forEach(
    function (id) {
      const section =
        document.getElementById(
          id
        );

      if (
        section &&
        section.offsetTop <=
          marker
      ) {
        activeId =
          id;
      }
    }
  );

  nav
    .querySelectorAll(
      "[data-mobile-nav]"
    )
    .forEach(
      function (link) {
        link.classList.toggle(
          "is-active",
          link.dataset.mobileNav ===
            activeId
        );
      }
    );
}

function setupMobileNavActiveTracking() {
  const update =
    function () {
      if (
        mobileNavTicking
      ) {
        return;
      }

      mobileNavTicking =
        true;

      window.requestAnimationFrame(
        function () {
          updateMobileNavActiveState();

          mobileNavTicking =
            false;
        }
      );
    };

  window.addEventListener(
    "scroll",
    update,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    update
  );

  update();
}

function setupKeyboardAwareMobileNav() {
  const isTextField =
    function (element) {
      if (!element) {
        return false;
      }

      return (
        element.tagName ===
          "INPUT" ||
        element.tagName ===
          "TEXTAREA" ||
        element.isContentEditable
      );
    };

  document.addEventListener(
    "focusin",
    function (event) {
      if (
        isMobileLayout() &&
        isTextField(
          event.target
        )
      ) {
        document.body.classList.add(
          "mobile-keyboard-open"
        );
      }
    }
  );

  document.addEventListener(
    "focusout",
    function () {
      window.setTimeout(
        function () {
          if (
            !isTextField(
              document.activeElement
            )
          ) {
            document.body.classList.remove(
              "mobile-keyboard-open"
            );
          }
        },
        120
      );
    }
  );

  if (
    window.visualViewport
  ) {
    window.visualViewport.addEventListener(
      "resize",
      function () {
        const active =
          document.activeElement;

        if (
          !isTextField(
            active
          )
        ) {
          document.body.classList.remove(
            "mobile-keyboard-open"
          );

          return;
        }

        const keyboardLikelyOpen =
          window.visualViewport.height <
          window.innerHeight *
            0.8;

        document.body.classList.toggle(
          "mobile-keyboard-open",
          isMobileLayout() &&
            keyboardLikelyOpen
        );
      }
    );
  }
}

function getBusinessDateParts() {
  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          BUSINESS_TIMEZONE,

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit",

        hour:
          "2-digit",

        minute:
          "2-digit",

        hourCycle:
          "h23"
      }
    );

  const result =
    {};

  formatter
    .formatToParts(
      new Date()
    )
    .forEach(
      function (part) {
        if (
          part.type !==
          "literal"
        ) {
          result[
            part.type
          ] =
            part.value;
        }
      }
    );

  return {
    year:
      Number(
        result.year
      ),

    month:
      Number(
        result.month
      ),

    day:
      Number(
        result.day
      ),

    hour:
      Number(
        result.hour
      ),

    minute:
      Number(
        result.minute
      )
  };
}

function padNumber(value) {
  return String(
    value
  ).padStart(
    2,
    "0"
  );
}

function buildDateKey(
  yearValue,
  monthValue,
  dayValue
) {
  return (
    yearValue +
    "-" +
    padNumber(
      monthValue
    ) +
    "-" +
    padNumber(
      dayValue
    )
  );
}

function createUtcDate(
  yearValue,
  monthValue,
  dayValue
) {
  return new Date(
    Date.UTC(
      yearValue,
      monthValue - 1,
      dayValue,
      12,
      0,
      0
    )
  );
}

function addDays(
  date,
  amount
) {
  const result =
    new Date(
      date.getTime()
    );

  result.setUTCDate(
    result.getUTCDate() +
      amount
  );

  return result;
}

function dateToKey(
  date
) {
  return buildDateKey(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );
}

function formatWeekday(
  date
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      weekday:
        "short",

      timeZone:
        "UTC"
    }
  )
    .format(
      date
    )
    .replace(
      ".",
      ""
    );
}

function formatMonth(
  date
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      month:
        "short",

      timeZone:
        "UTC"
    }
  )
    .format(
      date
    )
    .replace(
      ".",
      ""
    );
}

function formatFullDate(
  date
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      weekday:
        "long",

      day:
        "2-digit",

      month:
        "long",

      year:
        "numeric",

      timeZone:
        "UTC"
    }
  ).format(
    date
  );
}

function formatShortDate(
  date
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "short",

      timeZone:
        "UTC"
    }
  )
    .format(
      date
    )
    .replace(
      ".",
      ""
    );
}

function capitalizeFirst(
  value
) {
  if (!value) {
    return "";
  }

  return (
    value
      .charAt(0)
      .toUpperCase() +
    value.slice(1)
  );
}

function getTodayDate() {
  const now =
    getBusinessDateParts();

  return createUtcDate(
    now.year,
    now.month,
    now.day
  );
}

function getTodayKey() {
  const now =
    getBusinessDateParts();

  return buildDateKey(
    now.year,
    now.month,
    now.day
  );
}

function getCurrentMinutes() {
  const now =
    getBusinessDateParts();

  return (
    now.hour *
      60 +
    now.minute
  );
}

function timeToMinutes(
  time
) {
  if (!time) {
    return 0;
  }

  const parts =
    String(
      time
    ).split(
      ":"
    );

  return (
    Number(
      parts[0]
    ) *
      60 +
    Number(
      parts[1]
    )
  );
}

function normalizeDatabaseTime(
  time
) {
  if (!time) {
    return "";
  }

  return String(
    time
  ).slice(
    0,
    5
  );
}

function generateSlots() {
  const slots =
    [];

  const start =
    SLOT_START_HOUR *
      60 +
    SLOT_START_MINUTE;

  const end =
    SLOT_END_HOUR *
      60 +
    SLOT_END_MINUTE;

  for (
    let minutes = start;
    minutes <= end;
    minutes +=
      SLOT_INTERVAL
  ) {
    const hour =
      Math.floor(
        minutes /
          60
      );

    const minute =
      minutes %
      60;

    slots.push({
      value:
        padNumber(
          hour
        ) +
        ":" +
        padNumber(
          minute
        ),

      minutes
    });
  }

  return slots;
}

function isValidName(
  value
) {
  const name =
    String(
      value || ""
    ).trim();

  return (
    name.length >= 2 &&
    name.length <= 80
  );
}

function isValidPhone(
  value
) {
  const digits =
    digitsOnly(
      value
    );

  return (
    digits.length >= 10 &&
    digits.length <= 13
  );
}

function formatPhoneInput(
  value
) {
  const digits =
    digitsOnly(
      value
    ).slice(
      0,
      11
    );

  if (
    digits.length <= 2
  ) {
    return digits;
  }

  if (
    digits.length <= 6
  ) {
    return (
      "(" +
      digits.slice(
        0,
        2
      ) +
      ") " +
      digits.slice(
        2
      )
    );
  }

  if (
    digits.length <= 10
  ) {
    return (
      "(" +
      digits.slice(
        0,
        2
      ) +
      ") " +
      digits.slice(
        2,
        6
      ) +
      "-" +
      digits.slice(
        6
      )
    );
  }

  return (
    "(" +
    digits.slice(
      0,
      2
    ) +
    ") " +
    digits.slice(
      2,
      7
    ) +
    "-" +
    digits.slice(
      7
    )
  );
}

async function supabaseRpc(
  functionName,
  payload = {}
) {
  const response =
    await fetch(
      SUPABASE_URL +
        "/rest/v1/rpc/" +
        functionName,
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json",

          apikey:
            SUPABASE_PUBLISHABLE_KEY,

          Authorization:
            "Bearer " +
            SUPABASE_PUBLISHABLE_KEY
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );

  const contentType =
    response.headers.get(
      "content-type"
    );

  let data =
    null;

  if (
    contentType &&
    contentType.includes(
      "application/json"
    )
  ) {
    data =
      await response.json();
  } else {
    data =
      await response.text();
  }

  if (
    !response.ok
  ) {
    let message =
      "Não foi possível concluir a operação.";

    if (
      data &&
      typeof data ===
        "object" &&
      data.message
    ) {
      message =
        data.message;
    }

    throw new Error(
      message
    );
  }

  return data;
}

function createBarberStep() {
  if (
    !bookingService ||
    document.getElementById(
      "booking-barber"
    )
  ) {
    return;
  }

  const serviceStep =
    bookingService.closest(
      ".booking-step"
    );

  const dayStep =
    bookingDays
      ? bookingDays.closest(
          ".booking-step"
        )
      : null;

  const timeStep =
    bookingTimes
      ? bookingTimes.closest(
          ".booking-step"
        )
      : null;

  if (
    !serviceStep ||
    !dayStep
  ) {
    return;
  }

  const barberStep =
    document.createElement(
      "div"
    );

  barberStep.className =
    "booking-step";

  barberStep.innerHTML = `
    <div class="booking-step-heading">
      <span class="booking-step-number">
        02
      </span>

      <div>
        <strong>
          Escolha o barbeiro
        </strong>

        <small>
          Selecione quem realizará seu atendimento
        </small>
      </div>
    </div>

    <label
      class="booking-select-label"
      for="booking-barber"
    >
      Barbeiro
    </label>

    <select
      class="booking-select"
      id="booking-barber"
    >
      <option value="">
        Carregando barbeiros...
      </option>
    </select>
  `;

  serviceStep.insertAdjacentElement(
    "afterend",
    barberStep
  );

  bookingBarber =
    document.getElementById(
      "booking-barber"
    );

  const dayNumber =
    dayStep.querySelector(
      ".booking-step-number"
    );

  const timeNumber =
    timeStep
      ? timeStep.querySelector(
          ".booking-step-number"
        )
      : null;

  if (
    dayNumber
  ) {
    dayNumber.textContent =
      "03";
  }

  if (
    timeNumber
  ) {
    timeNumber.textContent =
      "04";
  }

  createCustomerStep(
    timeStep
  );

  createBarberSummary();

  createCustomerSummary();
}

function createCustomerStep(
  timeStep
) {
  if (
    !timeStep ||
    document.getElementById(
      "booking-customer-name"
    )
  ) {
    return;
  }

  const customerStep =
    document.createElement(
      "div"
    );

  customerStep.className =
    "booking-step";

  customerStep.innerHTML = `
    <div class="booking-step-heading">
      <span class="booking-step-number">
        05
      </span>

      <div>
        <strong>
          Seus dados
        </strong>

        <small>
          Precisamos deles para identificar seu agendamento
        </small>
      </div>
    </div>

    <div class="booking-customer-grid">

      <div class="booking-customer-field">

        <label for="booking-customer-name">
          Nome
        </label>

        <input
          class="booking-input"
          id="booking-customer-name"
          type="text"
          maxlength="80"
          autocomplete="name"
          placeholder="Seu nome"
        >

      </div>

      <div class="booking-customer-field">

        <label for="booking-customer-phone">
          WhatsApp / telefone
        </label>

        <input
          class="booking-input"
          id="booking-customer-phone"
          type="tel"
          maxlength="16"
          inputmode="tel"
          autocomplete="tel"
          placeholder="(61) 99999-9999"
        >

      </div>

    </div>

    <p class="booking-field-hint">
      Os dados são usados somente para identificar e confirmar o atendimento.
    </p>
  `;

  timeStep.insertAdjacentElement(
    "afterend",
    customerStep
  );

  bookingCustomerName =
    document.getElementById(
      "booking-customer-name"
    );

  bookingCustomerPhone =
    document.getElementById(
      "booking-customer-phone"
    );

  bookingCustomerName.addEventListener(
    "input",
    function () {
      updateCustomerSummary();

      updateSubmitState();

      syncMobileBookingFlow();
    }
  );

  bookingCustomerPhone.addEventListener(
    "input",
    function () {
      const caretAtEnd =
        this.selectionStart ===
        this.value.length;

      this.value =
        formatPhoneInput(
          this.value
        );

      if (
        caretAtEnd
      ) {
        this.setSelectionRange(
          this.value.length,
          this.value.length
        );
      }

      updateSubmitState();

      syncMobileBookingFlow();
    }
  );
}

function createBarberSummary() {
  const existing =
    document.getElementById(
      "summary-barber"
    );

  if (
    existing
  ) {
    summaryBarber =
      existing;

    return;
  }

  if (
    !summaryDate
  ) {
    return;
  }

  const dateRow =
    summaryDate.parentElement;

  if (
    !dateRow ||
    !dateRow.parentElement
  ) {
    return;
  }

  const barberRow =
    document.createElement(
      "div"
    );

  barberRow.innerHTML = `
    <span>
      Barbeiro
    </span>

    <strong id="summary-barber">
      Não selecionado
    </strong>
  `;

  dateRow.parentElement.insertBefore(
    barberRow,
    dateRow
  );

  summaryBarber =
    document.getElementById(
      "summary-barber"
    );
}

function createCustomerSummary() {
  const existing =
    document.getElementById(
      "summary-customer"
    );

  if (
    existing
  ) {
    summaryCustomer =
      existing;

    return;
  }

  if (
    !summaryService ||
    !summaryService.parentElement ||
    !summaryService
      .parentElement
      .parentElement
  ) {
    return;
  }

  const customerRow =
    document.createElement(
      "div"
    );

  customerRow.innerHTML = `
    <span>
      Cliente
    </span>

    <strong id="summary-customer">
      Não informado
    </strong>
  `;

  summaryService
    .parentElement
    .parentElement
    .insertBefore(
      customerRow,
      summaryService.parentElement
    );

  summaryCustomer =
    document.getElementById(
      "summary-customer"
    );
}

function getBookingSteps() {
  const serviceStep =
    bookingService
      ? bookingService.closest(
          ".booking-step"
        )
      : null;

  const barberStep =
    bookingBarber
      ? bookingBarber.closest(
          ".booking-step"
        )
      : null;

  const dayStep =
    bookingDays
      ? bookingDays.closest(
          ".booking-step"
        )
      : null;

  const timeStep =
    bookingTimes
      ? bookingTimes.closest(
          ".booking-step"
        )
      : null;

  const customerStep =
    bookingCustomerName
      ? bookingCustomerName.closest(
          ".booking-step"
        )
      : null;

  return [
    serviceStep,
    barberStep,
    dayStep,
    timeStep,
    customerStep
  ];
}

function getMobileBookingCurrentStep() {
  if (
    !bookingService ||
    !bookingService.value
  ) {
    return 0;
  }

  if (
    !selectedBarberId
  ) {
    return 1;
  }

  if (
    !selectedDate
  ) {
    return 2;
  }

  if (
    !selectedTime
  ) {
    return 3;
  }

  return 4;
}

function getMobileStepSummary(
  index
) {
  if (
    index === 0
  ) {
    return (
      bookingService &&
      bookingService.value
        ? bookingService.value
        : ""
    );
  }

  if (
    index === 1
  ) {
    return (
      selectedBarberName ||
      ""
    );
  }

  if (
    index === 2
  ) {
    return selectedDate
      ? capitalizeFirst(
          formatShortDate(
            selectedDate
          )
        )
      : "";
  }

  if (
    index === 3
  ) {
    return (
      selectedTime ||
      ""
    );
  }

  if (
    index === 4
  ) {
    const name =
      bookingCustomerName
        ? bookingCustomerName
            .value
            .trim()
        : "";

    const phone =
      bookingCustomerPhone
        ? bookingCustomerPhone
            .value
            .trim()
        : "";

    if (
      name &&
      phone
    ) {
      return (
        name +
        " • " +
        phone
      );
    }

    return (
      name ||
      phone ||
      ""
    );
  }

  return "";
}

function scrollToBookingStep(
  index
) {
  if (
    !isMobileLayout()
  ) {
    return;
  }

  const step =
    getBookingSteps()[
      index
    ];

  if (!step) {
    return;
  }

  window.setTimeout(
    function () {
      const top =
        step
          .getBoundingClientRect()
          .top +
        window.scrollY -
        76;

      window.scrollTo({
        top:
          Math.max(
            0,
            top
          ),

        behavior:
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth"
      });
    },
    80
  );
}

function syncMobileBookingFlow() {
  const steps =
    getBookingSteps();

  if (
    steps.some(
      function (step) {
        return !step;
      }
    )
  ) {
    return;
  }

  const naturalCurrent =
    getMobileBookingCurrentStep();

  const maxUnlocked =
    naturalCurrent;

  if (
    !isMobileLayout()
  ) {
    steps.forEach(
      function (step) {
        step.classList.remove(
          "is-mobile-current",
          "is-mobile-complete",
          "is-mobile-locked",
          "is-mobile-collapsed"
        );

        const heading =
          step.querySelector(
            ".booking-step-heading"
          );

        if (
          heading
        ) {
          heading.classList.remove(
            "mobile-step-clickable"
          );

          heading.removeAttribute(
            "role"
          );

          heading.removeAttribute(
            "tabindex"
          );

          heading.removeAttribute(
            "aria-expanded"
          );
        }
      }
    );

    return;
  }

  if (
    mobileBookingOpenStep ===
      null ||
    mobileBookingOpenStep >
      maxUnlocked ||
    mobileBookingOpenStep <
      0
  ) {
    mobileBookingOpenStep =
      naturalCurrent;
  }

  steps.forEach(
    function (
      step,
      index
    ) {
      const heading =
        step.querySelector(
          ".booking-step-heading"
        );

      const headingText =
        heading
          ? heading.querySelector(
              "div"
            )
          : null;

      const isUnlocked =
        index <=
        maxUnlocked;

      const isCurrent =
        index ===
        mobileBookingOpenStep;

      const isComplete =
        index <
          naturalCurrent ||
        (
          index === 4 &&
          bookingSubmit &&
          !bookingSubmit.disabled
        );

      step.dataset.mobileStep =
        String(
          index
        );

      step.classList.toggle(
        "is-mobile-current",
        isCurrent
      );

      step.classList.toggle(
        "is-mobile-complete",
        isComplete
      );

      step.classList.toggle(
        "is-mobile-locked",
        !isUnlocked
      );

      step.classList.toggle(
        "is-mobile-collapsed",
        !isCurrent
      );

      if (
        !heading
      ) {
        return;
      }

      let selection =
        heading.querySelector(
          ".mobile-step-selection"
        );

      if (
        !selection &&
        headingText
      ) {
        selection =
          document.createElement(
            "span"
          );

        selection.className =
          "mobile-step-selection";

        headingText.appendChild(
          selection
        );
      }

      if (
        selection
      ) {
        selection.textContent =
          getMobileStepSummary(
            index
          );
      }

      heading.classList.toggle(
        "mobile-step-clickable",
        isUnlocked
      );

      heading.setAttribute(
        "aria-expanded",
        isCurrent
          ? "true"
          : "false"
      );

      if (
        isUnlocked
      ) {
        heading.setAttribute(
          "role",
          "button"
        );

        heading.setAttribute(
          "tabindex",
          "0"
        );

      } else {
        heading.removeAttribute(
          "role"
        );

        heading.removeAttribute(
          "tabindex"
        );
      }
    }
  );
}

function setMobileBookingStep(
  index,
  shouldScroll = false
) {
  if (
    !isMobileLayout()
  ) {
    syncMobileBookingFlow();

    return;
  }

  const maxUnlocked =
    getMobileBookingCurrentStep();

  mobileBookingOpenStep =
    Math.max(
      0,
      Math.min(
        index,
        maxUnlocked
      )
    );

  syncMobileBookingFlow();

  if (
    shouldScroll
  ) {
    scrollToBookingStep(
      mobileBookingOpenStep
    );
  }
}

function advanceMobileBookingFlow(
  shouldScroll = true
) {
  setMobileBookingStep(
    getMobileBookingCurrentStep(),
    shouldScroll
  );
}

function setupMobileBookingFlow() {
  const steps =
    getBookingSteps();

  if (
    steps.some(
      function (step) {
        return !step;
      }
    )
  ) {
    return;
  }

  steps.forEach(
    function (
      step,
      index
    ) {
      const heading =
        step.querySelector(
          ".booking-step-heading"
        );

      if (
        !heading ||
        heading.dataset.mobileFlowReady ===
          "true"
      ) {
        return;
      }

      heading.dataset.mobileFlowReady =
        "true";

      const openStep =
        function () {
          if (
            !isMobileLayout()
          ) {
            return;
          }

          const maxUnlocked =
            getMobileBookingCurrentStep();

          if (
            index >
            maxUnlocked
          ) {
            return;
          }

          setMobileBookingStep(
            index,
            true
          );
        };

      heading.addEventListener(
        "click",
        openStep
      );

      heading.addEventListener(
        "keydown",
        function (event) {
          if (
            event.key ===
              "Enter" ||
            event.key ===
              " "
          ) {
            event.preventDefault();

            openStep();
          }
        }
      );
    }
  );

  syncMobileBookingFlow();
}

async function loadBarbers() {
  if (
    !bookingBarber
  ) {
    return;
  }

  try {
    const data =
      await supabaseRpc(
        "get_public_barbers"
      );

    barbers =
      Array.isArray(
        data
      )
        ? data
        : [];

    bookingBarber.innerHTML =
      "";

    const placeholder =
      document.createElement(
        "option"
      );

    placeholder.value =
      "";

    placeholder.textContent =
      "Selecione um barbeiro";

    bookingBarber.appendChild(
      placeholder
    );

    barbers.forEach(
      function (barber) {
        const option =
          document.createElement(
            "option"
          );

        option.value =
          barber.id;

        option.textContent =
          barber.name;

        bookingBarber.appendChild(
          option
        );
      }
    );

    if (
      barbers.length === 0
    ) {
      placeholder.textContent =
        "Nenhum barbeiro disponível";

      bookingBarber.disabled =
        true;
    }

  } catch (error) {
    console.error(
      "Erro ao carregar barbeiros:",
      error
    );

    bookingBarber.innerHTML =
      '<option value="">' +
      "Não foi possível carregar os barbeiros" +
      "</option>";

    bookingBarber.disabled =
      true;
  }
}

function getSelectedBarber() {
  if (
    !selectedBarberId
  ) {
    return null;
  }

  return (
    barbers.find(
      function (barber) {
        return (
          barber.id ===
          selectedBarberId
        );
      }
    ) || null
  );
}

function updateBarberSummary() {
  if (
    summaryBarber
  ) {
    summaryBarber.textContent =
      selectedBarberName ||
      "Não selecionado";
  }
}

function updateCustomerSummary() {
  if (
    !summaryCustomer
  ) {
    return;
  }

  const name =
    bookingCustomerName
      ? bookingCustomerName
          .value
          .trim()
      : "";

  summaryCustomer.textContent =
    name ||
    "Não informado";
}

function clearBlockedSlots() {
  blockedSlots =
    new Map();
}

function addBlockedSlot(
  date,
  time
) {
  if (
    !blockedSlots.has(
      date
    )
  ) {
    blockedSlots.set(
      date,
      new Set()
    );
  }

  blockedSlots
    .get(
      date
    )
    .add(
      time
    );
}

function isSlotBlocked(
  date,
  time
) {
  return (
    blockedSlots.has(
      date
    ) &&
    blockedSlots
      .get(
        date
      )
      .has(
        time
      )
  );
}

function hasAvailableTime(
  dateKey
) {
  if (
    !selectedBarberId ||
    !bookingService ||
    !bookingService.value
  ) {
    return false;
  }

  return generateSlots()
    .some(
      function (slot) {
        if (
          isSlotBlocked(
            dateKey,
            slot.value
          )
        ) {
          return false;
        }

        if (
          dateKey ===
            getTodayKey() &&
          slot.minutes <=
            getCurrentMinutes()
        ) {
          return false;
        }

        return true;
      }
    );
}

function showSelectionRequiredState(
  message
) {
  if (
    bookingDays
  ) {
    bookingDays.innerHTML =
      '<div class="booking-empty">' +
      message +
      "</div>";
  }

  if (
    bookingTimes
  ) {
    bookingTimes.innerHTML =
      '<div class="booking-empty">' +
      message +
      "</div>";
  }
}

async function loadBookedSlots() {
  if (
    !bookingService ||
    !bookingService.value
  ) {
    clearBlockedSlots();

    showSelectionRequiredState(
      "Escolha um serviço para visualizar a disponibilidade."
    );

    updateSubmitState();

    syncMobileBookingFlow();

    return;
  }

  if (
    !selectedBarberId
  ) {
    clearBlockedSlots();

    showSelectionRequiredState(
      "Escolha um barbeiro para visualizar a disponibilidade."
    );

    updateSubmitState();

    syncMobileBookingFlow();

    return;
  }

  try {
    const today =
      getTodayDate();

    const finalDate =
      addDays(
        today,
        BOOKING_DAYS_COUNT - 1
      );

    const data =
      await supabaseRpc(
        "get_public_unavailable_slots_by_barber",
        {
          p_barber_id:
            selectedBarberId,

          p_service:
            bookingService.value,

          p_start_date:
            dateToKey(
              today
            ),

          p_end_date:
            dateToKey(
              finalDate
            )
        }
      );

    clearBlockedSlots();

    if (
      Array.isArray(
        data
      )
    ) {
      data.forEach(
        function (item) {
          addBlockedSlot(
            item.booking_date,
            normalizeDatabaseTime(
              item.booking_time
            )
          );
        }
      );
    }

    if (
      selectedDate &&
      selectedTime
    ) {
      const dateKey =
        dateToKey(
          selectedDate
        );

      if (
        isSlotBlocked(
          dateKey,
          selectedTime
        )
      ) {
        selectedTime =
          null;

        updateTimeSummary();
      }
    }

    updateSubmitState();

    syncMobileBookingFlow();

  } catch (error) {
    console.error(
      "Erro ao carregar horários ocupados:",
      error
    );

    clearBlockedSlots();

    showSelectionRequiredState(
      "Não foi possível carregar a disponibilidade. Atualize a página e tente novamente."
    );
  }
}

function updateServiceSummary() {
  if (
    !bookingService
  ) {
    return;
  }

  const option =
    bookingService.options[
      bookingService.selectedIndex
    ];

  const service =
    bookingService.value;

  const price =
    option
      ? option.dataset.price ||
        ""
      : "";

  if (
    summaryService
  ) {
    summaryService.textContent =
      service ||
      "Não selecionado";
  }

  if (
    summaryPrice
  ) {
    summaryPrice.textContent =
      price ||
      "—";
  }

  updateSubmitState();
}

function updateDateSummary(
  date
) {
  if (
    !summaryDate
  ) {
    return;
  }

  summaryDate.textContent =
    date
      ? capitalizeFirst(
          formatFullDate(
            date
          )
        )
      : "Não selecionado";
}

function updateTimeSummary() {
  if (
    summaryTime
  ) {
    summaryTime.textContent =
      selectedTime ||
      "Não selecionado";
  }
}

function updateSubmitState() {
  if (
    !bookingSubmit ||
    !bookingService
  ) {
    return;
  }

  const dateKey =
    selectedDate
      ? dateToKey(
          selectedDate
        )
      : null;

  const occupied =
    dateKey &&
    selectedTime
      ? isSlotBlocked(
          dateKey,
          selectedTime
        )
      : false;

  const customerName =
    bookingCustomerName
      ? bookingCustomerName.value
      : "";

  const customerPhone =
    bookingCustomerPhone
      ? bookingCustomerPhone.value
      : "";

  bookingSubmit.disabled =
    bookingRequestInProgress ||
    !bookingService.value ||
    !selectedBarberId ||
    !selectedDate ||
    !selectedTime ||
    occupied ||
    !isValidName(
      customerName
    ) ||
    !isValidPhone(
      customerPhone
    );
}

function markSelectedDate() {
  if (
    !bookingDays
  ) {
    return;
  }

  const selectedKey =
    selectedDate
      ? dateToKey(
          selectedDate
        )
      : "";

  Array.from(
    bookingDays.querySelectorAll(
      ".booking-day"
    )
  ).forEach(
    function (button) {
      const active =
        button.dataset.date ===
        selectedKey;

      button.classList.toggle(
        "is-selected",
        active
      );

      button.setAttribute(
        "aria-pressed",
        active
          ? "true"
          : "false"
      );
    }
  );
}

function renderDays() {
  if (
    !bookingDays
  ) {
    return;
  }

  if (
    !bookingService ||
    !bookingService.value
  ) {
    showSelectionRequiredState(
      "Escolha um serviço para visualizar a disponibilidade."
    );

    return;
  }

  if (
    !selectedBarberId
  ) {
    showSelectionRequiredState(
      "Escolha um barbeiro para visualizar a disponibilidade."
    );

    return;
  }

  const previousDateKey =
    selectedDate
      ? dateToKey(
          selectedDate
        )
      : "";

  bookingDays.innerHTML =
    "";

  const today =
    getTodayDate();

  const todayKey =
    dateToKey(
      today
    );

  let selectedDateStillAvailable =
    false;

  let firstAvailableDate =
    null;

  for (
    let index = 0;
    index <
    BOOKING_DAYS_COUNT;
    index += 1
  ) {
    const date =
      addDays(
        today,
        index
      );

    const dateKey =
      dateToKey(
        date
      );

    const button =
      document.createElement(
        "button"
      );

    button.type =
      "button";

    button.className =
      "booking-day";

    button.dataset.date =
      dateKey;

    button.innerHTML =
      "<span>" +
      formatWeekday(
        date
      ) +
      "</span>" +
      "<strong>" +
      padNumber(
        date.getUTCDate()
      ) +
      "</strong>" +
      "<small>" +
      formatMonth(
        date
      ) +
      "</small>";

    if (
      dateKey ===
      todayKey
    ) {
      button.classList.add(
        "is-today"
      );
    }

    const available =
      hasAvailableTime(
        dateKey
      );

    if (
      !available
    ) {
      button.disabled =
        true;

      button.classList.add(
        "is-disabled"
      );
    }

    if (
      available &&
      !firstAvailableDate
    ) {
      firstAvailableDate =
        date;
    }

    if (
      available &&
      dateKey ===
        previousDateKey
    ) {
      selectedDateStillAvailable =
        true;
    }

    button.addEventListener(
      "click",
      function () {
        if (
          !button.disabled
        ) {
          selectDate(
            date
          );
        }
      }
    );

    bookingDays.appendChild(
      button
    );
  }

  if (
    selectedDate &&
    selectedDateStillAvailable
  ) {
    markSelectedDate();

    updateDateSummary(
      selectedDate
    );

    renderTimes();

  } else if (
    !isMobileLayout() &&
    firstAvailableDate
  ) {
    selectedDate =
      new Date(
        firstAvailableDate.getTime()
      );

    selectedTime =
      null;

    markSelectedDate();

    updateDateSummary(
      selectedDate
    );

    updateTimeSummary();

    renderTimes();

  } else {
    selectedDate =
      null;

    selectedTime =
      null;

    updateDateSummary(
      null
    );

    updateTimeSummary();

    bookingTimes.innerHTML =
      '<div class="booking-empty">' +
      "Escolha um dia para visualizar os horários." +
      "</div>";
  }

  updateSubmitState();

  syncMobileBookingFlow();
}

function selectDate(
  date
) {
  selectedDate =
    new Date(
      date.getTime()
    );

  selectedTime =
    null;

  markSelectedDate();

  updateDateSummary(
    selectedDate
  );

  updateTimeSummary();

  renderTimes();

  updateSubmitState();

  advanceMobileBookingFlow(
    true
  );
}

function renderTimes() {
  if (
    !bookingTimes
  ) {
    return;
  }

  if (
    !bookingService ||
    !bookingService.value
  ) {
    bookingTimes.innerHTML =
      '<div class="booking-empty">' +
      "Escolha um serviço primeiro." +
      "</div>";

    return;
  }

  if (
    !selectedBarberId
  ) {
    bookingTimes.innerHTML =
      '<div class="booking-empty">' +
      "Escolha um barbeiro primeiro." +
      "</div>";

    return;
  }

  if (
    !selectedDate
  ) {
    bookingTimes.innerHTML =
      '<div class="booking-empty">' +
      "Escolha um dia para visualizar os horários." +
      "</div>";

    return;
  }

  bookingTimes.innerHTML =
    "";

  const selectedKey =
    dateToKey(
      selectedDate
    );

  const todayKey =
    getTodayKey();

  const currentMinutes =
    getCurrentMinutes();

  generateSlots().forEach(
    function (slot) {
      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "booking-time";

      button.dataset.time =
        slot.value;

      const passed =
        selectedKey ===
          todayKey &&
        slot.minutes <=
          currentMinutes;

      const occupied =
        isSlotBlocked(
          selectedKey,
          slot.value
        );

      if (
        occupied
      ) {
        button.innerHTML =
          '<span class="booking-time-value">' +
          slot.value +
          "</span>" +
          '<span class="booking-time-status">X</span>';

        button.disabled =
          true;

        button.classList.add(
          "is-disabled",
          "is-occupied"
        );

        button.setAttribute(
          "aria-label",
          slot.value +
            " ocupado"
        );

        button.title =
          slot.value +
          " — horário ocupado";

      } else if (
        passed
      ) {
        button.textContent =
          slot.value;

        button.disabled =
          true;

        button.classList.add(
          "is-disabled"
        );

        button.setAttribute(
          "aria-label",
          slot.value +
            " indisponível"
        );

      } else {
        button.textContent =
          slot.value;

        const active =
          selectedTime ===
          slot.value;

        button.classList.toggle(
          "is-selected",
          active
        );

        button.setAttribute(
          "aria-pressed",
          active
            ? "true"
            : "false"
        );

        button.setAttribute(
          "aria-label",
          "Selecionar horário " +
            slot.value
        );

        button.addEventListener(
          "click",
          function () {
            selectTime(
              slot.value,
              button
            );
          }
        );
      }

      bookingTimes.appendChild(
        button
      );
    }
  );
}

function selectTime(
  time,
  button
) {
  if (
    !selectedDate ||
    !selectedBarberId ||
    !bookingService.value
  ) {
    return;
  }

  const dateKey =
    dateToKey(
      selectedDate
    );

  if (
    isSlotBlocked(
      dateKey,
      time
    )
  ) {
    return;
  }

  selectedTime =
    time;

  Array.from(
    bookingTimes.querySelectorAll(
      ".booking-time"
    )
  ).forEach(
    function (item) {
      const active =
        item ===
        button;

      item.classList.toggle(
        "is-selected",
        active
      );

      item.setAttribute(
        "aria-pressed",
        active
          ? "true"
          : "false"
      );
    }
  );

  updateTimeSummary();

  updateSubmitState();

  advanceMobileBookingFlow(
    true
  );
}

async function handleBarberChange() {
  if (
    !bookingBarber
  ) {
    return;
  }

  selectedBarberId =
    bookingBarber.value ||
    null;

  const barber =
    getSelectedBarber();

  selectedBarberName =
    barber
      ? barber.name
      : "";

  selectedDate =
    null;

  selectedTime =
    null;

  clearBlockedSlots();

  updateBarberSummary();

  updateDateSummary(
    null
  );

  updateTimeSummary();

  updateSubmitState();

  if (
    !bookingService.value
  ) {
    showSelectionRequiredState(
      "Escolha um serviço para visualizar a disponibilidade."
    );

    syncMobileBookingFlow();

    return;
  }

  if (
    !selectedBarberId
  ) {
    showSelectionRequiredState(
      "Escolha um barbeiro para visualizar a disponibilidade."
    );

    syncMobileBookingFlow();

    return;
  }

  bookingDays.innerHTML =
    '<div class="booking-empty">' +
    "Carregando disponibilidade..." +
    "</div>";

  bookingTimes.innerHTML =
    '<div class="booking-empty">' +
    "Carregando horários..." +
    "</div>";

  await loadBookedSlots();

  renderDays();

  advanceMobileBookingFlow(
    true
  );
}

async function handleServiceChange() {
  updateServiceSummary();

  selectedDate =
    null;

  selectedTime =
    null;

  updateDateSummary(
    null
  );

  updateTimeSummary();

  clearBlockedSlots();

  if (
    !bookingService.value
  ) {
    showSelectionRequiredState(
      "Escolha um serviço para visualizar a disponibilidade."
    );

    updateSubmitState();

    setMobileBookingStep(
      0,
      false
    );

    return;
  }

  if (
    !selectedBarberId
  ) {
    showSelectionRequiredState(
      "Escolha um barbeiro para visualizar a disponibilidade."
    );

    updateSubmitState();

    advanceMobileBookingFlow(
      true
    );

    return;
  }

  bookingDays.innerHTML =
    '<div class="booking-empty">' +
    "Atualizando disponibilidade..." +
    "</div>";

  bookingTimes.innerHTML =
    '<div class="booking-empty">' +
    "Atualizando horários..." +
    "</div>";

  await loadBookedSlots();

  renderDays();

  advanceMobileBookingFlow(
    true
  );
}

function findServiceOption(
  service
) {
  if (
    !bookingService
  ) {
    return null;
  }

  return (
    Array.from(
      bookingService.options
    ).find(
      function (option) {
        return (
          option.value ===
          service
        );
      }
    ) || null
  );
}

function selectServiceFromLink(
  service
) {
  const option =
    findServiceOption(
      service
    );

  if (
    !option
  ) {
    return;
  }

  bookingService.value =
    service;

  handleServiceChange();
}

function setupServiceLinks() {
  serviceLinks.forEach(
    function (link) {
      link.addEventListener(
        "click",
        function () {
          const service =
            link.dataset.serviceLink;

          if (
            service
          ) {
            selectServiceFromLink(
              service
            );
          }
        }
      );
    }
  );
}

function buildWhatsappMessage() {
  if (
    !bookingService ||
    !bookingService.value ||
    !selectedBarberName ||
    !selectedDate ||
    !selectedTime ||
    !bookingCustomerName
  ) {
    return "";
  }

  const customerName =
    bookingCustomerName
      .value
      .trim();

  const dateText =
    capitalizeFirst(
      formatFullDate(
        selectedDate
      )
    );

  return (
    "Olá, GNG Barbearia!\n\n" +

    "Sou *" +
    customerName +
    "*. Acabei de solicitar pelo site um agendamento para *" +

    bookingService.value +
    "* com *" +

    selectedBarberName +
    "*, no dia *" +

    dateText +
    "*, às *" +

    selectedTime +
    "*.\n\n" +

    "Poderiam, por gentileza, confirmar meu agendamento? Fico no aguardo. Obrigado!"
  );
}

function buildWhatsappUrlFromMessage(
  message
) {
  return buildWhatsappUrl(
    WHATSAPP_NUMBER,
    message
  );
}

function prepareWhatsappWindow() {
  const newWindow =
    window.open(
      "about:blank",
      "_blank"
    );

  if (
    newWindow
  ) {
    try {
      const mobile =
        isMobileDevice();

      newWindow.document.title =
        mobile
          ? "Abrindo WhatsApp..."
          : "Abrindo WhatsApp Web...";

      newWindow.document.body.innerHTML =
        '<div style="' +
        "font-family:Arial,sans-serif;" +
        "padding:40px;" +
        "text-align:center;" +
        "color:#17243a" +
        '">' +
        "<strong>Aguarde...</strong>" +
        "<p>" +
        (
          mobile
            ? "Estamos registrando sua solicitação e abrindo o WhatsApp."
            : "Estamos registrando sua solicitação e abrindo o WhatsApp Web."
        ) +
        "</p>" +
        "</div>";

    } catch (error) {
      console.error(
        error
      );
    }
  }

  return newWindow;
}

function sendWhatsappToWindow(
  preparedWindow,
  whatsappUrl
) {
  if (
    !whatsappUrl
  ) {
    return;
  }

  if (
    preparedWindow
  ) {
    preparedWindow.location.href =
      whatsappUrl;

    try {
      preparedWindow.focus();

    } catch (error) {
      console.error(
        error
      );
    }

    return;
  }

  const link =
    document.createElement(
      "a"
    );

  link.href =
    whatsappUrl;

  link.target =
    "_blank";

  link.rel =
    "noopener noreferrer";

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();
}

async function submitBooking() {
  const customerName =
    bookingCustomerName
      ? bookingCustomerName
          .value
          .trim()
      : "";

  const customerPhone =
    bookingCustomerPhone
      ? bookingCustomerPhone.value
      : "";

  if (
    bookingRequestInProgress ||
    !bookingService ||
    !bookingService.value ||
    !selectedBarberId ||
    !selectedDate ||
    !selectedTime ||
    !isValidName(
      customerName
    ) ||
    !isValidPhone(
      customerPhone
    )
  ) {
    return;
  }

  const bookingDate =
    dateToKey(
      selectedDate
    );

  if (
    isSlotBlocked(
      bookingDate,
      selectedTime
    )
  ) {
    alert(
      "Esse horário acabou de ser ocupado. Escolha outro horário."
    );

    await loadBookedSlots();

    renderDays();

    return;
  }

  const whatsappMessage =
    buildWhatsappMessage();

  if (
    !whatsappMessage
  ) {
    alert(
      "Não foi possível montar a mensagem do WhatsApp. Revise os dados e tente novamente."
    );

    return;
  }

  const whatsappUrl =
    buildWhatsappUrlFromMessage(
      whatsappMessage
    );

  const whatsappWindow =
    prepareWhatsappWindow();

  bookingRequestInProgress =
    true;

  const originalText =
    bookingSubmit
      ? bookingSubmit.textContent
      : "";

  if (
    bookingSubmit
  ) {
    bookingSubmit.disabled =
      true;

    bookingSubmit.textContent =
      "Reservando horário...";
  }

  try {
    await supabaseRpc(
      "create_booking_request_by_barber",
      {
        p_customer_name:
          customerName,

        p_customer_phone:
          digitsOnly(
            customerPhone
          ),

        p_service:
          bookingService.value,

        p_barber_id:
          selectedBarberId,

        p_booking_date:
          bookingDate,

        p_booking_time:
          selectedTime
      }
    );

    sendWhatsappToWindow(
      whatsappWindow,
      whatsappUrl
    );

    await loadBookedSlots();

    selectedTime =
      null;

    updateTimeSummary();

    renderDays();

    updateSubmitState();

    advanceMobileBookingFlow(
      false
    );

  } catch (error) {
    if (
      whatsappWindow &&
      !whatsappWindow.closed
    ) {
      whatsappWindow.close();
    }

    await loadBookedSlots();

    renderDays();

    const message =
      error &&
      error.message
        ? error.message
        : "Não foi possível reservar esse horário.";

    alert(
      message +
      "\n\nRevise os dados ou escolha outro horário e tente novamente."
    );

    selectedTime =
      null;

    updateTimeSummary();

    renderTimes();

    advanceMobileBookingFlow(
      false
    );

  } finally {
    bookingRequestInProgress =
      false;

    if (
      bookingSubmit
    ) {
      bookingSubmit.textContent =
        originalText ||
        "Confirmar pelo WhatsApp";
    }

    updateSubmitState();

    syncMobileBookingFlow();
  }
}

async function setupBooking() {
  if (
    !bookingService ||
    !bookingDays ||
    !bookingTimes
  ) {
    return;
  }

  createBarberStep();

  setupMobileBookingFlow();

  bookingService.addEventListener(
    "change",
    handleServiceChange
  );

  if (
    bookingBarber
  ) {
    bookingBarber.addEventListener(
      "change",
      handleBarberChange
    );
  }

  if (
    bookingSubmit
  ) {
    bookingSubmit.addEventListener(
      "click",
      submitBooking
    );
  }

  setupServiceLinks();

  updateServiceSummary();

  updateBarberSummary();

  updateCustomerSummary();

  updateDateSummary(
    null
  );

  updateTimeSummary();

  showSelectionRequiredState(
    "Escolha um serviço e um barbeiro para visualizar a disponibilidade."
  );

  await loadBarbers();

  updateSubmitState();

  syncMobileBookingFlow();
}

function setupInternalLinks() {
  Array.from(
    document.querySelectorAll(
      'a[href^="#"]'
    )
  ).forEach(
    function (link) {
      link.addEventListener(
        "click",
        function (event) {
          const href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            href === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              href
            );

          if (
            !target
          ) {
            return;
          }

          event.preventDefault();

          closeMenu();

          if (
            href ===
            "#agendamento"
          ) {
            syncMobileBookingFlow();
          }

          target.scrollIntoView({
            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",

            block:
              "start"
          });
        }
      );
    }
  );
}

function refreshCurrentDayState() {
  if (
    selectedDate &&
    selectedTime
  ) {
    const selectedKey =
      dateToKey(
        selectedDate
      );

    if (
      selectedKey ===
        getTodayKey() &&
      timeToMinutes(
        selectedTime
      ) <=
        getCurrentMinutes()
    ) {
      selectedTime =
        null;

      updateTimeSummary();
    }
  }

  if (
    selectedBarberId &&
    selectedDate
  ) {
    renderTimes();
  }

  updateSubmitState();

  syncMobileBookingFlow();
}

async function refreshAvailability() {
  if (
    !selectedBarberId ||
    !bookingService ||
    !bookingService.value
  ) {
    return;
  }

  await loadBookedSlots();

  renderDays();
}

function refreshDeviceSettings() {
  setupDeviceDetection();

  setupDeviceAwareWhatsappLinks();

  syncMobileBookingFlow();

  updateMobileNavActiveState();

  if (
    !isMobileLayout()
  ) {
    document.body.classList.remove(
      "mobile-keyboard-open"
    );
  }
}

function initializeSite() {
  setupDeviceDetection();

  injectDynamicStyles();

  setupMenu();

  setupMobileServices();

  createMobileBottomNav();

  setupInternalLinks();

  setupDeviceAwareWhatsappLinks();

  setupMobileNavActiveTracking();

  setupKeyboardAwareMobileNav();

  setupBooking();

  window.setInterval(
    refreshCurrentDayState,
    60000
  );

  window.setInterval(
    refreshAvailability,
    30000
  );

  window.addEventListener(
    "resize",
    refreshDeviceSettings
  );
}

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeSite
  );
} else {
  initializeSite();
}
