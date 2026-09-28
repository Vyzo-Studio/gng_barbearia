const SUPABASE_URL =
  "https://ueqfokfnjsjgocotvdae.supabase.co";

const SUPABASE_PUBLIC_KEY =
  "sb_publishable_YqWCSylIzOdQcxuJFpE9dQ_3mVV4oji";

const TIMEZONE =
  "America/Sao_Paulo";

const POLL_INTERVAL =
  5000;

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLIC_KEY,
    {
      auth: {
        persistSession:
          true,

        autoRefreshToken:
          true,

        detectSessionInUrl:
          true
      }
    }
  );

const authSection =
  document.getElementById(
    "barber-auth"
  );

const dashboard =
  document.getElementById(
    "barber-dashboard"
  );

const authForm =
  document.getElementById(
    "barber-auth-form"
  );

const emailInput =
  document.getElementById(
    "barber-email"
  );

const passwordInput =
  document.getElementById(
    "barber-password"
  );

const codeField =
  document.getElementById(
    "barber-code-field"
  );

const codeInput =
  document.getElementById(
    "barber-code"
  );

const authMessage =
  document.getElementById(
    "barber-auth-message"
  );

const authSubmit =
  document.getElementById(
    "barber-auth-submit"
  );

const authModeButton =
  document.getElementById(
    "barber-auth-mode"
  );

const authKicker =
  document.getElementById(
    "auth-kicker"
  );

const authTitle =
  document.getElementById(
    "auth-title"
  );

const authDescription =
  document.getElementById(
    "auth-description"
  );

const profileName =
  document.getElementById(
    "barber-profile-name"
  );

const profileEmail =
  document.getElementById(
    "barber-profile-email"
  );

const logoutButton =
  document.getElementById(
    "barber-logout"
  );

const refreshButton =
  document.getElementById(
    "barber-refresh"
  );

const dateInput =
  document.getElementById(
    "barber-date"
  );

const bookingsList =
  document.getElementById(
    "barber-bookings"
  );

const emptyState =
  document.getElementById(
    "barber-empty"
  );

const loadingState =
  document.getElementById(
    "barber-loading"
  );

const globalMessage =
  document.getElementById(
    "barber-global-message"
  );

const statPending =
  document.getElementById(
    "barber-stat-pending"
  );

const statConfirmed =
  document.getElementById(
    "barber-stat-confirmed"
  );

const statCompleted =
  document.getElementById(
    "barber-stat-completed"
  );

const countPending =
  document.getElementById(
    "barber-count-pending"
  );

const countScheduled =
  document.getElementById(
    "barber-count-scheduled"
  );

const countCompleted =
  document.getElementById(
    "barber-count-completed"
  );

const countHistory =
  document.getElementById(
    "barber-count-history"
  );

const viewButtons =
  Array.from(
    document.querySelectorAll(
      "[data-barber-view]"
    )
  );

const paymentModal =
  document.getElementById(
    "barber-payment-modal"
  );

const paymentClose =
  document.getElementById(
    "barber-payment-close"
  );

const paymentMessage =
  document.getElementById(
    "barber-payment-message"
  );

const paymentButtons =
  Array.from(
    document.querySelectorAll(
      "[data-barber-payment]"
    )
  );

const state = {
  authMode:
    "login",

  session:
    null,

  profile:
    null,

  selectedDate:
    null,

  view:
    "pending",

  bookings:
    [],

  activePaymentBookingId:
    null,

  knownPendingIds:
    new Set(),

  baselineReady:
    false,

  polling:
    false,

  pollTimer:
    null,

  countdownTimer:
    null,

  audioContext:
    null,

  originalTitle:
    document.title
};

function setMessage(
  target,
  message,
  type = ""
) {
  if (!target) {
    return;
  }

  if (!message) {
    target.hidden =
      true;

    target.textContent =
      "";

    target.classList.remove(
      "is-error",
      "is-success",
      "is-info"
    );

    return;
  }

  target.hidden =
    false;

  target.textContent =
    message;

  target.classList.remove(
    "is-error",
    "is-success",
    "is-info"
  );

  if (type) {
    target.classList.add(
      "is-" + type
    );
  }
}

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

function normalizeTime(value) {
  return value
    ? String(
        value
      ).slice(
        0,
        5
      )
    : "";
}

function formatMoney(cents) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style:
        "currency",

      currency:
        "BRL"
    }
  ).format(
    (
      Number(
        cents
      ) ||
      0
    ) /
      100
  );
}

function formatDateShort(
  dateKey
) {
  if (!dateKey) {
    return "";
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

function getBusinessTodayKey() {
  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          TIMEZONE,

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit"
      }
    ).formatToParts(
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

  return (
    result.year +
    "-" +
    result.month +
    "-" +
    result.day
  );
}

function getPhoneDigits(value) {
  return String(
    value ||
    ""
  ).replace(
    /\D/g,
    ""
  );
}

function setAuthMode(mode) {
  state.authMode =
    mode;

  const firstAccess =
    mode ===
    "register";

  codeField.hidden =
    !firstAccess;

  codeInput.required =
    firstAccess;

  passwordInput.autocomplete =
    firstAccess
      ? "new-password"
      : "current-password";

  authKicker.textContent =
    firstAccess
      ? "PRIMEIRO ACESSO"
      : "ACESSO";

  authTitle.textContent =
    firstAccess
      ? "Criar acesso profissional"
      : "Entrar no painel";

  authDescription.textContent =
    firstAccess
      ? "Use seu e-mail, crie uma senha e informe o código recebido da administração."
      : "Use seu e-mail e sua senha.";

  authSubmit.textContent =
    firstAccess
      ? "CRIAR MEU ACESSO"
      : "ENTRAR";

  authModeButton.textContent =
    firstAccess
      ? "JÁ TENHO ACESSO"
      : "PRIMEIRO ACESSO";

  setMessage(
    authMessage,
    ""
  );
}

async function rpc(
  name,
  payload = {}
) {
  const {
    data,
    error
  } =
    await supabaseClient.rpc(
      name,
      payload
    );

  if (error) {
    throw error;
  }

  return data;
}

async function claimAccess(code) {
  const data =
    await rpc(
      "claim_gng_barber_access",
      {
        p_code:
          String(
            code ||
            ""
          )
            .trim()
            .toUpperCase()
      }
    );

  sessionStorage.removeItem(
    "gng_barber_claim_code"
  );

  return Array.isArray(
    data
  )
    ? data[0] ||
        null
    : data;
}

async function loadProfile() {
  try {
    const data =
      await rpc(
        "barber_get_profile"
      );

    return Array.isArray(
      data
    )
      ? data[0] ||
          null
      : data;
  } catch (error) {
    const storedCode =
      sessionStorage.getItem(
        "gng_barber_claim_code"
      );

    if (
      !storedCode
    ) {
      throw error;
    }

    await claimAccess(
      storedCode
    );

    const data =
      await rpc(
        "barber_get_profile"
      );

    return Array.isArray(
      data
    )
      ? data[0] ||
          null
      : data;
  }
}

async function handleAuthSubmit(
  event
) {
  event.preventDefault();

  setMessage(
    authMessage,
    ""
  );

  const email =
    emailInput.value
      .trim()
      .toLowerCase();

  const password =
    passwordInput.value;

  authSubmit.disabled =
    true;

  const originalText =
    authSubmit.textContent;

  authSubmit.textContent =
    state.authMode ===
    "register"
      ? "CRIANDO..."
      : "ENTRANDO...";

  try {
    if (
      state.authMode ===
      "register"
    ) {
      const code =
        codeInput.value
          .trim()
          .toUpperCase();

      if (!code) {
        throw new Error(
          "Informe o código de ativação."
        );
      }

      sessionStorage.setItem(
        "gng_barber_claim_code",
        code
      );

      const redirectTo =
        window.location.origin +
        window.location.pathname;

      const {
        data,
        error
      } =
        await supabaseClient.auth.signUp(
          {
            email,
            password,

            options: {
              emailRedirectTo:
                redirectTo
            }
          }
        );

      if (error) {
        throw error;
      }

      if (
        data &&
        data.session
      ) {
        await claimAccess(
          code
        );

        await enterDashboard();

        return;
      }

      setMessage(
        authMessage,
        "Conta criada. Confirme seu e-mail e depois volte para entrar. O código de ativação ficará salvo neste navegador.",
        "success"
      );

      setAuthMode(
        "login"
      );

      emailInput.value =
        email;

      return;
    }

    const {
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

    await enterDashboard();
  } catch (error) {
    console.error(
      error
    );

    let message =
      error.message ||
      "Não foi possível acessar o painel.";

    if (
      /invalid login credentials/i.test(
        message
      )
    ) {
      message =
        "E-mail ou senha incorretos.";
    }

    if (
      /user already registered/i.test(
        message
      )
    ) {
      message =
        "Esse e-mail já possui uma conta. Use a opção de entrar.";
    }

    setMessage(
      authMessage,
      message,
      "error"
    );
  } finally {
    authSubmit.disabled =
      false;

    authSubmit.textContent =
      originalText;
  }
}

async function enterDashboard() {
  try {
    const {
      data
    } =
      await supabaseClient.auth.getSession();

    if (
      !data.session
    ) {
      return;
    }

    state.session =
      data.session;

    state.profile =
      await loadProfile();

    if (
      !state.profile
    ) {
      throw new Error(
        "Acesso profissional não encontrado."
      );
    }

    profileName.textContent =
      state.profile.name ||
      "Profissional";

    profileEmail.textContent =
      state.profile.email ||
      state.session.user.email ||
      "";

    authSection.hidden =
      true;

    dashboard.hidden =
      false;

    state.selectedDate =
      state.selectedDate ||
      getBusinessTodayKey();

    dateInput.value =
      state.selectedDate;

    await refreshAgenda();

    startPolling();

    activateAudio();
  } catch (error) {
    console.error(
      error
    );

    await supabaseClient.auth.signOut();

    state.session =
      null;

    state.profile =
      null;

    authSection.hidden =
      false;

    dashboard.hidden =
      true;

    setMessage(
      authMessage,
      error.message ||
        "Seu usuário ainda não está vinculado a um profissional da GNG.",
      "error"
    );
  }
}

async function restoreSession() {
  const {
    data
  } =
    await supabaseClient.auth.getSession();

  if (
    data &&
    data.session
  ) {
    await enterDashboard();
  }
}

function getViewBookings() {
  return state.bookings.filter(
    function (booking) {
      if (
        state.view ===
        "pending"
      ) {
        return (
          booking.status ===
          "pending"
        );
      }

      if (
        state.view ===
        "scheduled"
      ) {
        return (
          booking.status ===
          "confirmed"
        );
      }

      if (
        state.view ===
        "completed"
      ) {
        return (
          booking.status ===
          "completed"
        );
      }

      return [
        "rejected",
        "cancelled",
        "expired"
      ].includes(
        booking.status
      );
    }
  );
}

function updateStats() {
  const pending =
    state.bookings.filter(
      function (booking) {
        return (
          booking.status ===
          "pending"
        );
      }
    ).length;

  const confirmed =
    state.bookings.filter(
      function (booking) {
        return (
          booking.status ===
          "confirmed"
        );
      }
    ).length;

  const completed =
    state.bookings.filter(
      function (booking) {
        return (
          booking.status ===
          "completed"
        );
      }
    ).length;

  const history =
    state.bookings.filter(
      function (booking) {
        return [
          "rejected",
          "cancelled",
          "expired"
        ].includes(
          booking.status
        );
      }
    ).length;

  statPending.textContent =
    pending;

  statConfirmed.textContent =
    confirmed;

  statCompleted.textContent =
    completed;

  countPending.textContent =
    pending;

  countScheduled.textContent =
    confirmed;

  countCompleted.textContent =
    completed;

  countHistory.textContent =
    history;
}

function statusLabel(status) {
  const labels = {
    pending:
      "PENDENTE",

    confirmed:
      "CONFIRMADO",

    completed:
      "FINALIZADO",

    rejected:
      "RECUSADO",

    cancelled:
      "CANCELADO",

    expired:
      "EXPIRADO"
  };

  return (
    labels[
      status
    ] ||
    String(
      status ||
      ""
    ).toUpperCase()
  );
}

function secondsRemaining(
  expiresAt
) {
  if (
    !expiresAt
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.ceil(
      (
        new Date(
          expiresAt
        ).getTime() -
        Date.now()
      ) /
        1000
    )
  );
}

function countdownText(
  expiresAt
) {
  const total =
    secondsRemaining(
      expiresAt
    );

  const minutes =
    Math.floor(
      total /
        60
    );

  const seconds =
    total %
    60;

  return (
    minutes +
    ":" +
    String(
      seconds
    ).padStart(
      2,
      "0"
    )
  );
}

function renderBookings() {
  const bookings =
    getViewBookings();

  bookingsList.innerHTML =
    "";

  emptyState.hidden =
    bookings.length >
    0;

  bookings.forEach(
    function (booking) {
      const phone =
        getPhoneDigits(
          booking.customer_phone
        );

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "barber-booking-card";

      card.dataset.bookingId =
        booking.id;

      let actions =
        "";

      if (
        booking.status ===
        "pending"
      ) {
        actions +=
          '<button class="booking-action accept" type="button" data-action="confirm">ACEITAR</button>';

        actions +=
          '<button class="booking-action reject" type="button" data-action="reject">RECUSAR</button>';
      }

      if (
        booking.status ===
        "confirmed"
      ) {
        actions +=
          '<button class="booking-action complete" type="button" data-action="complete">FINALIZAR / PAGAMENTO</button>';

        actions +=
          '<button class="booking-action cancel" type="button" data-action="cancel">CANCELAR</button>';
      }

      if (
        phone
      ) {
        const whatsappPhone =
          phone.startsWith(
            "55"
          )
            ? phone
            : "55" +
              phone;

        actions +=
          '<a class="booking-action whatsapp" href="https://wa.me/' +
          escapeHtml(
            whatsappPhone
          ) +
          '" target="_blank" rel="noopener noreferrer">WHATSAPP DO CLIENTE</a>';
      }

      const countdown =
        booking.status ===
        "pending"
          ? '<span class="pending-countdown" data-countdown="' +
            escapeHtml(
              booking.expires_at ||
              ""
            ) +
            '">Expira em ' +
            countdownText(
              booking.expires_at
            ) +
            "</span>"
          : "";

      card.innerHTML =
        `
          <div class="booking-time-box">

            <strong>
              ${escapeHtml(
                normalizeTime(
                  booking.booking_time
                )
              )}
            </strong>

            <span>
              ${escapeHtml(
                formatDateShort(
                  booking.booking_date
                )
              )}
            </span>

          </div>

          <div class="booking-data">

            <strong>
              ${escapeHtml(
                booking.customer_name ||
                "Cliente"
              )}
            </strong>

            <span>
              ${escapeHtml(
                booking.service ||
                "Atendimento"
              )}
              •
              ${escapeHtml(
                formatMoney(
                  booking.service_amount_cents
                )
              )}
            </span>

            <span>
              ${
                phone
                  ? escapeHtml(
                      booking.customer_phone
                    )
                  : "Telefone não informado"
              }
            </span>

            <span class="status-badge">
              ${escapeHtml(
                statusLabel(
                  booking.status
                )
              )}
            </span>

            ${countdown}

          </div>

          <div class="booking-actions">
            ${actions}
          </div>
        `;

      bookingsList.appendChild(
        card
      );
    }
  );
}

async function refreshAgenda() {
  if (
    !state.profile ||
    !state.selectedDate
  ) {
    return;
  }

  loadingState.hidden =
    false;

  setMessage(
    globalMessage,
    ""
  );

  try {
    const data =
      await rpc(
        "barber_list_bookings",
        {
          p_booking_date:
            state.selectedDate
        }
      );

    state.bookings =
      Array.isArray(
        data
      )
        ? data
        : [];

    updateStats();

    renderBookings();
  } catch (error) {
    console.error(
      error
    );

    setMessage(
      globalMessage,
      error.message ||
        "Não foi possível carregar a agenda.",
      "error"
    );
  } finally {
    loadingState.hidden =
      true;
  }
}

async function bookingAction(
  bookingId,
  action
) {
  const booking =
    state.bookings.find(
      function (item) {
        return (
          item.id ===
          bookingId
        );
      }
    );

  if (
    !booking
  ) {
    return;
  }

  if (
    action ===
    "complete"
  ) {
    state.activePaymentBookingId =
      bookingId;

    openPaymentModal();

    return;
  }

  const labels = {
    confirm:
      "aceitar este agendamento",

    reject:
      "recusar este agendamento",

    cancel:
      "cancelar este agendamento"
  };

  if (
    !window.confirm(
      "Deseja " +
        labels[
          action
        ] +
        "?"
    )
  ) {
    return;
  }

  const rpcNames = {
    confirm:
      "barber_confirm_booking",

    reject:
      "barber_reject_booking",

    cancel:
      "barber_cancel_booking"
  };

  try {
    await rpc(
      rpcNames[
        action
      ],
      {
        p_booking_id:
          bookingId
      }
    );

    await refreshAgenda();
  } catch (error) {
    setMessage(
      globalMessage,
      error.message ||
        "Não foi possível concluir a ação.",
      "error"
    );
  }
}

function openPaymentModal() {
  setMessage(
    paymentMessage,
    ""
  );

  paymentModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}

function closePaymentModal() {
  paymentModal.hidden =
    true;

  document.body.style.overflow =
    "";

  state.activePaymentBookingId =
    null;
}

async function completeBooking(
  paymentMethod
) {
  if (
    !state.activePaymentBookingId
  ) {
    return;
  }

  paymentButtons.forEach(
    function (button) {
      button.disabled =
        true;
    }
  );

  try {
    await rpc(
      "barber_complete_booking",
      {
        p_booking_id:
          state.activePaymentBookingId,

        p_payment_method:
          paymentMethod
      }
    );

    closePaymentModal();

    await refreshAgenda();
  } catch (error) {
    setMessage(
      paymentMessage,
      error.message ||
        "Não foi possível finalizar.",
      "error"
    );
  } finally {
    paymentButtons.forEach(
      function (button) {
        button.disabled =
          false;
      }
    );
  }
}

function updateCountdowns() {
  let expiredDetected =
    false;

  document
    .querySelectorAll(
      "[data-countdown]"
    )
    .forEach(
      function (element) {
        const expiresAt =
          element.dataset.countdown;

        const remaining =
          secondsRemaining(
            expiresAt
          );

        element.textContent =
          "Expira em " +
          countdownText(
            expiresAt
          );

        if (
          remaining <=
          0
        ) {
          expiredDetected =
            true;
        }
      }
    );

  if (
    expiredDetected
  ) {
    refreshAgenda();
  }
}

function getAudioContext() {
  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;

  if (
    !AudioContextClass
  ) {
    return null;
  }

  if (
    !state.audioContext
  ) {
    state.audioContext =
      new AudioContextClass();
  }

  return state.audioContext;
}

async function activateAudio() {
  const context =
    getAudioContext();

  if (
    !context
  ) {
    return;
  }

  if (
    context.state ===
    "suspended"
  ) {
    try {
      await context.resume();
    } catch (error) {
    }
  }
}

async function playNotificationSound() {
  const context =
    getAudioContext();

  if (
    !context
  ) {
    return;
  }

  await activateAudio();

  if (
    context.state !==
    "running"
  ) {
    return;
  }

  const start =
    context.currentTime +
    0.02;

  [
    740,
    900,
    1060
  ].forEach(
    function (
      frequency,
      index
    ) {
      const oscillator =
        context.createOscillator();

      const gain =
        context.createGain();

      oscillator.frequency.value =
        frequency;

      oscillator.type =
        "triangle";

      gain.gain.setValueAtTime(
        0.0001,
        start +
          index *
            0.13
      );

      gain.gain.exponentialRampToValueAtTime(
        0.45,
        start +
          index *
            0.13 +
          0.015
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        start +
          index *
            0.13 +
          0.24
      );

      oscillator.connect(
        gain
      );

      gain.connect(
        context.destination
      );

      oscillator.start(
        start +
          index *
            0.13
      );

      oscillator.stop(
        start +
          index *
            0.13 +
          0.27
      );
    }
  );
}

function requestNotificationPermission() {
  if (
    !(
      "Notification" in
      window
    )
  ) {
    return;
  }

  if (
    Notification.permission ===
    "default"
  ) {
    Notification.requestPermission().catch(
      function () {
      }
    );
  }
}

function showNewBookingAlert(
  booking
) {
  playNotificationSound();

  document.title =
    "🔔 Novo agendamento | GNG";

  window.setTimeout(
    function () {
      document.title =
        state.originalTitle;
    },
    20000
  );

  setMessage(
    globalMessage,
    "Novo agendamento: " +
      (
        booking.customer_name ||
        "Cliente"
      ) +
      " às " +
      normalizeTime(
        booking.booking_time
      ) +
      ".",
    "info"
  );

  if (
    "Notification" in
      window &&
    Notification.permission ===
      "granted"
  ) {
    try {
      const notification =
        new Notification(
          "Novo agendamento | GNG",
          {
            body:
              (
                booking.customer_name ||
                "Cliente"
              ) +
              "\n" +
              (
                booking.service ||
                "Atendimento"
              ) +
              "\n" +
              normalizeTime(
                booking.booking_time
              ),

            icon:
              "assets/logo-gng.jpg",

            badge:
              "assets/logo-gng.jpg",

            tag:
              "gng-barber-" +
              booking.id,

            requireInteraction:
              true,

            silent:
              false
          }
        );

      notification.onclick =
        function () {
          window.focus();

          notification.close();
        };
    } catch (error) {
      console.error(
        error
      );
    }
  }
}

async function pollPending() {
  if (
    state.polling ||
    !state.profile
  ) {
    return;
  }

  state.polling =
    true;

  try {
    const data =
      await rpc(
        "barber_list_active_pending_bookings"
      );

    const bookings =
      Array.isArray(
        data
      )
        ? data
        : [];

    const currentIds =
      new Set(
        bookings.map(
          function (booking) {
            return booking.id;
          }
        )
      );

    if (
      !state.baselineReady
    ) {
      state.knownPendingIds =
        currentIds;

      state.baselineReady =
        true;

      return;
    }

    const newBookings =
      bookings.filter(
        function (booking) {
          return (
            !state.knownPendingIds.has(
              booking.id
            )
          );
        }
      );

    state.knownPendingIds =
      currentIds;

    if (
      newBookings.length >
      0
    ) {
      newBookings.forEach(
        showNewBookingAlert
      );

      await refreshAgenda();
    }
  } catch (error) {
    console.error(
      error
    );
  } finally {
    state.polling =
      false;
  }
}

function startPolling() {
  if (
    state.pollTimer
  ) {
    return;
  }

  state.baselineReady =
    false;

  state.knownPendingIds =
    new Set();

  pollPending();

  state.pollTimer =
    window.setInterval(
      pollPending,
      POLL_INTERVAL
    );
}

function stopPolling() {
  if (
    state.pollTimer
  ) {
    window.clearInterval(
      state.pollTimer
    );
  }

  state.pollTimer =
    null;

  state.baselineReady =
    false;

  state.knownPendingIds =
    new Set();
}

function setupEvents() {
  authForm.addEventListener(
    "submit",
    handleAuthSubmit
  );

  authModeButton.addEventListener(
    "click",
    function () {
      setAuthMode(
        state.authMode ===
          "login"
          ? "register"
          : "login"
      );
    }
  );

  logoutButton.addEventListener(
    "click",
    async function () {
      stopPolling();

      await supabaseClient.auth.signOut();

      state.session =
        null;

      state.profile =
        null;

      dashboard.hidden =
        true;

      authSection.hidden =
        false;

      setAuthMode(
        "login"
      );
    }
  );

  refreshButton.addEventListener(
    "click",
    refreshAgenda
  );

  dateInput.addEventListener(
    "change",
    async function () {
      state.selectedDate =
        dateInput.value;

      await refreshAgenda();
    }
  );

  viewButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          state.view =
            button.dataset.barberView;

          viewButtons.forEach(
            function (item) {
              item.classList.toggle(
                "is-active",
                item ===
                  button
              );
            }
          );

          renderBookings();
        }
      );
    }
  );

  bookingsList.addEventListener(
    "click",
    function (event) {
      const actionButton =
        event.target.closest(
          "[data-action]"
        );

      if (
        !actionButton
      ) {
        return;
      }

      const card =
        actionButton.closest(
          "[data-booking-id]"
        );

      if (
        !card
      ) {
        return;
      }

      bookingAction(
        card.dataset.bookingId,
        actionButton.dataset.action
      );
    }
  );

  paymentClose.addEventListener(
    "click",
    closePaymentModal
  );

  document
    .querySelector(
      "[data-close-payment]"
    )
    .addEventListener(
      "click",
      closePaymentModal
    );

  paymentButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          completeBooking(
            button.dataset.barberPayment
          );
        }
      );
    }
  );

  document.addEventListener(
    "pointerdown",
    function () {
      activateAudio();

      requestNotificationPermission();
    },
    {
      capture:
        true,

      passive:
        true
    }
  );

  document.addEventListener(
    "keydown",
    function () {
      activateAudio();

      requestNotificationPermission();
    },
    {
      capture:
        true
    }
  );

  supabaseClient.auth.onAuthStateChange(
    function (
      event,
      session
    ) {
      if (
        event ===
        "SIGNED_OUT"
      ) {
        stopPolling();

        dashboard.hidden =
          true;

        authSection.hidden =
          false;
      }

      if (
        (
          event ===
            "SIGNED_IN" ||
          event ===
            "INITIAL_SESSION"
        ) &&
        session &&
        !state.profile
      ) {
        window.setTimeout(
          enterDashboard,
          0
        );
      }
    }
  );

  state.countdownTimer =
    window.setInterval(
      updateCountdowns,
      1000
    );
}

async function initialize() {
  setAuthMode(
    "login"
  );

  setupEvents();

  await restoreSession();
}

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );
} else {
  initialize();
}
