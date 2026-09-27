(function () {
  const POLL_INTERVAL = 5000;

  const ORIGINAL_TITLE =
    document.title;

  const state = {
    knownPendingIds:
      new Set(),

    baselineReady:
      false,

    polling:
      false,

    intervalId:
      null,

    audioContext:
      null,

    audioReady:
      false,

    soundButton:
      null,

    titleTimeout:
      null
  };

  function getClient() {
    return (
      window.supabaseClient ||
      null
    );
  }

  function normalizeTime(value) {
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

  function getCustomerLabel(
    booking
  ) {
    const name =
      String(
        booking.customer_name ||
        ""
      ).trim();

    if (
      !name ||
      name.toLowerCase() ===
        "cliente via whatsapp"
    ) {
      return "Novo cliente";
    }

    return name;
  }

  function updateSoundButton() {
    if (
      !state.soundButton
    ) {
      return;
    }

    if (
      state.audioReady
    ) {
      state.soundButton.textContent =
        "🔊 SOM ATIVO";

      state.soundButton.title =
        "Clique para testar o som";
    } else {
      state.soundButton.textContent =
        "🔇 ATIVAR SOM";

      state.soundButton.title =
        "Clique para ativar os avisos sonoros";
    }
  }

  function createSoundButton() {
    if (
      document.getElementById(
        "gng-sound-button"
      )
    ) {
      state.soundButton =
        document.getElementById(
          "gng-sound-button"
        );

      updateSoundButton();

      return;
    }

    const headerActions =
      document.querySelector(
        ".admin-header-actions"
      );

    if (
      !headerActions
    ) {
      return;
    }

    const button =
      document.createElement(
        "button"
      );

    button.id =
      "gng-sound-button";

    button.type =
      "button";

    button.className =
      "admin-secondary-button";

    button.textContent =
      "🔇 ATIVAR SOM";

    button.title =
      "Ativar avisos sonoros";

    button.addEventListener(
      "click",
      async function () {
        await activateAudio(
          true
        );

        await requestNotificationPermission();
      }
    );

    headerActions.insertBefore(
      button,
      headerActions.firstChild
    );

    state.soundButton =
      button;

    updateSoundButton();
  }

  function getAudioContextClass() {
    return (
      window.AudioContext ||
      window.webkitAudioContext ||
      null
    );
  }

  async function activateAudio(
    playTest = false
  ) {
    const AudioContextClass =
      getAudioContextClass();

    if (
      !AudioContextClass
    ) {
      if (
        state.soundButton
      ) {
        state.soundButton.textContent =
          "SOM INDISPONÍVEL";

        state.soundButton.disabled =
          true;
      }

      return false;
    }

    try {
      if (
        !state.audioContext
      ) {
        state.audioContext =
          new AudioContextClass();
      }

      const context =
        state.audioContext;

      if (
        context.state ===
        "suspended"
      ) {
        await context.resume();
      }

      state.audioReady =
        context.state ===
        "running";

      updateSoundButton();

      if (
        state.audioReady &&
        playTest
      ) {
        await playBookingSound();
      }

      return (
        state.audioReady
      );
    } catch (error) {
      console.error(
        "Não foi possível ativar o áudio:",
        error
      );

      state.audioReady =
        false;

      updateSoundButton();

      return false;
    }
  }

  function createTone(
    context,
    frequency,
    start,
    duration,
    volume,
    type = "sine"
  ) {
    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();

    oscillator.type =
      type;

    oscillator.frequency.setValueAtTime(
      frequency,
      start
    );

    gain.gain.setValueAtTime(
      0.0001,
      start
    );

    gain.gain.exponentialRampToValueAtTime(
      volume,
      start +
        0.02
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      start +
        duration
    );

    oscillator.connect(
      gain
    );

    gain.connect(
      context.destination
    );

    oscillator.start(
      start
    );

    oscillator.stop(
      start +
        duration +
        0.03
    );
  }

  async function playBookingSound() {
    const AudioContextClass =
      getAudioContextClass();

    if (
      !AudioContextClass
    ) {
      return false;
    }

    try {
      if (
        !state.audioContext
      ) {
        state.audioContext =
          new AudioContextClass();
      }

      const context =
        state.audioContext;

      if (
        context.state ===
        "suspended"
      ) {
        try {
          await context.resume();
        } catch (error) {
        }
      }

      if (
        context.state !==
        "running"
      ) {
        state.audioReady =
          false;

        updateSoundButton();

        return false;
      }

      state.audioReady =
        true;

      updateSoundButton();

      const now =
        context.currentTime +
        0.04;

      createTone(
        context,
        523.25,
        now,
        0.18,
        0.18,
        "sine"
      );

      createTone(
        context,
        659.25,
        now +
          0.14,
        0.22,
        0.2,
        "sine"
      );

      createTone(
        context,
        783.99,
        now +
          0.3,
        0.27,
        0.22,
        "sine"
      );

      createTone(
        context,
        1046.5,
        now +
          0.5,
        0.35,
        0.23,
        "sine"
      );

      return true;
    } catch (error) {
      console.error(
        "Não foi possível tocar o aviso:",
        error
      );

      state.audioReady =
        false;

      updateSoundButton();

      return false;
    }
  }

  async function requestNotificationPermission() {
    if (
      !(
        "Notification" in
        window
      )
    ) {
      return false;
    }

    if (
      Notification.permission ===
      "granted"
    ) {
      return true;
    }

    if (
      Notification.permission ===
      "denied"
    ) {
      return false;
    }

    try {
      const permission =
        await Notification.requestPermission();

      return (
        permission ===
        "granted"
      );
    } catch (error) {
      console.error(
        "Erro ao solicitar notificações:",
        error
      );

      return false;
    }
  }

  function createToastContainer() {
    let container =
      document.getElementById(
        "gng-notification-container"
      );

    if (
      container
    ) {
      return container;
    }

    container =
      document.createElement(
        "div"
      );

    container.id =
      "gng-notification-container";

    Object.assign(
      container.style,
      {
        position:
          "fixed",

        top:
          "100px",

        right:
          "20px",

        zIndex:
          "99999",

        width:
          "min(390px, calc(100vw - 30px))",

        display:
          "grid",

        gap:
          "10px",

        pointerEvents:
          "none"
      }
    );

    document.body.appendChild(
      container
    );

    return container;
  }

  function showPanelNotification(
    booking,
    totalNew
  ) {
    const container =
      createToastContainer();

    const card =
      document.createElement(
        "div"
      );

    const customer =
      getCustomerLabel(
        booking
      );

    const service =
      booking.service ||
      "Atendimento";

    const date =
      formatDateShort(
        booking.booking_date
      );

    const time =
      normalizeTime(
        booking.booking_time
      );

    Object.assign(
      card.style,
      {
        position:
          "relative",

        overflow:
          "hidden",

        padding:
          "18px 48px 18px 20px",

        border:
          "1px solid rgba(34, 51, 79, 0.16)",

        borderRadius:
          "15px",

        background:
          "#ffffff",

        color:
          "#17243a",

        boxShadow:
          "0 22px 60px rgba(13, 23, 40, 0.22)",

        fontFamily:
          "Inter, Arial, sans-serif",

        pointerEvents:
          "auto",

        cursor:
          "pointer",

        opacity:
          "0",

        transform:
          "translateX(30px)",

        transition:
          "opacity .25s ease, transform .25s ease"
      }
    );

    card.innerHTML =
      `
        <div
          style="
            position:absolute;
            left:0;
            top:0;
            bottom:0;
            width:5px;
            background:#d97717;
          "
        ></div>

        <span
          style="
            display:block;
            color:#d97717;
            font-size:11px;
            font-weight:800;
            letter-spacing:.08em;
          "
        >
          ${
            totalNew > 1
              ? totalNew +
                " NOVOS AGENDAMENTOS"
              : "NOVO AGENDAMENTO"
          }
        </span>

        <strong
          style="
            display:block;
            margin-top:5px;
            color:#0d1728;
            font-size:16px;
            font-weight:800;
          "
        >
          ${escapeHtml(
            customer
          )}
        </strong>

        <span
          style="
            display:block;
            margin-top:3px;
            color:#354b6e;
            font-size:13px;
            font-weight:700;
          "
        >
          ${escapeHtml(
            service
          )}
        </span>

        <span
          style="
            display:block;
            margin-top:7px;
            color:#657287;
            font-size:12px;
            font-weight:600;
          "
        >
          ${escapeHtml(
            date
          )}
          •
          ${escapeHtml(
            time
          )}
        </span>
      `;

    const close =
      document.createElement(
        "button"
      );

    close.type =
      "button";

    close.textContent =
      "×";

    close.setAttribute(
      "aria-label",
      "Fechar notificação"
    );

    Object.assign(
      close.style,
      {
        position:
          "absolute",

        top:
          "10px",

        right:
          "10px",

        width:
          "30px",

        height:
          "30px",

        border:
          "0",

        borderRadius:
          "8px",

        background:
          "#edf1f5",

        color:
          "#17243a",

        fontSize:
          "18px",

        cursor:
          "pointer"
      }
    );

    function removeCard() {
      card.style.opacity =
        "0";

      card.style.transform =
        "translateX(30px)";

      window.setTimeout(
        function () {
          card.remove();
        },
        260
      );
    }

    close.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();

        removeCard();
      }
    );

    card.addEventListener(
      "click",
      function () {
        focusBookingInPanel(
          booking
        );

        removeCard();
      }
    );

    card.appendChild(
      close
    );

    container.appendChild(
      card
    );

    window.requestAnimationFrame(
      function () {
        card.style.opacity =
          "1";

        card.style.transform =
          "translateX(0)";
      }
    );

    window.setTimeout(
      removeCard,
      10000
    );
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

  function focusBookingInPanel(
    booking
  ) {
    try {
      window.focus();
    } catch (error) {
    }

    const agendaButton =
      document.querySelector(
        '[data-admin-section="agenda"]'
      );

    if (
      agendaButton
    ) {
      agendaButton.click();
    }

    const pendingButton =
      document.querySelector(
        '[data-booking-view="pending"]'
      );

    if (
      pendingButton
    ) {
      pendingButton.click();
    }

    const dateInput =
      document.getElementById(
        "admin-date-filter"
      );

    if (
      dateInput &&
      booking.booking_date
    ) {
      dateInput.value =
        booking.booking_date;

      dateInput.dispatchEvent(
        new Event(
          "change",
          {
            bubbles:
              true
          }
        )
      );
    }
  }

  function showBrowserNotification(
    booking
  ) {
    if (
      !(
        "Notification" in
        window
      )
    ) {
      return;
    }

    if (
      Notification.permission !==
      "granted"
    ) {
      return;
    }

    const customer =
      getCustomerLabel(
        booking
      );

    const service =
      booking.service ||
      "Atendimento";

    const date =
      formatDateShort(
        booking.booking_date
      );

    const time =
      normalizeTime(
        booking.booking_time
      );

    try {
      const notification =
        new Notification(
          "Novo agendamento | GNG",
          {
            body:
              customer +
              "\n" +
              service +
              "\n" +
              date +
              " às " +
              time,

            icon:
              "assets/logo-gng.jpg",

            badge:
              "assets/logo-gng.jpg",

            tag:
              "gng-booking-" +
              booking.id,

            renotify:
              true,

            requireInteraction:
              true,

            silent:
              false
          }
        );

      notification.onclick =
        function () {
          focusBookingInPanel(
            booking
          );

          notification.close();
        };
    } catch (error) {
      console.error(
        "Não foi possível mostrar a notificação:",
        error
      );
    }
  }

  function flashPageTitle(
    count
  ) {
    if (
      state.titleTimeout
    ) {
      window.clearTimeout(
        state.titleTimeout
      );
    }

    document.title =
      count > 1
        ? "🔔 " +
          count +
          " novos agendamentos | GNG"
        : "🔔 Novo agendamento | GNG";

    state.titleTimeout =
      window.setTimeout(
        function () {
          document.title =
            ORIGINAL_TITLE;

          state.titleTimeout =
            null;
        },
        20000
      );
  }

  function restorePageTitle() {
    if (
      state.titleTimeout
    ) {
      window.clearTimeout(
        state.titleTimeout
      );

      state.titleTimeout =
        null;
    }

    document.title =
      ORIGINAL_TITLE;
  }

  function showPanelMessage(
    booking,
    count
  ) {
    const target =
      document.getElementById(
        "admin-global-message"
      );

    if (
      !target
    ) {
      return;
    }

    target.hidden =
      false;

    target.classList.remove(
      "is-error",
      "is-success"
    );

    target.classList.add(
      "is-info"
    );

    if (
      count > 1
    ) {
      target.textContent =
        count +
        " novos agendamentos acabaram de chegar.";
    } else {
      target.textContent =
        "Novo agendamento recebido: " +
        (
          booking.service ||
          "Atendimento"
        ) +
        " às " +
        normalizeTime(
          booking.booking_time
        ) +
        ".";
    }
  }

  async function handleNewBookings(
    bookings
  ) {
    if (
      bookings.length ===
      0
    ) {
      return;
    }

    await playBookingSound();

    flashPageTitle(
      bookings.length
    );

    showPanelMessage(
      bookings[0],
      bookings.length
    );

    bookings.forEach(
      function (booking) {
        showPanelNotification(
          booking,
          bookings.length
        );

        showBrowserNotification(
          booking
        );
      }
    );

    window.setTimeout(
      function () {
        const refreshButton =
          document.getElementById(
            "admin-refresh-button"
          );

        if (
          refreshButton &&
          !refreshButton.disabled
        ) {
          refreshButton.click();
        }
      },
      250
    );
  }

  async function fetchPendingBookings() {
    const client =
      getClient();

    if (
      !client
    ) {
      return [];
    }

    const {
      data,
      error
    } =
      await client.rpc(
        "admin_list_active_pending_bookings"
      );

    if (
      error
    ) {
      throw error;
    }

    return Array.isArray(
      data
    )
      ? data
      : [];
  }

  async function pollPendingBookings() {
    if (
      state.polling
    ) {
      return;
    }

    const client =
      getClient();

    if (
      !client
    ) {
      return;
    }

    state.polling =
      true;

    try {
      const {
        data:
          sessionData
      } =
        await client.auth.getSession();

      if (
        !sessionData ||
        !sessionData.session
      ) {
        state.baselineReady =
          false;

        state.knownPendingIds =
          new Set();

        return;
      }

      const bookings =
        await fetchPendingBookings();

      const currentIds =
        new Set(
          bookings.map(
            function (
              booking
            ) {
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
          function (
            booking
          ) {
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
        await handleNewBookings(
          newBookings
        );
      }
    } catch (error) {
      const message =
        String(
          error?.message ||
          ""
        ).toLowerCase();

      if (
        !message.includes(
          "jwt"
        ) &&
        !message.includes(
          "unauthorized"
        ) &&
        !message.includes(
          "autorizado"
        )
      ) {
        console.error(
          "Erro ao verificar novos agendamentos:",
          error
        );
      }
    } finally {
      state.polling =
        false;
    }
  }

  function startPolling() {
    if (
      state.intervalId
    ) {
      return;
    }

    pollPendingBookings();

    state.intervalId =
      window.setInterval(
        pollPendingBookings,
        POLL_INTERVAL
      );
  }

  function stopPolling() {
    if (
      state.intervalId
    ) {
      window.clearInterval(
        state.intervalId
      );

      state.intervalId =
        null;
    }

    state.baselineReady =
      false;

    state.knownPendingIds =
      new Set();
  }

  async function checkSession() {
    const client =
      getClient();

    if (
      !client
    ) {
      return;
    }

    try {
      const {
        data
      } =
        await client.auth.getSession();

      if (
        data &&
        data.session
      ) {
        startPolling();
      } else {
        stopPolling();
      }
    } catch (error) {
      console.error(
        error
      );
    }
  }

  function setupAuthenticationWatcher() {
    const client =
      getClient();

    if (
      !client
    ) {
      return;
    }

    client.auth.onAuthStateChange(
      function (
        event,
        session
      ) {
        if (
          (
            event ===
              "SIGNED_IN" ||
            event ===
              "TOKEN_REFRESHED" ||
            event ===
              "INITIAL_SESSION"
          ) &&
          session
        ) {
          startPolling();
        }

        if (
          event ===
          "SIGNED_OUT"
        ) {
          stopPolling();

          restorePageTitle();
        }
      }
    );
  }

  function setupAudioUnlock() {
    document.addEventListener(
      "pointerdown",
      function () {
        if (
          !state.audioReady
        ) {
          activateAudio(
            false
          );
        }
      },
      {
        capture:
          true
      }
    );

    document.addEventListener(
      "keydown",
      function () {
        if (
          !state.audioReady
        ) {
          activateAudio(
            false
          );
        }
      },
      {
        capture:
          true
      }
    );

    const loginForm =
      document.getElementById(
        "admin-login-form"
      );

    if (
      loginForm
    ) {
      loginForm.addEventListener(
        "submit",
        function () {
          activateAudio(
            false
          );

          requestNotificationPermission();
        },
        {
          capture:
            true
        }
      );
    }
  }

  function initialize() {
    createSoundButton();

    setupAudioUnlock();

    setupAuthenticationWatcher();

    checkSession();

    window.addEventListener(
      "focus",
      restorePageTitle
    );

    window.addEventListener(
      "beforeunload",
      stopPolling
    );
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
})();
