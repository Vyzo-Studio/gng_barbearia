const menuToggle =
  document.getElementById(
    "menu-toggle"
  );

const mainNav =
  document.getElementById(
    "main-nav"
  );

const year =
  document.getElementById(
    "year"
  );

const bookingService =
  document.getElementById(
    "booking-service"
  );

const bookingDays =
  document.getElementById(
    "booking-days"
  );

const bookingTimes =
  document.getElementById(
    "booking-times"
  );

const bookingSubmit =
  document.getElementById(
    "booking-submit"
  );

const summaryService =
  document.getElementById(
    "summary-service"
  );

const summaryPrice =
  document.getElementById(
    "summary-price"
  );

const summaryDate =
  document.getElementById(
    "summary-date"
  );

const summaryTime =
  document.getElementById(
    "summary-time"
  );

const serviceLinks =
  Array.from(
    document.querySelectorAll(
      "[data-service-link]"
    )
  );

const WHATSAPP_NUMBER =
  "5561994075539";

const BUSINESS_TIMEZONE =
  "America/Sao_Paulo";

const SLOT_START_HOUR =
  9;

const SLOT_START_MINUTE =
  0;

const SLOT_END_HOUR =
  19;

const SLOT_END_MINUTE =
  30;

const SLOT_INTERVAL =
  30;

const BOOKING_DAYS_COUNT =
  7;

let selectedDate = null;
let selectedTime = null;

if (year) {
  year.textContent =
    new Date().getFullYear();
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

  const parts =
    formatter.formatToParts(
      new Date()
    );

  const result = {};

  parts.forEach(
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

function generateSlots() {
  const slots = [];

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
    minutes += SLOT_INTERVAL
  ) {
    const hour =
      Math.floor(
        minutes / 60
      );

    const minute =
      minutes % 60;

    slots.push({
      value:
        padNumber(
          hour
        ) +
        ":" +
        padNumber(
          minute
        ),
      minutes:
        minutes
    });
  }

  return slots;
}

function hasAvailableTime(
  dateKey
) {
  if (
    dateKey !==
    getTodayKey()
  ) {
    return true;
  }

  const currentMinutes =
    getCurrentMinutes();

  const slots =
    generateSlots();

  return slots.some(
    function (slot) {
      return (
        slot.minutes >
        currentMinutes
      );
    }
  );
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

  if (!date) {
    summaryDate.textContent =
      "Não selecionado";

    return;
  }

  summaryDate.textContent =
    capitalizeFirst(
      formatFullDate(
        date
      )
    );
}

function updateTimeSummary() {
  if (
    !summaryTime
  ) {
    return;
  }

  summaryTime.textContent =
    selectedTime ||
    "Não selecionado";
}

function updateSubmitState() {
  if (
    !bookingSubmit ||
    !bookingService
  ) {
    return;
  }

  bookingSubmit.disabled =
    !bookingService.value ||
    !selectedDate ||
    !selectedTime;
}

function renderDays() {
  if (
    !bookingDays
  ) {
    return;
  }

  bookingDays.innerHTML =
    "";

  const now =
    getBusinessDateParts();

  const today =
    createUtcDate(
      now.year,
      now.month,
      now.day
    );

  const todayKey =
    dateToKey(
      today
    );

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

    if (
      !firstAvailableDate &&
      hasAvailableTime(
        dateKey
      )
    ) {
      firstAvailableDate =
        date;
    }

    button.addEventListener(
      "click",
      function () {
        selectDate(
          date
        );
      }
    );

    bookingDays.appendChild(
      button
    );
  }

  if (
    firstAvailableDate
  ) {
    selectDate(
      firstAvailableDate
    );
  }
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

  const selectedKey =
    dateToKey(
      selectedDate
    );

  const buttons =
    bookingDays
      ? Array.from(
          bookingDays.querySelectorAll(
            ".booking-day"
          )
        )
      : [];

  buttons.forEach(
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

  updateDateSummary(
    selectedDate
  );

  updateTimeSummary();

  renderTimes();

  updateSubmitState();
}

function renderTimes() {
  if (
    !bookingTimes ||
    !selectedDate
  ) {
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

  const slots =
    generateSlots();

  slots.forEach(
    function (slot) {
      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "booking-time";

      button.textContent =
        slot.value;

      button.dataset.time =
        slot.value;

      const passed =
        selectedKey ===
          todayKey &&
        slot.minutes <=
          currentMinutes;

      if (passed) {
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
  selectedTime =
    time;

  const buttons =
    bookingTimes
      ? Array.from(
          bookingTimes.querySelectorAll(
            ".booking-time"
          )
        )
      : [];

  buttons.forEach(
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
}

function findServiceOption(
  service
) {
  if (
    !bookingService
  ) {
    return null;
  }

  return Array.from(
    bookingService.options
  ).find(
    function (option) {
      return (
        option.value ===
        service
      );
    }
  );
}

function selectServiceFromLink(
  service
) {
  if (
    !bookingService
  ) {
    return;
  }

  const option =
    findServiceOption(
      service
    );

  if (!option) {
    return;
  }

  bookingService.value =
    service;

  updateServiceSummary();
}

function setupServiceLinks() {
  serviceLinks.forEach(
    function (link) {
      link.addEventListener(
        "click",
        function () {
          const service =
            link.dataset.serviceLink;

          if (service) {
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
    !selectedDate ||
    !selectedTime
  ) {
    return "";
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

  const dateText =
    capitalizeFirst(
      formatFullDate(
        selectedDate
      )
    );

  return (
    "Olá, GNG Barbearia! " +
    "Vim pelo site e gostaria de solicitar este agendamento:\n\n" +
    "Serviço: " +
    service +
    "\n" +
    "Valor: " +
    price +
    "\n" +
    "Data: " +
    dateText +
    "\n" +
    "Horário: " +
    selectedTime +
    "\n\n" +
    "Podem confirmar se esse horário está disponível?"
  );
}

function submitBooking() {
  if (
    !bookingService ||
    !bookingService.value ||
    !selectedDate ||
    !selectedTime
  ) {
    return;
  }

  const message =
    buildWhatsappMessage();

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(
      message
    );

  const opened =
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  if (!opened) {
    window.location.href =
      url;
  }
}

function setupBooking() {
  if (
    !bookingService ||
    !bookingDays ||
    !bookingTimes
  ) {
    return;
  }

  bookingService.addEventListener(
    "change",
    function () {
      updateServiceSummary();
    }
  );

  if (
    bookingSubmit
  ) {
    bookingSubmit.addEventListener(
      "click",
      submitBooking
    );
  }

  setupServiceLinks();

  renderDays();

  updateServiceSummary();

  updateTimeSummary();

  updateSubmitState();
}

function setupInternalLinks() {
  const links =
    Array.from(
      document.querySelectorAll(
        'a[href^="#"]'
      )
    );

  links.forEach(
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

          if (!target) {
            return;
          }

          event.preventDefault();

          closeMenu();

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
    !selectedDate
  ) {
    return;
  }

  renderTimes();

  selectedTime =
    null;

  updateTimeSummary();

  updateSubmitState();
}

function initializeSite() {
  setupMenu();

  setupBooking();

  setupInternalLinks();

  window.setInterval(
    refreshCurrentDayState,
    60000
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
