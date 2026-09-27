const supabaseClient =
  window.supabaseClient;

const ADMIN_TIMEZONE =
  "America/Sao_Paulo";

const adminLogin =
  document.getElementById(
    "admin-login"
  );

const adminDashboard =
  document.getElementById(
    "admin-dashboard"
  );

const adminLoginForm =
  document.getElementById(
    "admin-login-form"
  );

const adminEmailInput =
  document.getElementById(
    "admin-email"
  );

const adminPasswordInput =
  document.getElementById(
    "admin-password"
  );

const adminLoginButton =
  document.getElementById(
    "admin-login-button"
  );

const loginMessage =
  document.getElementById(
    "login-message"
  );

const passwordToggle =
  document.getElementById(
    "password-toggle"
  );

const adminLogoutButton =
  document.getElementById(
    "admin-logout-button"
  );

const adminUserEmail =
  document.getElementById(
    "admin-user-email"
  );

const adminRefreshButton =
  document.getElementById(
    "admin-refresh-button"
  );

const statPending =
  document.getElementById(
    "stat-pending"
  );

const statConfirmed =
  document.getElementById(
    "stat-confirmed"
  );

const statToday =
  document.getElementById(
    "stat-today"
  );

const statReceivedToday =
  document.getElementById(
    "stat-received-today"
  );

const adminSectionNavButtons =
  Array.from(
    document.querySelectorAll(
      "[data-admin-section]"
    )
  );

const adminPanels =
  Array.from(
    document.querySelectorAll(
      "[data-admin-panel]"
    )
  );

const bookingTabs =
  Array.from(
    document.querySelectorAll(
      "[data-booking-view]"
    )
  );

const bookingTabPendingCount =
  document.getElementById(
    "booking-tab-pending-count"
  );

const bookingTabScheduledCount =
  document.getElementById(
    "booking-tab-scheduled-count"
  );

const bookingTabFinalizedCount =
  document.getElementById(
    "booking-tab-finalized-count"
  );

const bookingTabHistoryCount =
  document.getElementById(
    "booking-tab-history-count"
  );

const adminDateFilter =
  document.getElementById(
    "admin-date-filter"
  );

const adminSearch =
  document.getElementById(
    "admin-search"
  );

const clearFiltersButton =
  document.getElementById(
    "clear-filters-button"
  );

const adminSelectedDayLabel =
  document.getElementById(
    "admin-selected-day-label"
  );

const adminBookingsKicker =
  document.getElementById(
    "admin-bookings-kicker"
  );

const adminBookingsTitle =
  document.getElementById(
    "admin-bookings-title"
  );

const adminLastUpdate =
  document.getElementById(
    "admin-last-update"
  );

const adminLoading =
  document.getElementById(
    "admin-loading"
  );

const adminEmpty =
  document.getElementById(
    "admin-empty"
  );

const adminEmptyTitle =
  document.getElementById(
    "admin-empty-title"
  );

const adminEmptyText =
  document.getElementById(
    "admin-empty-text"
  );

const adminBookingsList =
  document.getElementById(
    "admin-bookings-list"
  );

const adminGlobalMessage =
  document.getElementById(
    "admin-global-message"
  );

const manualBookingForm =
  document.getElementById(
    "manual-booking-form"
  );

const manualCustomerName =
  document.getElementById(
    "manual-customer-name"
  );

const manualCustomerPhone =
  document.getElementById(
    "manual-customer-phone"
  );

const manualService =
  document.getElementById(
    "manual-service"
  );

const manualBookingDate =
  document.getElementById(
    "manual-booking-date"
  );

const manualBookingTime =
  document.getElementById(
    "manual-booking-time"
  );

const manualBookingSubmit =
  document.getElementById(
    "manual-booking-submit"
  );

const manualBookingMessage =
  document.getElementById(
    "manual-booking-message"
  );

const blockSlotForm =
  document.getElementById(
    "block-slot-form"
  );

const blockSlotDate =
  document.getElementById(
    "block-slot-date"
  );

const blockSlotTime =
  document.getElementById(
    "block-slot-time"
  );

const blockSlotReason =
  document.getElementById(
    "block-slot-reason"
  );

const blockSlotSubmit =
  document.getElementById(
    "block-slot-submit"
  );

const blockSlotMessage =
  document.getElementById(
    "block-slot-message"
  );

const blockedSlotsRefresh =
  document.getElementById(
    "blocked-slots-refresh"
  );

const blockedSlotsList =
  document.getElementById(
    "blocked-slots-list"
  );

const blockedSlotsEmpty =
  document.getElementById(
    "blocked-slots-empty"
  );

const cashStatusBadge =
  document.getElementById(
    "cash-status-badge"
  );

const cashDateLabel =
  document.getElementById(
    "cash-date-label"
  );

const cashTodayTotal =
  document.getElementById(
    "cash-today-total"
  );

const cashTodayCount =
  document.getElementById(
    "cash-today-count"
  );

const cashOpenButton =
  document.getElementById(
    "cash-open-button"
  );

const cashCloseButton =
  document.getElementById(
    "cash-close-button"
  );

const cashMessage =
  document.getElementById(
    "cash-message"
  );

const cashExpectedToday =
  document.getElementById(
    "cash-expected-today"
  );

const cashExpectedCount =
  document.getElementById(
    "cash-expected-count"
  );

const cashReceivedToday =
  document.getElementById(
    "cash-received-today"
  );

const cashMonthTotal =
  document.getElementById(
    "cash-month-total"
  );

const cashMonthCount =
  document.getElementById(
    "cash-month-count"
  );

const cashYearTotal =
  document.getElementById(
    "cash-year-total"
  );

const cashYearCount =
  document.getElementById(
    "cash-year-count"
  );

const cashPaymentCashTotal =
  document.getElementById(
    "cash-payment-cash-total"
  );

const cashPaymentCashCount =
  document.getElementById(
    "cash-payment-cash-count"
  );

const cashPaymentPixTotal =
  document.getElementById(
    "cash-payment-pix-total"
  );

const cashPaymentPixCount =
  document.getElementById(
    "cash-payment-pix-count"
  );

const cashPaymentDebitTotal =
  document.getElementById(
    "cash-payment-debit-total"
  );

const cashPaymentDebitCount =
  document.getElementById(
    "cash-payment-debit-count"
  );

const cashPaymentCreditTotal =
  document.getElementById(
    "cash-payment-credit-total"
  );

const cashPaymentCreditCount =
  document.getElementById(
    "cash-payment-credit-count"
  );

const bookingModal =
  document.getElementById(
    "booking-modal"
  );

const bookingModalClose =
  document.getElementById(
    "booking-modal-close"
  );

const bookingModalTitle =
  document.getElementById(
    "booking-modal-title"
  );

const bookingModalContent =
  document.getElementById(
    "booking-modal-content"
  );

const bookingModalMessage =
  document.getElementById(
    "booking-modal-message"
  );

const bookingModalActions =
  document.getElementById(
    "booking-modal-actions"
  );

const paymentModal =
  document.getElementById(
    "payment-modal"
  );

const paymentModalClose =
  document.getElementById(
    "payment-modal-close"
  );

const paymentModalMessage =
  document.getElementById(
    "payment-modal-message"
  );

const paymentOptions =
  Array.from(
    document.querySelectorAll(
      "[data-payment-method]"
    )
  );

const adminConfirm =
  document.getElementById(
    "admin-confirm"
  );

const adminConfirmTitle =
  document.getElementById(
    "admin-confirm-title"
  );

const adminConfirmText =
  document.getElementById(
    "admin-confirm-text"
  );

const adminConfirmCancel =
  document.getElementById(
    "admin-confirm-cancel"
  );

const adminConfirmAction =
  document.getElementById(
    "admin-confirm-action"
  );

const state = {
  session:
    null,

  user:
    null,

  selectedDate:
    null,

  bookingView:
    "pending",

  bookings:
    [],

  todayBookings:
    [],

  blockedSlots:
    [],

  cashSummary:
    null,

  activeBookingId:
    null,

  paymentBookingId:
    null,

  refreshing:
    false,

  countdownReloadQueued:
    false,

  confirmResolver:
    null
};

const STATUS_LABELS = {
  pending:
    "Pendente",

  confirmed:
    "Confirmado",

  completed:
    "Finalizado",

  cancelled:
    "Cancelado",

  rejected:
    "Recusado",

  expired:
    "Expirado"
};

const PAYMENT_LABELS = {
  cash:
    "Dinheiro",

  pix:
    "Pix",

  debit:
    "Débito",

  credit:
    "Crédito"
};

function escapeHtml(value) {
  return String(
    value ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}

function setMessage(
  element,
  message,
  type = "info"
) {
  if (!element) {
    return;
  }

  element.hidden =
    !message;

  element.textContent =
    message || "";

  element.classList.remove(
    "is-error",
    "is-success",
    "is-info"
  );

  if (!message) {
    return;
  }

  element.classList.add(
    type === "error"
      ? "is-error"
      : type === "success"
        ? "is-success"
        : "is-info"
  );
}

function setButtonLoading(
  button,
  loading,
  loadingText,
  originalText
) {
  if (!button) {
    return;
  }

  button.disabled =
    loading;

  if (loading) {
    button.dataset.originalText =
      button.textContent;

    button.textContent =
      loadingText;
  } else {
    button.textContent =
      originalText ||
      button.dataset.originalText ||
      button.textContent;
  }
}

function getBusinessDateParts() {
  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          ADMIN_TIMEZONE,

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

function getTodayKey() {
  const parts =
    getBusinessDateParts();

  return (
    parts.year +
    "-" +
    padNumber(
      parts.month
    ) +
    "-" +
    padNumber(
      parts.day
    )
  );
}

function addDaysToKey(
  dateKey,
  amount
) {
  const date =
    new Date(
      dateKey +
        "T12:00:00Z"
    );

  date.setUTCDate(
    date.getUTCDate() +
      amount
  );

  return (
    date.getUTCFullYear() +
    "-" +
    padNumber(
      date.getUTCMonth() +
        1
    ) +
    "-" +
    padNumber(
      date.getUTCDate()
    )
  );
}

function formatDateLong(
  dateKey
) {
  if (!dateKey) {
    return "—";
  }

  const date =
    new Date(
      dateKey +
        "T12:00:00Z"
    );

  const text =
    new Intl.DateTimeFormat(
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

  return (
    text
      .charAt(0)
      .toUpperCase() +
    text.slice(1)
  );
}

function formatDateShort(
  dateKey
) {
  if (!dateKey) {
    return "—";
  }

  const date =
    new Date(
      dateKey +
        "T12:00:00Z"
    );

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",

      timeZone:
        "UTC"
    }
  ).format(
    date
  );
}

function formatDateTime(
  value
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(
      value
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",

      timeZone:
        ADMIN_TIMEZONE
    }
  ).format(
    date
  );
}

function normalizeTime(
  value
) {
  if (!value) {
    return "";
  }

  return String(
    value
  ).slice(
    0,
    5
  );
}

function formatMoney(
  cents
) {
  const value =
    Number(
      cents || 0
    ) / 100;

  return new Intl.NumberFormat(
    "pt-BR",
    {
      style:
        "currency",

      currency:
        "BRL"
    }
  ).format(
    value
  );
}

function pluralize(
  count,
  singular,
  plural
) {
  return (
    count +
    " " +
    (
      count === 1
        ? singular
        : plural
    )
  );
}

function normalizePhone(
  phone
) {
  return String(
    phone || ""
  ).replace(
    /\D/g,
    ""
  );
}

function formatPhone(
  phone
) {
  const digits =
    normalizePhone(
      phone
    );

  let value =
    digits;

  if (
    value.startsWith(
      "55"
    ) &&
    value.length >=
      12
  ) {
    value =
      value.slice(
        2
      );
  }

  if (
    value.length ===
    11
  ) {
    return (
      "(" +
      value.slice(
        0,
        2
      ) +
      ") " +
      value.slice(
        2,
        7
      ) +
      "-" +
      value.slice(
        7
      )
    );
  }

  if (
    value.length ===
    10
  ) {
    return (
      "(" +
      value.slice(
        0,
        2
      ) +
      ") " +
      value.slice(
        2,
        6
      ) +
      "-" +
      value.slice(
        6
      )
    );
  }

  return (
    phone ||
    "Não informado"
  );
}

function buildCustomerWhatsappUrl(
  phone
) {
  let digits =
    normalizePhone(
      phone
    );

  if (!digits) {
    return null;
  }

  if (
    digits.length === 10 ||
    digits.length === 11
  ) {
    digits =
      "55" +
      digits;
  }

  const message =
    "Olá! Aqui é da GNG Barbearia. Estou entrando em contato sobre o seu agendamento.";

  return (
    "https://wa.me/" +
    digits +
    "?text=" +
    encodeURIComponent(
      message
    )
  );
}

function generateTimeValues() {
  const values =
    [];

  const start =
    9 * 60;

  const end =
    19 * 60 +
    30;

  for (
    let minutes = start;
    minutes <= end;
    minutes += 30
  ) {
    const hour =
      Math.floor(
        minutes / 60
      );

    const minute =
      minutes % 60;

    values.push(
      padNumber(
        hour
      ) +
        ":" +
        padNumber(
          minute
        )
    );
  }

  return values;
}

function getCurrentBusinessMinutes() {
  const parts =
    getBusinessDateParts();

  return (
    parts.hour *
      60 +
    parts.minute
  );
}

function timeToMinutes(
  time
) {
  const parts =
    String(
      time || "00:00"
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

async function rpc(
  functionName,
  payload = {}
) {
  if (
    !supabaseClient
  ) {
    throw new Error(
      "O Supabase não foi iniciado."
    );
  }

  const {
    data,
    error
  } =
    await supabaseClient.rpc(
      functionName,
      payload
    );

  if (error) {
    throw new Error(
      error.message ||
      "Não foi possível concluir a operação."
    );
  }

  return data;
}

function showLogin() {
  if (adminLogin) {
    adminLogin.hidden =
      false;
  }

  if (adminDashboard) {
    adminDashboard.hidden =
      true;
  }

  document.body.classList.remove(
    "modal-open"
  );
}

function showDashboard() {
  if (adminLogin) {
    adminLogin.hidden =
      true;
  }

  if (adminDashboard) {
    adminDashboard.hidden =
      false;
  }

  if (
    adminUserEmail &&
    state.user
  ) {
    adminUserEmail.textContent =
      state.user.email ||
      "";
  }
}

async function validateAdminUser(
  user
) {
  if (
    !user ||
    !user.email
  ) {
    return false;
  }

  if (
    typeof window.GNG_isConfiguredAdminEmail ===
      "function" &&
    !window.GNG_isConfiguredAdminEmail(
      user.email
    )
  ) {
    return false;
  }

  try {
    const allowed =
      await rpc(
        "is_gng_admin"
      );

    return (
      allowed ===
      true
    );
  } catch (error) {
    console.error(
      error
    );

    return false;
  }
}

async function establishSession(
  session
) {
  if (
    !session ||
    !session.user
  ) {
    state.session =
      null;

    state.user =
      null;

    showLogin();

    return false;
  }

  const allowed =
    await validateAdminUser(
      session.user
    );

  if (!allowed) {
    try {
      await supabaseClient.auth.signOut();
    } catch (error) {
      console.error(
        error
      );
    }

    state.session =
      null;

    state.user =
      null;

    showLogin();

    setMessage(
      loginMessage,
      "Esta conta não possui autorização para acessar o painel da GNG.",
      "error"
    );

    return false;
  }

  state.session =
    session;

  state.user =
    session.user;

  showDashboard();

  await refreshDashboard();

  return true;
}

async function restoreSession() {
  if (
    !supabaseClient
  ) {
    setMessage(
      loginMessage,
      "Não foi possível iniciar a conexão com o Supabase.",
      "error"
    );

    showLogin();

    return;
  }

  try {
    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();

    if (error) {
      throw error;
    }

    if (
      data &&
      data.session
    ) {
      await establishSession(
        data.session
      );
    } else {
      showLogin();
    }
  } catch (error) {
    console.error(
      error
    );

    showLogin();

    setMessage(
      loginMessage,
      "Não foi possível verificar a sessão administrativa.",
      "error"
    );
  }
}

async function handleLogin(
  event
) {
  event.preventDefault();

  if (
    !supabaseClient ||
    !adminEmailInput ||
    !adminPasswordInput
  ) {
    return;
  }

  setMessage(
    loginMessage,
    ""
  );

  const email =
    adminEmailInput.value
      .trim()
      .toLowerCase();

  const password =
    adminPasswordInput.value;

  if (
    typeof window.GNG_isConfiguredAdminEmail ===
      "function" &&
    !window.GNG_isConfiguredAdminEmail(
      email
    )
  ) {
    setMessage(
      loginMessage,
      "Este e-mail não está autorizado para acessar o painel.",
      "error"
    );

    return;
  }

  if (
    !password
  ) {
    setMessage(
      loginMessage,
      "Digite a senha da conta administrativa.",
      "error"
    );

    return;
  }

  const originalText =
    adminLoginButton
      ? adminLoginButton.textContent
      : "";

  setButtonLoading(
    adminLoginButton,
    true,
    "ENTRANDO..."
  );

  try {
    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword(
        {
          email,
          password
        }
      );

    if (error) {
      throw error;
    }

    const valid =
      await establishSession(
        data.session
      );

    if (!valid) {
      return;
    }

    adminPasswordInput.value =
      "";
  } catch (error) {
    console.error(
      error
    );

    let message =
      "Não foi possível entrar no painel.";

    const raw =
      String(
        error?.message ||
        ""
      ).toLowerCase();

    if (
      raw.includes(
        "invalid login credentials"
      )
    ) {
      message =
        "E-mail ou senha incorretos.";
    }

    setMessage(
      loginMessage,
      message,
      "error"
    );
  } finally {
    setButtonLoading(
      adminLoginButton,
      false,
      "",
      originalText ||
        "ENTRAR NO PAINEL"
    );
  }
}

async function handleLogout() {
  if (
    !supabaseClient
  ) {
    return;
  }

  try {
    await supabaseClient.auth.signOut();
  } catch (error) {
    console.error(
      error
    );
  }

  state.session =
    null;

  state.user =
    null;

  state.bookings =
    [];

  state.todayBookings =
    [];

  state.blockedSlots =
    [];

  state.cashSummary =
    null;

  showLogin();
}

function setupPasswordToggle() {
  if (
    !passwordToggle ||
    !adminPasswordInput
  ) {
    return;
  }

  passwordToggle.addEventListener(
    "click",
    function () {
      const hidden =
        adminPasswordInput.type ===
        "password";

      adminPasswordInput.type =
        hidden
          ? "text"
          : "password";

      passwordToggle.textContent =
        hidden
          ? "OCULTAR"
          : "MOSTRAR";

      passwordToggle.setAttribute(
        "aria-label",
        hidden
          ? "Ocultar senha"
          : "Mostrar senha"
      );
    }
  );
}

function switchAdminSection(
  sectionName
) {
  adminSectionNavButtons.forEach(
    function (button) {
      const active =
        button.dataset.adminSection ===
        sectionName;

      button.classList.toggle(
        "is-active",
        active
      );
    }
  );

  adminPanels.forEach(
    function (panel) {
      const active =
        panel.dataset.adminPanel ===
        sectionName;

      panel.hidden =
        !active;

      panel.classList.toggle(
        "is-active",
        active
      );
    }
  );

  if (
    sectionName ===
    "caixa"
  ) {
    loadCashSummary();
  }

  if (
    sectionName ===
    "gestao"
  ) {
    refreshManagementAvailability();

    loadBlockedSlots();
  }
}

function setupSectionNavigation() {
  adminSectionNavButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          switchAdminSection(
            button.dataset.adminSection
          );
        }
      );
    }
  );
}

function matchesBookingView(
  booking,
  view
) {
  if (
    view ===
    "pending"
  ) {
    return (
      booking.status ===
      "pending"
    );
  }

  if (
    view ===
    "scheduled"
  ) {
    return (
      booking.status ===
      "confirmed"
    );
  }

  if (
    view ===
    "finalized"
  ) {
    return (
      booking.status ===
      "completed"
    );
  }

  if (
    view ===
    "history"
  ) {
    return [
      "cancelled",
      "rejected",
      "expired"
    ].includes(
      booking.status
    );
  }

  return true;
}

function bookingMatchesSearch(
  booking
) {
  const query =
    adminSearch
      ? adminSearch.value
          .trim()
          .toLowerCase()
      : "";

  if (!query) {
    return true;
  }

  const haystack =
    [
      booking.customer_name,
      booking.customer_phone,
      booking.service,
      normalizeTime(
        booking.booking_time
      )
    ]
      .join(
        " "
      )
      .toLowerCase();

  return haystack.includes(
    query
  );
}

function countByStatus(
  bookings,
  status
) {
  return bookings.filter(
    function (booking) {
      return (
        booking.status ===
        status
      );
    }
  ).length;
}

function updateBookingTabCounts() {
  const bookings =
    state.bookings;

  const pending =
    countByStatus(
      bookings,
      "pending"
    );

  const scheduled =
    countByStatus(
      bookings,
      "confirmed"
    );

  const finalized =
    countByStatus(
      bookings,
      "completed"
    );

  const history =
    bookings.filter(
      function (booking) {
        return [
          "cancelled",
          "rejected",
          "expired"
        ].includes(
          booking.status
        );
      }
    ).length;

  if (
    bookingTabPendingCount
  ) {
    bookingTabPendingCount.textContent =
      pending;
  }

  if (
    bookingTabScheduledCount
  ) {
    bookingTabScheduledCount.textContent =
      scheduled;
  }

  if (
    bookingTabFinalizedCount
  ) {
    bookingTabFinalizedCount.textContent =
      finalized;
  }

  if (
    bookingTabHistoryCount
  ) {
    bookingTabHistoryCount.textContent =
      history;
  }
}

function getBookingViewText() {
  if (
    state.bookingView ===
    "pending"
  ) {
    return {
      kicker:
        "PENDENTES",

      emptyTitle:
        "NENHUMA SOLICITAÇÃO PENDENTE",

      emptyText:
        "Não existem reservas aguardando confirmação nesta data."
    };
  }

  if (
    state.bookingView ===
    "scheduled"
  ) {
    return {
      kicker:
        "AGENDADOS",

      emptyTitle:
        "NENHUM AGENDAMENTO CONFIRMADO",

      emptyText:
        "Não existem atendimentos confirmados nesta data."
    };
  }

  if (
    state.bookingView ===
    "finalized"
  ) {
    return {
      kicker:
        "FINALIZADOS",

      emptyTitle:
        "NENHUM ATENDIMENTO FINALIZADO",

      emptyText:
        "Não existem atendimentos finalizados nesta data."
    };
  }

  return {
    kicker:
      "HISTÓRICO",

    emptyTitle:
      "HISTÓRICO VAZIO",

    emptyText:
      "Não existem reservas canceladas, recusadas ou expiradas nesta data."
  };
}

function renderBookingCard(
  booking
) {
  const statusLabel =
    STATUS_LABELS[
      booking.status
    ] ||
    booking.status;

  const time =
    normalizeTime(
      booking.booking_time
    );

  const phone =
    booking.customer_phone
      ? formatPhone(
          booking.customer_phone
        )
      : "Telefone não informado";

  const whatsappUrl =
    buildCustomerWhatsappUrl(
      booking.customer_phone
    );

  const amount =
    formatMoney(
      booking.service_amount_cents
    );

  const expiresMarkup =
    booking.status ===
      "pending" &&
    booking.expires_at
      ? `
        <span
          class="pending-countdown"
          data-expires-at="${escapeHtml(
            booking.expires_at
          )}"
        >
          Calculando...
        </span>
      `
      : "";

  let actions =
    `
      <button
        class="booking-action-button"
        type="button"
        data-booking-action="details"
        data-booking-id="${escapeHtml(
          booking.id
        )}"
      >
        DETALHES
      </button>
    `;

  if (
    whatsappUrl
  ) {
    actions += `
      <a
        class="booking-action-button"
        href="${escapeHtml(
          whatsappUrl
        )}"
        target="_blank"
        rel="noopener noreferrer"
      >
        WHATSAPP
      </a>
    `;
  }

  if (
    booking.status ===
    "pending"
  ) {
    actions += `
      <button
        class="booking-action-button accept"
        type="button"
        data-booking-action="confirm"
        data-booking-id="${escapeHtml(
          booking.id
        )}"
      >
        ACEITAR
      </button>

      <button
        class="booking-action-button reject"
        type="button"
        data-booking-action="reject"
        data-booking-id="${escapeHtml(
          booking.id
        )}"
      >
        RECUSAR
      </button>
    `;
  }

  if (
    booking.status ===
    "confirmed"
  ) {
    actions += `
      <button
        class="booking-action-button complete"
        type="button"
        data-booking-action="complete"
        data-booking-id="${escapeHtml(
          booking.id
        )}"
      >
        FINALIZAR
      </button>

      <button
        class="booking-action-button cancel"
        type="button"
        data-booking-action="cancel"
        data-booking-id="${escapeHtml(
          booking.id
        )}"
      >
        CANCELAR
      </button>
    `;
  }

  if (
    booking.status ===
      "completed" &&
    booking.payment_status ===
      "paid"
  ) {
    actions += `
      <button
        class="booking-action-button reject"
        type="button"
        data-booking-action="refund"
        data-booking-id="${escapeHtml(
          booking.id
        )}"
      >
        ESTORNAR
      </button>
    `;
  }

  return `
    <article
      class="admin-booking-card"
      data-status="${escapeHtml(
        booking.status
      )}"
    >

      <div class="booking-card-time">

        <strong>
          ${escapeHtml(
            time
          )}
        </strong>

        <span>
          ${escapeHtml(
            formatDateShort(
              booking.booking_date
            )
          )}
        </span>

        ${expiresMarkup}

      </div>

      <div class="booking-card-client">

        <strong>
          ${escapeHtml(
            booking.customer_name ||
            "Cliente"
          )}
        </strong>

        <span>
          ${escapeHtml(
            phone
          )}
        </span>

        <span
          class="booking-status-badge is-${escapeHtml(
            booking.status
          )}"
        >
          ${escapeHtml(
            statusLabel
          )}
        </span>

      </div>

      <div class="booking-card-service">

        <strong>
          ${escapeHtml(
            booking.service
          )}
        </strong>

        <span>
          ${escapeHtml(
            amount
          )}
        </span>

        ${
          booking.payment_status ===
          "refunded"
            ? `
              <span>
                Pagamento estornado
              </span>
            `
            : ""
        }

      </div>

      <div class="booking-card-actions">
        ${actions}
      </div>

    </article>
  `;
}

function renderBookings() {
  if (
    !adminBookingsList
  ) {
    return;
  }

  const viewText =
    getBookingViewText();

  if (
    adminBookingsKicker
  ) {
    adminBookingsKicker.textContent =
      viewText.kicker;
  }

  if (
    adminEmptyTitle
  ) {
    adminEmptyTitle.textContent =
      viewText.emptyTitle;
  }

  if (
    adminEmptyText
  ) {
    adminEmptyText.textContent =
      viewText.emptyText;
  }

  const filtered =
    state.bookings
      .filter(
        function (booking) {
          return matchesBookingView(
            booking,
            state.bookingView
          );
        }
      )
      .filter(
        bookingMatchesSearch
      )
      .sort(
        function (
          a,
          b
        ) {
          return normalizeTime(
            a.booking_time
          ).localeCompare(
            normalizeTime(
              b.booking_time
            )
          );
        }
      );

  if (
    filtered.length === 0
  ) {
    adminBookingsList.innerHTML =
      "";

    if (
      adminEmpty
    ) {
      adminEmpty.hidden =
        false;
    }

    return;
  }

  if (
    adminEmpty
  ) {
    adminEmpty.hidden =
      true;
  }

  adminBookingsList.innerHTML =
    filtered
      .map(
        renderBookingCard
      )
      .join(
        ""
      );

  updateCountdowns();
}

function updateSelectedDayLabel() {
  if (
    adminSelectedDayLabel
  ) {
    adminSelectedDayLabel.textContent =
      formatDateLong(
        state.selectedDate
      );
  }
}

function renderTodayStats() {
  const bookings =
    state.todayBookings;

  const pending =
    countByStatus(
      bookings,
      "pending"
    );

  const confirmed =
    countByStatus(
      bookings,
      "confirmed"
    );

  const totalToday =
    bookings.filter(
      function (booking) {
        return [
          "pending",
          "confirmed",
          "completed"
        ].includes(
          booking.status
        );
      }
    ).length;

  if (
    statPending
  ) {
    statPending.textContent =
      pending;
  }

  if (
    statConfirmed
  ) {
    statConfirmed.textContent =
      confirmed;
  }

  if (
    statToday
  ) {
    statToday.textContent =
      totalToday;
  }

  if (
    statReceivedToday
  ) {
    statReceivedToday.textContent =
      formatMoney(
        state.cashSummary
          ?.received_today_cents ||
          0
      );
  }
}

async function loadBookingsForDate(
  dateKey
) {
  const data =
    await rpc(
      "admin_list_bookings",
      {
        p_booking_date:
          dateKey
      }
    );

  return Array.isArray(
    data
  )
    ? data
    : [];
}

async function loadSelectedBookings() {
  state.bookings =
    await loadBookingsForDate(
      state.selectedDate
    );

  updateBookingTabCounts();

  updateSelectedDayLabel();

  renderBookings();
}

async function loadTodayBookings() {
  const today =
    getTodayKey();

  if (
    state.selectedDate ===
    today
  ) {
    state.todayBookings =
      state.bookings.slice();
  } else {
    state.todayBookings =
      await loadBookingsForDate(
        today
      );
  }

  renderTodayStats();
}

function setupBookingTabs() {
  bookingTabs.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          const view =
            button.dataset.bookingView;

          state.bookingView =
            view;

          bookingTabs.forEach(
            function (item) {
              const active =
                item ===
                button;

              item.classList.toggle(
                "is-active",
                active
              );

              item.setAttribute(
                "aria-selected",
                active
                  ? "true"
                  : "false"
              );
            }
          );

          renderBookings();
        }
      );
    }
  );
}

async function handleDateChange() {
  if (
    !adminDateFilter ||
    !adminDateFilter.value
  ) {
    return;
  }

  state.selectedDate =
    adminDateFilter.value;

  await refreshDashboard();
}

function setupBookingFilters() {
  if (
    adminDateFilter
  ) {
    adminDateFilter.addEventListener(
      "change",
      handleDateChange
    );
  }

  if (
    adminSearch
  ) {
    adminSearch.addEventListener(
      "input",
      renderBookings
    );
  }

  if (
    clearFiltersButton
  ) {
    clearFiltersButton.addEventListener(
      "click",
      function () {
        if (
          adminSearch
        ) {
          adminSearch.value =
            "";
        }

        renderBookings();
      }
    );
  }
}

function findBooking(
  bookingId
) {
  return (
    state.bookings.find(
      function (booking) {
        return (
          booking.id ===
          bookingId
        );
      }
    ) ||
    state.todayBookings.find(
      function (booking) {
        return (
          booking.id ===
          bookingId
        );
      }
    ) ||
    null
  );
}

function syncBodyModalState() {
  const anyOpen =
    [
      bookingModal,
      paymentModal,
      adminConfirm
    ].some(
      function (element) {
        return (
          element &&
          !element.hidden
        );
      }
    );

  document.body.classList.toggle(
    "modal-open",
    anyOpen
  );
}

function closeBookingModal() {
  if (
    !bookingModal
  ) {
    return;
  }

  bookingModal.hidden =
    true;

  bookingModal.setAttribute(
    "aria-hidden",
    "true"
  );

  state.activeBookingId =
    null;

  setMessage(
    bookingModalMessage,
    ""
  );

  syncBodyModalState();
}

function openBookingModal(
  bookingId
) {
  const booking =
    findBooking(
      bookingId
    );

  if (
    !booking ||
    !bookingModal
  ) {
    return;
  }

  state.activeBookingId =
    booking.id;

  if (
    bookingModalTitle
  ) {
    bookingModalTitle.textContent =
      booking.customer_name ||
      "Detalhes";
  }

  const statusLabel =
    STATUS_LABELS[
      booking.status
    ] ||
    booking.status;

  const paymentMethod =
    booking.payment_method
      ? PAYMENT_LABELS[
          booking.payment_method
        ] ||
        booking.payment_method
      : "Não informado";

  const paymentStatus =
    booking.payment_status ===
      "paid"
      ? "Pago"
      : booking.payment_status ===
          "refunded"
        ? "Estornado"
        : "Não pago";

  if (
    bookingModalContent
  ) {
    bookingModalContent.innerHTML =
      `
        <div class="booking-detail-grid">

          <div class="booking-detail-item">
            <span>Cliente</span>
            <strong>
              ${escapeHtml(
                booking.customer_name ||
                "Cliente"
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Telefone</span>
            <strong>
              ${escapeHtml(
                formatPhone(
                  booking.customer_phone
                )
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Serviço</span>
            <strong>
              ${escapeHtml(
                booking.service
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Valor</span>
            <strong>
              ${escapeHtml(
                formatMoney(
                  booking.service_amount_cents
                )
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Data</span>
            <strong>
              ${escapeHtml(
                formatDateLong(
                  booking.booking_date
                )
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Horário</span>
            <strong>
              ${escapeHtml(
                normalizeTime(
                  booking.booking_time
                )
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Status</span>
            <strong>
              ${escapeHtml(
                statusLabel
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Pagamento</span>
            <strong>
              ${escapeHtml(
                paymentStatus
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Forma de pagamento</span>
            <strong>
              ${escapeHtml(
                paymentMethod
              )}
            </strong>
          </div>

          <div class="booking-detail-item">
            <span>Criado em</span>
            <strong>
              ${escapeHtml(
                formatDateTime(
                  booking.created_at
                )
              )}
            </strong>
          </div>

          ${
            booking.expires_at
              ? `
                <div class="booking-detail-item">
                  <span>Prazo da reserva</span>
                  <strong>
                    ${escapeHtml(
                      formatDateTime(
                        booking.expires_at
                      )
                    )}
                  </strong>
                </div>
              `
              : ""
          }

          ${
            booking.admin_note
              ? `
                <div class="booking-detail-item">
                  <span>Observação</span>
                  <strong>
                    ${escapeHtml(
                      booking.admin_note
                    )}
                  </strong>
                </div>
              `
              : ""
          }

        </div>
      `;
  }

  renderBookingModalActions(
    booking
  );

  bookingModal.hidden =
    false;

  bookingModal.setAttribute(
    "aria-hidden",
    "false"
  );

  syncBodyModalState();
}

function renderBookingModalActions(
  booking
) {
  if (
    !bookingModalActions
  ) {
    return;
  }

  let html =
    "";

  const whatsappUrl =
    buildCustomerWhatsappUrl(
      booking.customer_phone
    );

  if (
    whatsappUrl
  ) {
    html += `
      <a
        class="admin-secondary-button"
        href="${escapeHtml(
          whatsappUrl
        )}"
        target="_blank"
        rel="noopener noreferrer"
      >
        WHATSAPP
      </a>
    `;
  }

  if (
    booking.status ===
    "pending"
  ) {
    html += `
      <button
        class="admin-primary-button"
        type="button"
        data-modal-booking-action="confirm"
      >
        ACEITAR
      </button>

      <button
        class="admin-danger-button"
        type="button"
        data-modal-booking-action="reject"
      >
        RECUSAR
      </button>
    `;
  }

  if (
    booking.status ===
    "confirmed"
  ) {
    html += `
      <button
        class="admin-primary-button"
        type="button"
        data-modal-booking-action="complete"
      >
        FINALIZAR
      </button>

      <button
        class="admin-danger-button"
        type="button"
        data-modal-booking-action="cancel"
      >
        CANCELAR
      </button>
    `;
  }

  if (
    booking.status ===
      "completed" &&
    booking.payment_status ===
      "paid"
  ) {
    html += `
      <button
        class="admin-danger-button"
        type="button"
        data-modal-booking-action="refund"
      >
        ESTORNAR PAGAMENTO
      </button>
    `;
  }

  bookingModalActions.innerHTML =
    html;
}

function closePaymentModal() {
  if (
    !paymentModal
  ) {
    return;
  }

  paymentModal.hidden =
    true;

  paymentModal.setAttribute(
    "aria-hidden",
    "true"
  );

  state.paymentBookingId =
    null;

  setMessage(
    paymentModalMessage,
    ""
  );

  syncBodyModalState();
}

function openPaymentModal(
  bookingId
) {
  state.paymentBookingId =
    bookingId;

  if (
    paymentModal
  ) {
    paymentModal.hidden =
      false;

    paymentModal.setAttribute(
      "aria-hidden",
      "false"
    );
  }

  setMessage(
    paymentModalMessage,
    ""
  );

  syncBodyModalState();
}

function closeConfirmation(
  result
) {
  if (
    adminConfirm
  ) {
    adminConfirm.hidden =
      true;

    adminConfirm.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  syncBodyModalState();

  if (
    state.confirmResolver
  ) {
    const resolver =
      state.confirmResolver;

    state.confirmResolver =
      null;

    resolver(
      result
    );
  }
}

function askConfirmation({
  title,
  text,
  actionLabel =
    "CONFIRMAR",
  danger =
    true
}) {
  return new Promise(
    function (resolve) {
      state.confirmResolver =
        resolve;

      if (
        adminConfirmTitle
      ) {
        adminConfirmTitle.textContent =
          title;
      }

      if (
        adminConfirmText
      ) {
        adminConfirmText.textContent =
          text;
      }

      if (
        adminConfirmAction
      ) {
        adminConfirmAction.textContent =
          actionLabel;

        adminConfirmAction.className =
          danger
            ? "admin-danger-button"
            : "admin-primary-button";
      }

      if (
        adminConfirm
      ) {
        adminConfirm.hidden =
          false;

        adminConfirm.setAttribute(
          "aria-hidden",
          "false"
        );
      }

      syncBodyModalState();
    }
  );
}

async function confirmBooking(
  bookingId
) {
  const booking =
    findBooking(
      bookingId
    );

  if (!booking) {
    return;
  }

  const confirmed =
    await askConfirmation(
      {
        title:
          "Aceitar agendamento",

        text:
          "Confirmar o horário de " +
          normalizeTime(
            booking.booking_time
          ) +
          " para " +
          booking.customer_name +
          "?",

        actionLabel:
          "ACEITAR",

        danger:
          false
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_confirm_booking",
      {
        p_booking_id:
          bookingId
      }
    );

    closeBookingModal();

    setMessage(
      adminGlobalMessage,
      "Agendamento confirmado com sucesso.",
      "success"
    );

    await refreshDashboard();
  } catch (error) {
    setMessage(
      adminGlobalMessage,
      error.message,
      "error"
    );

    setMessage(
      bookingModalMessage,
      error.message,
      "error"
    );

    await refreshDashboard();
  }
}

async function rejectBooking(
  bookingId
) {
  const booking =
    findBooking(
      bookingId
    );

  if (!booking) {
    return;
  }

  const confirmed =
    await askConfirmation(
      {
        title:
          "Recusar agendamento",

        text:
          "Ao recusar, o horário " +
          normalizeTime(
            booking.booking_time
          ) +
          " ficará disponível novamente.",

        actionLabel:
          "RECUSAR",

        danger:
          true
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_reject_booking",
      {
        p_booking_id:
          bookingId
      }
    );

    closeBookingModal();

    setMessage(
      adminGlobalMessage,
      "Agendamento recusado e horário liberado.",
      "success"
    );

    await refreshDashboard();
  } catch (error) {
    setMessage(
      adminGlobalMessage,
      error.message,
      "error"
    );
  }
}

async function cancelBooking(
  bookingId
) {
  const booking =
    findBooking(
      bookingId
    );

  if (!booking) {
    return;
  }

  const confirmed =
    await askConfirmation(
      {
        title:
          "Cancelar agendamento",

        text:
          "O horário " +
          normalizeTime(
            booking.booking_time
          ) +
          " ficará disponível novamente.",

        actionLabel:
          "CANCELAR AGENDAMENTO",

        danger:
          true
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_cancel_booking",
      {
        p_booking_id:
          bookingId
      }
    );

    closeBookingModal();

    setMessage(
      adminGlobalMessage,
      "Agendamento cancelado com sucesso.",
      "success"
    );

    await refreshDashboard();
  } catch (error) {
    setMessage(
      adminGlobalMessage,
      error.message,
      "error"
    );
  }
}

async function refundBooking(
  bookingId
) {
  const booking =
    findBooking(
      bookingId
    );

  if (!booking) {
    return;
  }

  const confirmed =
    await askConfirmation(
      {
        title:
          "Estornar pagamento",

        text:
          "O valor de " +
          formatMoney(
            booking.service_amount_cents
          ) +
          " será removido do faturamento.",

        actionLabel:
          "ESTORNAR",

        danger:
          true
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_refund_booking",
      {
        p_booking_id:
          bookingId
      }
    );

    closeBookingModal();

    setMessage(
      adminGlobalMessage,
      "Pagamento estornado com sucesso.",
      "success"
    );

    await refreshDashboard();
  } catch (error) {
    setMessage(
      adminGlobalMessage,
      error.message,
      "error"
    );
  }
}

async function completeBooking(
  bookingId,
  paymentMethod
) {
  const booking =
    findBooking(
      bookingId
    );

  if (!booking) {
    return;
  }

  setMessage(
    paymentModalMessage,
    "Finalizando atendimento...",
    "info"
  );

  try {
    await rpc(
      "admin_complete_booking",
      {
        p_booking_id:
          bookingId,

        p_payment_method:
          paymentMethod
      }
    );

    closePaymentModal();

    closeBookingModal();

    setMessage(
      adminGlobalMessage,
      "Atendimento finalizado e pagamento registrado.",
      "success"
    );

    await refreshDashboard();
  } catch (error) {
    setMessage(
      paymentModalMessage,
      error.message,
      "error"
    );
  }
}

async function handleBookingAction(
  action,
  bookingId
) {
  if (
    action ===
    "details"
  ) {
    openBookingModal(
      bookingId
    );

    return;
  }

  if (
    action ===
    "confirm"
  ) {
    await confirmBooking(
      bookingId
    );

    return;
  }

  if (
    action ===
    "reject"
  ) {
    await rejectBooking(
      bookingId
    );

    return;
  }

  if (
    action ===
    "cancel"
  ) {
    await cancelBooking(
      bookingId
    );

    return;
  }

  if (
    action ===
    "complete"
  ) {
    openPaymentModal(
      bookingId
    );

    return;
  }

  if (
    action ===
    "refund"
  ) {
    await refundBooking(
      bookingId
    );
  }
}

function setupBookingActions() {
  if (
    adminBookingsList
  ) {
    adminBookingsList.addEventListener(
      "click",
      function (event) {
        const button =
          event.target.closest(
            "[data-booking-action]"
          );

        if (!button) {
          return;
        }

        handleBookingAction(
          button.dataset.bookingAction,
          button.dataset.bookingId
        );
      }
    );
  }

  if (
    bookingModalActions
  ) {
    bookingModalActions.addEventListener(
      "click",
      function (event) {
        const button =
          event.target.closest(
            "[data-modal-booking-action]"
          );

        if (
          !button ||
          !state.activeBookingId
        ) {
          return;
        }

        handleBookingAction(
          button.dataset.modalBookingAction,
          state.activeBookingId
        );
      }
    );
  }
}

function setupModals() {
  if (
    bookingModalClose
  ) {
    bookingModalClose.addEventListener(
      "click",
      closeBookingModal
    );
  }

  if (
    paymentModalClose
  ) {
    paymentModalClose.addEventListener(
      "click",
      closePaymentModal
    );
  }

  document
    .querySelectorAll(
      "[data-close-booking-modal]"
    )
    .forEach(
      function (element) {
        element.addEventListener(
          "click",
          closeBookingModal
        );
      }
    );

  document
    .querySelectorAll(
      "[data-close-payment-modal]"
    )
    .forEach(
      function (element) {
        element.addEventListener(
          "click",
          closePaymentModal
        );
      }
    );

  document
    .querySelectorAll(
      "[data-close-confirm]"
    )
    .forEach(
      function (element) {
        element.addEventListener(
          "click",
          function () {
            closeConfirmation(
              false
            );
          }
        );
      }
    );

  if (
    adminConfirmCancel
  ) {
    adminConfirmCancel.addEventListener(
      "click",
      function () {
        closeConfirmation(
          false
        );
      }
    );
  }

  if (
    adminConfirmAction
  ) {
    adminConfirmAction.addEventListener(
      "click",
      function () {
        closeConfirmation(
          true
        );
      }
    );
  }

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      if (
        adminConfirm &&
        !adminConfirm.hidden
      ) {
        closeConfirmation(
          false
        );

        return;
      }

      if (
        paymentModal &&
        !paymentModal.hidden
      ) {
        closePaymentModal();

        return;
      }

      if (
        bookingModal &&
        !bookingModal.hidden
      ) {
        closeBookingModal();
      }
    }
  );
}

function setupPaymentOptions() {
  paymentOptions.forEach(
    function (button) {
      button.addEventListener(
        "click",
        async function () {
          if (
            !state.paymentBookingId
          ) {
            return;
          }

          const method =
            button.dataset.paymentMethod;

          await completeBooking(
            state.paymentBookingId,
            method
          );
        }
      );
    }
  );
}

function updateCountdowns() {
  const countdowns =
    Array.from(
      document.querySelectorAll(
        "[data-expires-at]"
      )
    );

  let expiredFound =
    false;

  countdowns.forEach(
    function (element) {
      const expiration =
        new Date(
          element.dataset.expiresAt
        ).getTime();

      const remaining =
        expiration -
        Date.now();

      if (
        Number.isNaN(
          expiration
        )
      ) {
        element.textContent =
          "";

        return;
      }

      if (
        remaining <= 0
      ) {
        element.textContent =
          "Prazo encerrado";

        element.classList.add(
          "is-urgent"
        );

        expiredFound =
          true;

        return;
      }

      const totalSeconds =
        Math.ceil(
          remaining /
            1000
        );

      const minutes =
        Math.floor(
          totalSeconds /
            60
        );

      const seconds =
        totalSeconds %
        60;

      element.textContent =
        "Expira em " +
        padNumber(
          minutes
        ) +
        ":" +
        padNumber(
          seconds
        );

      element.classList.toggle(
        "is-urgent",
        totalSeconds <= 60
      );
    }
  );

  if (
    expiredFound &&
    !state.countdownReloadQueued
  ) {
    state.countdownReloadQueued =
      true;

    window.setTimeout(
      async function () {
        try {
          await refreshDashboard();
        } finally {
          state.countdownReloadQueued =
            false;
        }
      },
      700
    );
  }
}

function fillTimeSelect(
  select
) {
  if (!select) {
    return;
  }

  const current =
    select.value;

  select.innerHTML =
    '<option value="">Selecione</option>';

  generateTimeValues().forEach(
    function (time) {
      const option =
        document.createElement(
          "option"
        );

      option.value =
        time;

      option.textContent =
        time;

      select.appendChild(
        option
      );
    }
  );

  if (
    current
  ) {
    select.value =
      current;
  }
}

async function refreshTimeSelectAvailability(
  select,
  dateKey
) {
  if (
    !select ||
    !dateKey
  ) {
    return;
  }

  const selectedValue =
    select.value;

  try {
    const slots =
      await rpc(
        "get_public_booked_slots",
        {
          p_start_date:
            dateKey,

          p_end_date:
            dateKey
        }
      );

    const occupied =
      new Set(
        Array.isArray(
          slots
        )
          ? slots.map(
              function (item) {
                return normalizeTime(
                  item.booking_time
                );
              }
            )
          : []
      );

    const today =
      getTodayKey();

    const currentMinutes =
      getCurrentBusinessMinutes();

    Array.from(
      select.options
    ).forEach(
      function (option) {
        if (
          !option.value
        ) {
          return;
        }

        const passed =
          dateKey ===
            today &&
          timeToMinutes(
            option.value
          ) <=
            currentMinutes;

        const unavailable =
          occupied.has(
            option.value
          ) ||
          passed;

        option.disabled =
          unavailable;

        option.textContent =
          option.value +
          (
            unavailable
              ? " — indisponível"
              : ""
          );
      }
    );

    const selectedOption =
      Array.from(
        select.options
      ).find(
        function (option) {
          return (
            option.value ===
            selectedValue
          );
        }
      );

    if (
      selectedOption &&
      !selectedOption.disabled
    ) {
      select.value =
        selectedValue;
    } else {
      select.value =
        "";
    }
  } catch (error) {
    console.error(
      error
    );
  }
}

async function refreshManagementAvailability() {
  if (
    manualBookingDate &&
    manualBookingDate.value
  ) {
    await refreshTimeSelectAvailability(
      manualBookingTime,
      manualBookingDate.value
    );
  }

  if (
    blockSlotDate &&
    blockSlotDate.value
  ) {
    await refreshTimeSelectAvailability(
      blockSlotTime,
      blockSlotDate.value
    );
  }
}

function setManagementDateLimits() {
  const today =
    getTodayKey();

  const maxDate =
    addDaysToKey(
      today,
      30
    );

  [
    manualBookingDate,
    blockSlotDate
  ].forEach(
    function (input) {
      if (!input) {
        return;
      }

      input.min =
        today;

      input.max =
        maxDate;

      if (
        !input.value
      ) {
        input.value =
          today;
      }
    }
  );
}

async function handleManualBooking(
  event
) {
  event.preventDefault();

  if (
    !manualCustomerName ||
    !manualCustomerPhone ||
    !manualService ||
    !manualBookingDate ||
    !manualBookingTime
  ) {
    return;
  }

  setMessage(
    manualBookingMessage,
    ""
  );

  const name =
    manualCustomerName.value
      .trim();

  const phone =
    manualCustomerPhone.value
      .trim();

  const service =
    manualService.value;

  const date =
    manualBookingDate.value;

  const time =
    manualBookingTime.value;

  if (
    !name ||
    !phone ||
    !service ||
    !date ||
    !time
  ) {
    setMessage(
      manualBookingMessage,
      "Preencha todos os campos obrigatórios.",
      "error"
    );

    return;
  }

  const confirmed =
    await askConfirmation(
      {
        title:
          "Criar agendamento",

        text:
          "Confirmar " +
          service +
          " em " +
          formatDateShort(
            date
          ) +
          " às " +
          time +
          "?",

        actionLabel:
          "CRIAR",

        danger:
          false
      }
    );

  if (!confirmed) {
    return;
  }

  const originalText =
    manualBookingSubmit
      ? manualBookingSubmit.textContent
      : "";

  setButtonLoading(
    manualBookingSubmit,
    true,
    "CRIANDO..."
  );

  try {
    await rpc(
      "admin_create_booking",
      {
        p_customer_name:
          name,

        p_customer_phone:
          phone,

        p_service:
          service,

        p_booking_date:
          date,

        p_booking_time:
          time
      }
    );

    setMessage(
      manualBookingMessage,
      "Agendamento criado e confirmado com sucesso.",
      "success"
    );

    manualCustomerName.value =
      "";

    manualCustomerPhone.value =
      "";

    manualService.value =
      "";

    manualBookingTime.value =
      "";

    state.selectedDate =
      date;

    if (
      adminDateFilter
    ) {
      adminDateFilter.value =
        date;
    }

    await refreshManagementAvailability();

    await refreshDashboard();

    switchAdminSection(
      "agenda"
    );
  } catch (error) {
    setMessage(
      manualBookingMessage,
      error.message,
      "error"
    );
  } finally {
    setButtonLoading(
      manualBookingSubmit,
      false,
      "",
      originalText ||
        "CRIAR AGENDAMENTO"
    );
  }
}

async function loadBlockedSlots() {
  if (
    !blockSlotDate ||
    !blockSlotDate.value
  ) {
    return;
  }

  try {
    const data =
      await rpc(
        "admin_list_blocked_slots",
        {
          p_booking_date:
            blockSlotDate.value
        }
      );

    state.blockedSlots =
      Array.isArray(
        data
      )
        ? data
        : [];

    renderBlockedSlots();
  } catch (error) {
    console.error(
      error
    );

    setMessage(
      blockSlotMessage,
      error.message,
      "error"
    );
  }
}

function renderBlockedSlots() {
  if (
    !blockedSlotsList
  ) {
    return;
  }

  if (
    state.blockedSlots.length ===
    0
  ) {
    blockedSlotsList.innerHTML =
      "";

    if (
      blockedSlotsEmpty
    ) {
      blockedSlotsEmpty.hidden =
        false;
    }

    return;
  }

  if (
    blockedSlotsEmpty
  ) {
    blockedSlotsEmpty.hidden =
      true;
  }

  blockedSlotsList.innerHTML =
    state.blockedSlots
      .map(
        function (slot) {
          return `
            <article class="blocked-slot-item">

              <div>

                <strong>
                  ${escapeHtml(
                    normalizeTime(
                      slot.booking_time
                    )
                  )}
                </strong>

                <span>
                  ${escapeHtml(
                    slot.reason ||
                    "Horário bloqueado"
                  )}
                </span>

              </div>

              <button
                class="unblock-slot-button"
                type="button"
                data-unblock-slot="${escapeHtml(
                  slot.id
                )}"
              >
                LIBERAR
              </button>

            </article>
          `;
        }
      )
      .join(
        ""
      );
}

async function handleBlockSlot(
  event
) {
  event.preventDefault();

  if (
    !blockSlotDate ||
    !blockSlotTime
  ) {
    return;
  }

  const date =
    blockSlotDate.value;

  const time =
    blockSlotTime.value;

  const reason =
    blockSlotReason
      ? blockSlotReason.value
          .trim()
      : "";

  if (
    !date ||
    !time
  ) {
    setMessage(
      blockSlotMessage,
      "Selecione a data e o horário.",
      "error"
    );

    return;
  }

  const confirmed =
    await askConfirmation(
      {
        title:
          "Bloquear horário",

        text:
          "O horário " +
          time +
          " de " +
          formatDateShort(
            date
          ) +
          " ficará indisponível no site.",

        actionLabel:
          "BLOQUEAR",

        danger:
          false
      }
    );

  if (!confirmed) {
    return;
  }

  const originalText =
    blockSlotSubmit
      ? blockSlotSubmit.textContent
      : "";

  setButtonLoading(
    blockSlotSubmit,
    true,
    "BLOQUEANDO..."
  );

  try {
    await rpc(
      "admin_block_slot",
      {
        p_booking_date:
          date,

        p_booking_time:
          time,

        p_reason:
          reason ||
          null
      }
    );

    setMessage(
      blockSlotMessage,
      "Horário bloqueado com sucesso.",
      "success"
    );

    if (
      blockSlotReason
    ) {
      blockSlotReason.value =
        "";
    }

    blockSlotTime.value =
      "";

    await loadBlockedSlots();

    await refreshManagementAvailability();

    await refreshDashboard();
  } catch (error) {
    setMessage(
      blockSlotMessage,
      error.message,
      "error"
    );
  } finally {
    setButtonLoading(
      blockSlotSubmit,
      false,
      "",
      originalText ||
        "BLOQUEAR HORÁRIO"
    );
  }
}

async function unblockSlot(
  blockId
) {
  const confirmed =
    await askConfirmation(
      {
        title:
          "Liberar horário",

        text:
          "Este horário voltará a aparecer como disponível no site.",

        actionLabel:
          "LIBERAR",

        danger:
          false
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_unblock_slot",
      {
        p_block_id:
          blockId
      }
    );

    setMessage(
      blockSlotMessage,
      "Horário liberado com sucesso.",
      "success"
    );

    await loadBlockedSlots();

    await refreshManagementAvailability();

    await refreshDashboard();
  } catch (error) {
    setMessage(
      blockSlotMessage,
      error.message,
      "error"
    );
  }
}

function setupManagement() {
  fillTimeSelect(
    manualBookingTime
  );

  fillTimeSelect(
    blockSlotTime
  );

  setManagementDateLimits();

  if (
    manualBookingDate
  ) {
    manualBookingDate.addEventListener(
      "change",
      function () {
        refreshTimeSelectAvailability(
          manualBookingTime,
          manualBookingDate.value
        );
      }
    );
  }

  if (
    blockSlotDate
  ) {
    blockSlotDate.addEventListener(
      "change",
      async function () {
        await refreshTimeSelectAvailability(
          blockSlotTime,
          blockSlotDate.value
        );

        await loadBlockedSlots();
      }
    );
  }

  if (
    manualBookingForm
  ) {
    manualBookingForm.addEventListener(
      "submit",
      handleManualBooking
    );
  }

  if (
    blockSlotForm
  ) {
    blockSlotForm.addEventListener(
      "submit",
      handleBlockSlot
    );
  }

  if (
    blockedSlotsRefresh
  ) {
    blockedSlotsRefresh.addEventListener(
      "click",
      loadBlockedSlots
    );
  }

  if (
    blockedSlotsList
  ) {
    blockedSlotsList.addEventListener(
      "click",
      function (event) {
        const button =
          event.target.closest(
            "[data-unblock-slot]"
          );

        if (!button) {
          return;
        }

        unblockSlot(
          button.dataset.unblockSlot
        );
      }
    );
  }
}

function renderCashSummary() {
  const summary =
    state.cashSummary;

  if (!summary) {
    return;
  }

  const open =
    summary.cash_status ===
    "open";

  if (
    cashStatusBadge
  ) {
    cashStatusBadge.textContent =
      open
        ? "ABERTO"
        : "FECHADO";

    cashStatusBadge.classList.toggle(
      "is-open",
      open
    );

    cashStatusBadge.classList.toggle(
      "is-closed",
      !open
    );
  }

  if (
    cashDateLabel
  ) {
    cashDateLabel.textContent =
      formatDateLong(
        summary.business_date ||
        getTodayKey()
      );
  }

  if (
    cashOpenButton
  ) {
    cashOpenButton.hidden =
      open;
  }

  if (
    cashCloseButton
  ) {
    cashCloseButton.hidden =
      !open;
  }

  const received =
    Number(
      summary.received_today_cents ||
      0
    );

  const expected =
    Number(
      summary.expected_today_cents ||
      0
    );

  const receivedCount =
    Number(
      summary.received_today_count ||
      0
    );

  const expectedCount =
    Number(
      summary.expected_today_count ||
      0
    );

  const monthCount =
    Number(
      summary.month_count ||
      0
    );

  const yearCount =
    Number(
      summary.year_count ||
      0
    );

  if (
    cashTodayTotal
  ) {
    cashTodayTotal.textContent =
      formatMoney(
        received
      );
  }

  if (
    cashTodayCount
  ) {
    cashTodayCount.textContent =
      pluralize(
        receivedCount,
        "atendimento recebido",
        "atendimentos recebidos"
      );
  }

  if (
    cashExpectedToday
  ) {
    cashExpectedToday.textContent =
      formatMoney(
        expected
      );
  }

  if (
    cashExpectedCount
  ) {
    cashExpectedCount.textContent =
      pluralize(
        expectedCount,
        "atendimento confirmado",
        "atendimentos confirmados"
      );
  }

  if (
    cashReceivedToday
  ) {
    cashReceivedToday.textContent =
      formatMoney(
        received
      );
  }

  if (
    cashMonthTotal
  ) {
    cashMonthTotal.textContent =
      formatMoney(
        summary.month_total_cents ||
        0
      );
  }

  if (
    cashMonthCount
  ) {
    cashMonthCount.textContent =
      pluralize(
        monthCount,
        "atendimento recebido",
        "atendimentos recebidos"
      );
  }

  if (
    cashYearTotal
  ) {
    cashYearTotal.textContent =
      formatMoney(
        summary.year_total_cents ||
        0
      );
  }

  if (
    cashYearCount
  ) {
    cashYearCount.textContent =
      pluralize(
        yearCount,
        "atendimento recebido",
        "atendimentos recebidos"
      );
  }

  const totals =
    summary.payment_totals ||
    {};

  const counts =
    summary.payment_counts ||
    {};

  if (
    cashPaymentCashTotal
  ) {
    cashPaymentCashTotal.textContent =
      formatMoney(
        totals.cash ||
        0
      );
  }

  if (
    cashPaymentCashCount
  ) {
    cashPaymentCashCount.textContent =
      pluralize(
        Number(
          counts.cash ||
          0
        ),
        "pagamento",
        "pagamentos"
      );
  }

  if (
    cashPaymentPixTotal
  ) {
    cashPaymentPixTotal.textContent =
      formatMoney(
        totals.pix ||
        0
      );
  }

  if (
    cashPaymentPixCount
  ) {
    cashPaymentPixCount.textContent =
      pluralize(
        Number(
          counts.pix ||
          0
        ),
        "pagamento",
        "pagamentos"
      );
  }

  if (
    cashPaymentDebitTotal
  ) {
    cashPaymentDebitTotal.textContent =
      formatMoney(
        totals.debit ||
        0
      );
  }

  if (
    cashPaymentDebitCount
  ) {
    cashPaymentDebitCount.textContent =
      pluralize(
        Number(
          counts.debit ||
          0
        ),
        "pagamento",
        "pagamentos"
      );
  }

  if (
    cashPaymentCreditTotal
  ) {
    cashPaymentCreditTotal.textContent =
      formatMoney(
        totals.credit ||
        0
      );
  }

  if (
    cashPaymentCreditCount
  ) {
    cashPaymentCreditCount.textContent =
      pluralize(
        Number(
          counts.credit ||
          0
        ),
        "pagamento",
        "pagamentos"
      );
  }

  renderTodayStats();
}

async function loadCashSummary() {
  try {
    const data =
      await rpc(
        "admin_cash_summary",
        {
          p_business_date:
            getTodayKey()
        }
      );

    state.cashSummary =
      data ||
      null;

    renderCashSummary();
  } catch (error) {
    console.error(
      error
    );

    setMessage(
      cashMessage,
      error.message,
      "error"
    );
  }
}

async function openCash() {
  const confirmed =
    await askConfirmation(
      {
        title:
          "Abrir caixa",

        text:
          "O caixa de hoje será aberto com valor inicial de R$ 0,00.",

        actionLabel:
          "ABRIR CAIXA",

        danger:
          false
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_open_cash",
      {
        p_business_date:
          getTodayKey()
      }
    );

    setMessage(
      cashMessage,
      "Caixa aberto com sucesso.",
      "success"
    );

    await loadCashSummary();
  } catch (error) {
    setMessage(
      cashMessage,
      error.message,
      "error"
    );
  }
}

async function closeCash() {
  const confirmed =
    await askConfirmation(
      {
        title:
          "Fechar caixa",

        text:
          "O faturamento recebido de hoje será usado como valor final do caixa.",

        actionLabel:
          "FECHAR CAIXA",

        danger:
          true
      }
    );

  if (!confirmed) {
    return;
  }

  try {
    await rpc(
      "admin_close_cash",
      {
        p_business_date:
          getTodayKey()
      }
    );

    setMessage(
      cashMessage,
      "Caixa fechado com sucesso.",
      "success"
    );

    await loadCashSummary();
  } catch (error) {
    setMessage(
      cashMessage,
      error.message,
      "error"
    );
  }
}

function setupCash() {
  if (
    cashOpenButton
  ) {
    cashOpenButton.addEventListener(
      "click",
      openCash
    );
  }

  if (
    cashCloseButton
  ) {
    cashCloseButton.addEventListener(
      "click",
      closeCash
    );
  }
}

async function refreshDashboard() {
  if (
    state.refreshing ||
    !state.user
  ) {
    return;
  }

  state.refreshing =
    true;

  if (
    adminLoading
  ) {
    adminLoading.hidden =
      false;
  }

  if (
    adminRefreshButton
  ) {
    adminRefreshButton.disabled =
      true;

    adminRefreshButton.textContent =
      "ATUALIZANDO...";
  }

  try {
    await loadSelectedBookings();

    await Promise.all(
      [
        loadTodayBookings(),
        loadCashSummary()
      ]
    );

    if (
      blockSlotDate &&
      blockSlotDate.value
    ) {
      await loadBlockedSlots();
    }

    if (
      adminLastUpdate
    ) {
      const now =
        new Date();

      adminLastUpdate.textContent =
        "Atualizado às " +
        new Intl.DateTimeFormat(
          "pt-BR",
          {
            hour:
              "2-digit",

            minute:
              "2-digit",

            second:
              "2-digit",

            timeZone:
              ADMIN_TIMEZONE
          }
        ).format(
          now
        );
    }
  } catch (error) {
    console.error(
      error
    );

    setMessage(
      adminGlobalMessage,
      error.message ||
        "Não foi possível atualizar o painel.",
      "error"
    );
  } finally {
    state.refreshing =
      false;

    if (
      adminLoading
    ) {
      adminLoading.hidden =
        true;
    }

    if (
      adminRefreshButton
    ) {
      adminRefreshButton.disabled =
        false;

      adminRefreshButton.textContent =
        "ATUALIZAR PAINEL";
    }

    updateCountdowns();
  }
}

function setupRefresh() {
  if (
    adminRefreshButton
  ) {
    adminRefreshButton.addEventListener(
      "click",
      refreshDashboard
    );
  }

  window.setInterval(
    function () {
      updateCountdowns();
    },
    1000
  );

  window.setInterval(
    function () {
      if (
        document.hidden ||
        !state.user
      ) {
        return;
      }

      refreshDashboard();
    },
    20000
  );

  document.addEventListener(
    "visibilitychange",
    function () {
      if (
        !document.hidden &&
        state.user
      ) {
        refreshDashboard();
      }
    }
  );

  window.addEventListener(
    "online",
    function () {
      if (
        state.user
      ) {
        refreshDashboard();
      }
    }
  );
}

function setupInitialDates() {
  const today =
    getTodayKey();

  state.selectedDate =
    today;

  if (
    adminDateFilter
  ) {
    adminDateFilter.value =
      today;
  }

  updateSelectedDayLabel();

  setManagementDateLimits();
}

function setupPhoneMask() {
  if (
    !manualCustomerPhone
  ) {
    return;
  }

  manualCustomerPhone.addEventListener(
    "input",
    function () {
      let digits =
        normalizePhone(
          manualCustomerPhone.value
        ).slice(
          0,
          11
        );

      if (
        digits.length <=
        2
      ) {
        manualCustomerPhone.value =
          digits
            ? "(" +
              digits
            : "";

        return;
      }

      if (
        digits.length <=
        6
      ) {
        manualCustomerPhone.value =
          "(" +
          digits.slice(
            0,
            2
          ) +
          ") " +
          digits.slice(
            2
          );

        return;
      }

      if (
        digits.length <=
        10
      ) {
        manualCustomerPhone.value =
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
          );

        return;
      }

      manualCustomerPhone.value =
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
        );
    }
  );
}

function setupAuthentication() {
  if (
    adminLoginForm
  ) {
    adminLoginForm.addEventListener(
      "submit",
      handleLogin
    );
  }

  if (
    adminLogoutButton
  ) {
    adminLogoutButton.addEventListener(
      "click",
      handleLogout
    );
  }

  if (
    supabaseClient
  ) {
    supabaseClient.auth.onAuthStateChange(
      function (
        event,
        session
      ) {
        if (
          event ===
          "SIGNED_OUT"
        ) {
          state.session =
            null;

          state.user =
            null;

          showLogin();
        }

        if (
          event ===
          "TOKEN_REFRESHED"
        ) {
          state.session =
            session;

          state.user =
            session?.user ||
            null;
        }
      }
    );
  }
}

async function initializeAdmin() {
  setupInitialDates();

  setupPasswordToggle();

  setupAuthentication();

  setupSectionNavigation();

  setupBookingTabs();

  setupBookingFilters();

  setupBookingActions();

  setupModals();

  setupPaymentOptions();

  setupManagement();

  setupCash();

  setupRefresh();

  setupPhoneMask();

  await refreshManagementAvailability();

  await restoreSession();
}

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeAdmin
  );
} else {
  initializeAdmin();
}
          
