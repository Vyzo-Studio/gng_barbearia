(function () {
  const POLL_INTERVAL =
    5000;

  const BUSINESS_TIMEZONE =
    "America/Sao_Paulo";

  const ORIGINAL_TITLE =
    document.title;

  const notificationState = {
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

    audioUnlocked:
      false,

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

  async function unlockAudio() {
    if (
      notificationState.audioUnlocked
    ) {
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    try {
      if (
        !notificationState.audioContext
      ) {
        notificationState.audioContext =
          new AudioContextClass();
      }

      const context =
        notificationState.audioContext;

      if (
        context.state ===
        "suspended"
      ) {
        await context.resume();
      }

      const oscillator =
        context.createOscillator();

      const gain =
        context.createGain();

      gain.gain.setValueAtTime(
        0.0001,
        context.currentTime
      );

      oscillator.connect(
        gain
      );

      gain.connect(
        context.destination
      );

      oscillator.start(
        context.currentTime
      );

      oscillator.stop(
        context.currentTime +
          0.02
      );

      notificationState.audioUnlocked =
        true;
    } catch (error) {
      console.error(
        "Não foi possível liberar o áudio:",
        error
      );
    }
  }

  function createTone(
    context,
    frequency,
    startTime,
    duration,
    volume
  ) {
    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();

    oscillator.type =
      "sine";

    oscillator.frequency.setValueAtTime(
      frequency,
      startTime
    );

    gain.gain.setValueAtTime(
      0.0001,
      startTime
    );

    gain.gain.exponentialRampToValueAtTime(
      volume,
      startTime +
        0.025
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime +
        duration
    );

    oscillator.connect(
      gain
    );

    gain.connect(
      context.destination
    );

    oscillator.start(
      startTime
    );

    oscillator.stop(
      startTime +
        duration +
        0.03
    );
  }

  async function playBookingSound() {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    try {
      if (
        !notificationState.audioContext
      ) {
        notificationState.audioContext =
          new AudioContextClass();
      }

      const context =
        notificationState.audioContext;

      if (
        context.state ===
        "suspended"
      ) {
        await context.resume();
      }

      const now =
        context.currentTime +
        0.03;

      createTone(
        context,
        659.25,
        now,
        0.2,
        0.075
      );

      createTone(
        context,
        880,
        now +
          0.12,
        0.24,
        0.085
      );

      createTone(
        context,
        1046.5,
        now +
          0.27,
        0.32,
        0.095
      );
    } catch (error) {
      console.error(
        "Não foi possível tocar a notificação:",
        error
      );
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
        "Não foi possível solicitar permissão de notificação:",
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

    if (container) {
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

    const time =
      normalizeTime(
        booking.booking_time
      );

    const date =
      formatDateShort(
        booking.booking_date
      );

    const customer =
      getCustomerLabel(
        booking
      );

    Object.assign(
      card.style,
      {
        position:
          "relative",

        overflow:
          "hidden",

        padding:
          "17px 46px 17px 18px",

        border:
          "1px solid rgba(34, 51, 79, 0.15)",

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

        transform:
          "translateX(30px)",

        opacity:
          "0",

        transition:
          "transform .25s ease, opacity .25s ease"
      }
    );

    const accent =
      document.createElement(
        "div"
      );

    Object.assign(
      accent.style,
      {
        position:
          "absolute",

        top:
          "0",

        left:
          "0",

        bottom:
          "0",

        width:
          "5px",

        background:
          "#d97717"
      }
    );

    const kicker =
      document.createElement(
        "span"
      );

    kicker.textContent =
      totalNew > 1
        ? totalNew +
          " NOVOS AGENDAMENTOS"
        : "NOVO AGENDAMENTO";

    Object.assign(
      kicker.style,
      {
        display:
          "block",

        color:
          "#d97717",

        fontSize:
          "11px",

        fontWeight:
          "800",

        letterSpacing:
          ".08em"
      }
    );

    const title =
      document.createElement(
        "strong"
      );

    title.textContent =
      customer;

    Object.assign(
      title.style,
      {
        display:
          "block",

        marginTop:
          "5px",

        color:
          "#0d1728",

        fontSize:
          "16px",

        fontWeight:
          "800"
      }
    );

    const service =
      document.createElement(
        "span"
      );

    service.textContent =
      booking.service ||
      "Atendimento";

    Object.assign(
      service.style,
      {
        display:
          "block",

        marginTop:
          "3px",

        color:
          "#354b6e",

        fontSize:
          "13px",

        fontWeight:
          "700"
      }
    );

    const dateTime =
      document.createElement(
        "span"
      );

    dateTime.textContent =
      date +
      " • " +
      time;

    Object.assign(
      dateTime.style,
      {
        display:
          "block",

        marginTop:
          "7px",

        color:
          "#657287",

        fontSize:
          "12px",

        fontWeight:
          "600"
      }
    );

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

        display:
          "grid",

        placeItems:
          "center",

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
      accent
    );

    card.appendChild(
      kicker
    );

    card.appendChild(
      title
    );

    card.appendChild(
      service
    );

    card.appendChild(
      dateTime
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

    if (agendaButton) {
      agendaButton.click();
    }

    const pendingTab =
      document.querySelector(
        '[data-booking-view="pending"]'
      );

    if (pendingTab) {
      pendingTab.click();
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
      ) ||
      Notification.permission !==
        "granted"
    ) {
      return;
    }

    const time =
      normalizeTime(
        booking.booking_time
      );

    const date =
      formatDateShort(
        booking.booking_date
      );

    const customer =
      getCustomerLabel(
        booking
      );

    try {
      const notification =
        new Notification(
          "Novo agendamento | GNG",
          {
            body:
              customer +
              "\n" +
              (
                booking.service ||
                "Atendimento"
              ) +
              " • " +
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
              true
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
        "Não foi possível mostrar a notificação do navegador:",
        error
      );
    }
  }

  function flashPageTitle(
    count
  ) {
    if (
      notificationState.titleTimeout
    ) {
      window.clearTimeout(
        notificationState.titleTimeout
      );
    }

    document.title =
      count > 1
        ? "🔔 " +
          count +
          " novos agendamentos | GNG"
        : "🔔 Novo agendamento | GNG";

    notificationState.titleTimeout =
      window.setTimeout(
        function () {
          document.title =
            ORIGINAL_TITLE;
        },
        20000
      );
  }

  function restorePageTitle() {
    if (
      notificationState.titleTimeout
    ) {
      window.clearTimeout(
        notificationState.titleTimeout
      );

      notificationState.titleTimeout =
        null;
    }

    document.title =
      ORIGINAL_TITLE;
  }

  function showGlobalPanelMessage(
    booking,
    count
  ) {
    const element =
      document.getElementById(
        "admin-global-message"
      );

    if (!element) {
      return;
    }

    const time =
      normalizeTime(
        booking.booking_time
      );

    element.hidden =
      false;

    element.classList.remove(
      "is-error",
      "is-success"
    );

    element.classList.add(
      "is-info"
    );

    element.textContent =
      count > 1
        ? count +
          " novos agendamentos acabaram de chegar."
        : "Novo agendamento recebido: " +
          (
            booking.service ||
            "atendimento"
          ) +
          " às " +
          time +
          ".";

    window.setTimeout(
      function () {
        if (
          element.textContent &&
          element.textContent.startsWith(
            "Novo"
          )
        ) {
          element.hidden =
            true;
        }
      },
      10000
    );
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

    showGlobalPanelMessage(
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
  }

  async function fetchActivePendingBookings() {
    const client =
      getClient();

    if (!client) {
      return [];
    }

    const {
      data,
      error
    } =
      await client.rpc(
        "admin_list_active_pending_bookings"
      );

    if (error) {
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
      notificationState.polling
    ) {
      return;
    }

    const client =
      getClient();

    if (!client) {
      return;
    }

    notificationState.polling =
      true;

    try {
      const {
        data: sessionData
      } =
        await client.auth.getSession();

      if (
        !sessionData ||
        !sessionData.session
      ) {
        notificationState.baselineReady =
          false;

        notificationState.knownPendingIds =
          new Set();

        return;
      }

      const bookings =
        await fetchActivePendingBookings();

      const currentIds =
        new Set(
          bookings.map(
            function (booking) {
              return booking.id;
            }
          )
        );

      if (
        !notificationState.baselineReady
      ) {
        notificationState.knownPendingIds =
          currentIds;

        notificationState.baselineReady =
          true;

        return;
      }

      const newBookings =
        bookings.filter(
          function (booking) {
            return (
              !notificationState.knownPendingIds.has(
                booking.id
              )
            );
          }
        );

      notificationState.knownPendingIds =
        currentIds;

      if (
        newBookings.length >
        0
      ) {
        await handleNewBookings(
          newBookings
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
          350
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
      notificationState.polling =
        false;
    }
  }

  function stopPolling() {
    if (
      notificationState.intervalId
    ) {
      window.clearInterval(
        notificationState.intervalId
      );

      notificationState.intervalId =
        null;
    }

    notificationState.baselineReady =
      false;

    notificationState.knownPendingIds =
      new Set();
  }

  function startPolling() {
    if (
      notificationState.intervalId
    ) {
      return;
    }

    pollPendingBookings();

    notificationState.intervalId =
      window.setInterval(
        pollPendingBookings,
        POLL_INTERVAL
      );
  }

  async function handleSessionState() {
    const client =
      getClient();

    if (!client) {
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
        "Não foi possível iniciar as notificações:",
        error
      );
    }
  }

  function setupPermissionTriggers() {
    const loginForm =
      document.getElementById(
        "admin-login-form"
      );

    if (loginForm) {
      loginForm.addEventListener(
        "submit",
        function () {
          unlockAudio();

          requestNotificationPermission();
        },
        {
          capture:
            true
        }
      );
    }

    const unlockOnInteraction =
      function () {
        unlockAudio();

        const dashboard =
          document.getElementById(
            "admin-dashboard"
          );

        if (
          dashboard &&
          !dashboard.hidden &&
          "Notification" in
            window &&
          Notification.permission ===
            "default"
        ) {
          requestNotificationPermission();
        }
      };

    document.addEventListener(
      "pointerdown",
      unlockOnInteraction,
      {
        passive:
          true
      }
    );

    document.addEventListener(
      "keydown",
      unlockOnInteraction
    );
  }

  function setupAuthListener() {
    const client =
      getClient();

    if (!client) {
      return;
    }

    client.auth.onAuthStateChange(
      function (
        event,
        session
      ) {
        if (
          event ===
            "SIGNED_IN" ||
          event ===
            "TOKEN_REFRESHED" ||
          event ===
            "INITIAL_SESSION"
        ) {
          if (session) {
            startPolling();
          }
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

  function initializeNotifications() {
    setupPermissionTriggers();

    setupAuthListener();

    handleSessionState();

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
      initializeNotifications
    );
  } else {
    initializeNotifications();
  }
})();
