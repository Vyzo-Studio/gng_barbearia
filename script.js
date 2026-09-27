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

let bookingBarber = null;
let summaryBarber = null;

let barbers = [];

let selectedBarberId = null;
let selectedBarberName = "";

let selectedDate = null;
let selectedTime = null;

let blockedSlots = new Map();

let bookingRequestInProgress =
  false;

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

function dateToKey(date) {
  return buildDateKey(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );
}

function formatWeekday(date) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      weekday:
        "short",

      timeZone:
        "UTC"
    }
  )
    .format(date)
    .replace(
      ".",
      ""
    );
}

function formatMonth(date) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      month:
        "short",

      timeZone:
        "UTC"
    }
  )
    .format(date)
    .replace(
      ".",
      ""
    );
}

function formatFullDate(date) {
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

function capitalizeFirst(value) {
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

function timeToMinutes(time) {
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

function normalizeDatabaseTime(time) {
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

      minutes
    });
  }

  return slots;
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

  let data = null;

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

  barberStep.innerHTML =
    `
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

  if (
    dayNumber
  ) {
    dayNumber.textContent =
      "03";
  }

  if (
    timeStep
  ) {
    const timeNumber =
      timeStep.querySelector(
        ".booking-step-number"
      );

    if (
      timeNumber
    ) {
      timeNumber.textContent =
        "04";
    }
  }

  createBarberSummary();
}

function createBarberSummary() {
  if (
    document.getElementById(
      "summary-barber"
    )
  ) {
    summaryBarber =
      document.getElementById(
        "summary-barber"
      );

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

  barberRow.innerHTML =
    `
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
      barbers.length ===
      0
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
      '<option value="">Não foi possível carregar os barbeiros</option>';

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
    ) ||
    null
  );
}

function updateBarberSummary() {
  if (
    !summaryBarber
  ) {
    return;
  }

  summaryBarber.textContent =
    selectedBarberName ||
    "Não selecionado";
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
  if (
    !blockedSlots.has(
      date
    )
  ) {
    return false;
  }

  return blockedSlots
    .get(
      date
    )
    .has(
      time
    );
}

function hasAvailableTime(
  dateKey
) {
  if (
    !selectedBarberId
  ) {
    return false;
  }

  const slots =
    generateSlots();

  return slots.some(
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

function showBarberRequiredState() {
  if (
    bookingDays
  ) {
    bookingDays.innerHTML =
      `
        <div class="booking-empty">
          Escolha um barbeiro para visualizar os dias disponíveis.
        </div>
      `;
  }

  if (
    bookingTimes
  ) {
    bookingTimes.innerHTML =
      `
        <div class="booking-empty">
          Escolha um barbeiro para visualizar os horários disponíveis.
        </div>
      `;
  }
}

async function loadBookedSlots() {
  if (
    !selectedBarberId
  ) {
    clearBlockedSlots();

    showBarberRequiredState();

    updateSubmitState();

    return;
  }

  try {
    const today =
      getTodayDate();

    const finalDate =
      addDays(
        today,
        BOOKING_DAYS_COUNT -
          1
      );

    const data =
      await supabaseRpc(
        "get_public_booked_slots_by_barber",
        {
          p_barber_id:
            selectedBarberId,

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
        function (booking) {
          addBlockedSlot(
            booking.booking_date,
            normalizeDatabaseTime(
              booking.booking_time
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

    if (
      selectedDate
    ) {
      renderTimes();
    }

    updateSubmitState();
  } catch (error) {
    console.error(
      "Erro ao carregar horários ocupados:",
      error
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

  if (
    !date
  ) {
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

  bookingSubmit.disabled =
    bookingRequestInProgress ||
    !bookingService.value ||
    !selectedBarberId ||
    !selectedDate ||
    !selectedTime ||
    occupied;
}

function renderDays() {
  if (
    !bookingDays
  ) {
    return;
  }

  if (
    !selectedBarberId
  ) {
    showBarberRequiredState();
    return;
  }

  bookingDays.innerHTML =
    "";

  const today =
    getTodayDate();

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
      !firstAvailableDate &&
      available
    ) {
      firstAvailableDate =
        date;
    }

    button.addEventListener(
      "click",
      function () {
        if (
          button.disabled
        ) {
          return;
        }

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
  } else {
    selectedDate =
      null;

    selectedTime =
      null;

    updateDateSummary(
      null
    );

    updateTimeSummary();

    if (
      bookingTimes
    ) {
      bookingTimes.innerHTML =
        `
          <div class="booking-empty">
            Este barbeiro não possui horários disponíveis neste período.
          </div>
        `;
    }
  }
}

function selectDate(date) {
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
    !bookingTimes
  ) {
    return;
  }

  if (
    !selectedBarberId
  ) {
    showBarberRequiredState();
    return;
  }

  if (
    !selectedDate
  ) {
    bookingTimes.innerHTML =
      `
        <div class="booking-empty">
          Escolha um dia para visualizar os horários.
        </div>
      `;

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
          '<span class="booking-time-status">Ocupado</span>';

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

        if (
          selectedTime ===
          slot.value
        ) {
          button.classList.add(
            "is-selected"
          );

          button.setAttribute(
            "aria-pressed",
            "true"
          );
        } else {
          button.setAttribute(
            "aria-pressed",
            "false"
          );
        }

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
    !selectedBarberId
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
    !selectedBarberId
  ) {
    showBarberRequiredState();
    return;
  }

  if (
    bookingDays
  ) {
    bookingDays.innerHTML =
      `
        <div class="booking-empty">
          Carregando disponibilidade...
        </div>
      `;
  }

  if (
    bookingTimes
  ) {
    bookingTimes.innerHTML =
      `
        <div class="booking-empty">
          Carregando horários...
        </div>
      `;
  }

  await loadBookedSlots();

  renderDays();

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
    !selectedBarberId ||
    !selectedBarberName ||
    !selectedDate ||
    !selectedTime
  ) {
    return "";
  }

  const service =
    bookingService.value;

  const dateText =
    capitalizeFirst(
      formatFullDate(
        selectedDate
      )
    );

  return (
    "Olá, GNG Barbearia!\n\n" +
    "Acabei de solicitar pelo site um agendamento para *" +
    service +
    "* com o barbeiro *" +
    selectedBarberName +
    "*, no dia *" +
    dateText +
    "*, às *" +
    selectedTime +
    "*.\n\n" +
    "Poderiam, por gentileza, confirmar meu agendamento? " +
    "Fico no aguardo. Obrigado!"
  );
}

function buildWhatsappUrl() {
  return (
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(
      buildWhatsappMessage()
    )
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
      newWindow.document.title =
        "Abrindo WhatsApp...";

      newWindow.document.body.innerHTML =
        '<div style="font-family:Arial,sans-serif;padding:40px;text-align:center;color:#17243a"><strong>Aguarde...</strong><p>Estamos registrando sua solicitação e abrindo o WhatsApp.</p></div>';
    } catch (error) {
      console.error(
        error
      );
    }
  }

  return newWindow;
}

function sendWhatsappToWindow(
  preparedWindow
) {
  const url =
    buildWhatsappUrl();

  if (
    preparedWindow
  ) {
    preparedWindow.location.href =
      url;

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
    url;

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
  if (
    bookingRequestInProgress ||
    !bookingService ||
    !bookingService.value ||
    !selectedBarberId ||
    !selectedDate ||
    !selectedTime
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
      "Esse horário acabou de ser ocupado para este barbeiro. Escolha outro horário."
    );

    await loadBookedSlots();

    renderDays();

    return;
  }

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
          "Cliente via WhatsApp",

        p_customer_phone:
          null,

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

    addBlockedSlot(
      bookingDate,
      selectedTime
    );

    renderTimes();

    sendWhatsappToWindow(
      whatsappWindow
    );

    selectedTime =
      null;

    updateTimeSummary();

    updateSubmitState();

    window.setTimeout(
      async function () {
        await loadBookedSlots();

        renderDays();
      },
      1200
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
        "\n\nEscolha outro horário e tente novamente."
    );

    selectedTime =
      null;

    updateTimeSummary();

    renderTimes();
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

  bookingService.addEventListener(
    "change",
    updateServiceSummary
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

  updateDateSummary(
    null
  );

  updateTimeSummary();

  showBarberRequiredState();

  await loadBarbers();

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

          if (
            !target
          ) {
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
}

async function refreshAvailability() {
  if (
    !selectedBarberId
  ) {
    return;
  }

  await loadBookedSlots();

  if (
    selectedBarberId
  ) {
    renderDays();
  }
}

function initializeSite() {
  setupMenu();

  setupInternalLinks();

  setupBooking();

  window.setInterval(
    refreshCurrentDayState,
    60000
  );

  window.setInterval(
    refreshAvailability,
    30000
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
