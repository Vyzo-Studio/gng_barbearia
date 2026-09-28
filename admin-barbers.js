(function () {
  if (window.GNG_BARBERS_ENHANCEMENT_INSTALLED) {
    return;
  }

  window.GNG_BARBERS_ENHANCEMENT_INSTALLED =
    true;

  let barbers = [];
  let manualBarber = null;
  let blockSlotBarber = null;
  let originalRenderBookings = null;
  let originalOpenBookingModal = null;
  let originalClientRpc = null;

  function getClient() {
    return (
      window.supabaseClient ||
      null
    );
  }

  function getBarberName(barberId) {
    const barber =
      barbers.find(
        function (item) {
          return (
            item.id ===
            barberId
          );
        }
      );

    return barber
      ? barber.name
      : "";
  }

  function createBarberField({
    id,
    label,
    placeholder,
    required
  }) {
    const wrapper =
      document.createElement(
        "div"
      );

    wrapper.className =
      "admin-field";

    const labelElement =
      document.createElement(
        "label"
      );

    labelElement.setAttribute(
      "for",
      id
    );

    labelElement.textContent =
      label;

    const select =
      document.createElement(
        "select"
      );

    select.id =
      id;

    select.required =
      Boolean(
        required
      );

    const option =
      document.createElement(
        "option"
      );

    option.value =
      "";

    option.textContent =
      placeholder;

    select.appendChild(
      option
    );

    wrapper.appendChild(
      labelElement
    );

    wrapper.appendChild(
      select
    );

    return {
      wrapper,
      select
    };
  }

  function injectBarberFields() {
    if (
      !document.getElementById(
        "manual-barber"
      )
    ) {
      const service =
        document.getElementById(
          "manual-service"
        );

      const serviceField =
        service
          ? service.closest(
              ".admin-field"
            )
          : null;

      if (
        serviceField
      ) {
        const field =
          createBarberField({
            id:
              "manual-barber",

            label:
              "Barbeiro",

            placeholder:
              "Selecione o barbeiro",

            required:
              true
          });

        serviceField.insertAdjacentElement(
          "afterend",
          field.wrapper
        );

        manualBarber =
          field.select;
      }
    } else {
      manualBarber =
        document.getElementById(
          "manual-barber"
        );
    }

    if (
      !document.getElementById(
        "block-slot-barber"
      )
    ) {
      const form =
        document.getElementById(
          "block-slot-form"
        );

      const firstRow =
        form
          ? form.querySelector(
              ".management-row"
            )
          : null;

      if (
        form &&
        firstRow
      ) {
        const field =
          createBarberField({
            id:
              "block-slot-barber",

            label:
              "Aplicar bloqueio a",

            placeholder:
              "Todos os barbeiros",

            required:
              false
          });

        form.insertBefore(
          field.wrapper,
          firstRow
        );

        blockSlotBarber =
          field.select;
      }
    } else {
      blockSlotBarber =
        document.getElementById(
          "block-slot-barber"
        );
    }
  }

  async function loadBarbers() {
    try {
      const data =
        await rpc(
          "get_public_barbers"
        );

      barbers =
        Array.isArray(
          data
        )
          ? data
          : [];

      [
        {
          select:
            manualBarber,

          placeholder:
            "Selecione o barbeiro"
        },
        {
          select:
            blockSlotBarber,

          placeholder:
            "Todos os barbeiros"
        }
      ].forEach(
        function ({
          select,
          placeholder
        }) {
          if (
            !select
          ) {
            return;
          }

          const current =
            select.value;

          select.innerHTML =
            "";

          const first =
            document.createElement(
              "option"
            );

          first.value =
            "";

          first.textContent =
            placeholder;

          select.appendChild(
            first
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

              select.appendChild(
                option
              );
            }
          );

          if (
            current &&
            barbers.some(
              function (barber) {
                return (
                  barber.id ===
                  current
                );
              }
            )
          ) {
            select.value =
              current;
          }
        }
      );
    } catch (error) {
      console.error(
        "Erro ao carregar barbeiros no painel:",
        error
      );

      setMessage(
        adminGlobalMessage,
        "Não foi possível carregar os barbeiros.",
        "error"
      );
    }
  }

  function patchNotificationRpc() {
    const client =
      getClient();

    if (
      !client ||
      client.__gngBarberRpcPatched
    ) {
      return;
    }

    originalClientRpc =
      client.rpc.bind(
        client
      );

    client.rpc =
      async function (
        functionName,
        payload,
        options
      ) {
        if (
          functionName ===
          "admin_list_active_pending_bookings"
        ) {
          const result =
            await originalClientRpc(
              "admin_list_active_pending_bookings_v2",
              payload,
              options
            );

          if (
            !result.error &&
            Array.isArray(
              result.data
            )
          ) {
            result.data =
              result.data.map(
                function (booking) {
                  return {
                    ...booking,

                    service:
                      booking.barber_name
                        ? booking.service +
                          " • " +
                          booking.barber_name
                        : booking.service
                  };
                }
              );
          }

          return result;
        }

        return originalClientRpc(
          functionName,
          payload,
          options
        );
      };

    client.__gngBarberRpcPatched =
      true;
  }

  function patchBookingData() {
    loadBookingsForDate =
      async function (
        dateKey
      ) {
        const data =
          await rpc(
            "admin_list_bookings_v2",
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
      };

    bookingMatchesSearch =
      function (booking) {
        const query =
          adminSearch
            ? adminSearch.value
                .trim()
                .toLowerCase()
            : "";

        if (
          !query
        ) {
          return true;
        }

        const haystack =
          [
            booking.customer_name,
            booking.customer_phone,
            booking.service,
            booking.barber_name,
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
      };
  }

  function enhanceBookingCards() {
    document
      .querySelectorAll(
        ".admin-booking-card"
      )
      .forEach(
        function (card) {
          const action =
            card.querySelector(
              "[data-booking-id]"
            );

          if (
            !action
          ) {
            return;
          }

          const booking =
            findBooking(
              action.dataset.bookingId
            );

          if (
            !booking
          ) {
            return;
          }

          const serviceArea =
            card.querySelector(
              ".booking-card-service"
            );

          if (
            !serviceArea
          ) {
            return;
          }

          const oldLabel =
            serviceArea.querySelector(
              "[data-barber-label]"
            );

          if (
            oldLabel
          ) {
            oldLabel.remove();
          }

          const label =
            document.createElement(
              "span"
            );

          label.dataset.barberLabel =
            "true";

          label.textContent =
            "Barbeiro: " +
            (
              booking.barber_name ||
              "Não definido"
            );

          label.style.fontWeight =
            "700";

          label.style.color =
            "#22334f";

          serviceArea.appendChild(
            label
          );
        }
      );
  }

  function patchBookingRendering() {
    originalRenderBookings =
      renderBookings;

    renderBookings =
      function () {
        originalRenderBookings();

        enhanceBookingCards();
      };

    originalOpenBookingModal =
      openBookingModal;

    openBookingModal =
      function (bookingId) {
        originalOpenBookingModal(
          bookingId
        );

        const booking =
          findBooking(
            bookingId
          );

        if (
          !booking ||
          !bookingModalContent
        ) {
          return;
        }

        const grid =
          bookingModalContent.querySelector(
            ".booking-detail-grid"
          );

        if (
          !grid ||
          grid.querySelector(
            "[data-barber-modal-detail]"
          )
        ) {
          return;
        }

        const item =
          document.createElement(
            "div"
          );

        item.className =
          "booking-detail-item";

        item.dataset.barberModalDetail =
          "true";

        item.innerHTML =
          "<span>Barbeiro</span>" +
          "<strong>" +
          escapeHtml(
            booking.barber_name ||
            "Não definido"
          ) +
          "</strong>";

        const serviceItem =
          Array.from(
            grid.children
          ).find(
            function (child) {
              const span =
                child.querySelector(
                  "span"
                );

              return (
                span &&
                span.textContent.trim() ===
                  "Serviço"
              );
            }
          );

        if (
          serviceItem &&
          serviceItem.nextSibling
        ) {
          grid.insertBefore(
            item,
            serviceItem.nextSibling
          );
        } else {
          grid.appendChild(
            item
          );
        }
      };
  }

  function markSelectWaitingForBarber(
    select
  ) {
    if (
      !select
    ) {
      return;
    }

    Array.from(
      select.options
    ).forEach(
      function (option) {
        if (
          !option.value
        ) {
          option.disabled =
            false;

          option.textContent =
            "Selecione";

          return;
        }

        option.disabled =
          true;

        option.textContent =
          option.value +
          " — escolha o barbeiro";
      }
    );

    select.value =
      "";
  }

  function patchAvailability() {
    refreshTimeSelectAvailability =
      async function (
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

        let barberId =
          null;

        let useGlobalAvailability =
          false;

        if (
          select ===
          manualBookingTime
        ) {
          barberId =
            manualBarber
              ? manualBarber.value
              : "";

          if (
            !barberId
          ) {
            markSelectWaitingForBarber(
              select
            );

            return;
          }
        } else if (
          select ===
          blockSlotTime
        ) {
          barberId =
            blockSlotBarber
              ? blockSlotBarber.value
              : "";

          useGlobalAvailability =
            !barberId;
        } else {
          return;
        }

        try {
          const slots =
            useGlobalAvailability
              ? await rpc(
                  "get_public_booked_slots",
                  {
                    p_start_date:
                      dateKey,

                    p_end_date:
                      dateKey
                  }
                )
              : await rpc(
                  "get_public_booked_slots_by_barber",
                  {
                    p_barber_id:
                      barberId,

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
                option.disabled =
                  false;

                option.textContent =
                  "Selecione";

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
            "Erro ao carregar disponibilidade por barbeiro:",
            error
          );
        }
      };

    refreshManagementAvailability =
      async function () {
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
      };
  }

  async function handleManualBookingByBarber(
    event
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (
      !manualCustomerName ||
      !manualCustomerPhone ||
      !manualService ||
      !manualBarber ||
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

    const barberId =
      manualBarber.value;

    const barberName =
      getBarberName(
        barberId
      );

    const date =
      manualBookingDate.value;

    const time =
      manualBookingTime.value;

    if (
      !name ||
      !phone ||
      !service ||
      !barberId ||
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
            " com " +
            barberName +
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

    if (
      !confirmed
    ) {
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
        "admin_create_booking_by_barber",
        {
          p_customer_name:
            name,

          p_customer_phone:
            phone,

          p_service:
            service,

          p_barber_id:
            barberId,

          p_booking_date:
            date,

          p_booking_time:
            time
        }
      );

      setMessage(
        manualBookingMessage,
        "Agendamento criado e confirmado para " +
          barberName +
          ".",
        "success"
      );

      manualCustomerName.value =
        "";

      manualCustomerPhone.value =
        "";

      manualService.value =
        "";

      manualBarber.value =
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

  async function loadBlockedSlotsByBarber() {
    if (
      !blockSlotDate ||
      !blockSlotDate.value
    ) {
      return;
    }

    try {
      const data =
        await rpc(
          "admin_list_blocked_slots_v2",
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

      renderBlockedSlotsByBarber();
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

  function renderBlockedSlotsByBarber() {
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
            const target =
              slot.barber_name ||
              "Todos os barbeiros";

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
                      target
                    )}
                  </span>

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

  async function handleBlockSlotByBarber(
    event
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();

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

    const barberId =
      blockSlotBarber
        ? blockSlotBarber.value ||
          null
        : null;

    const targetName =
      barberId
        ? getBarberName(
            barberId
          )
        : "todos os barbeiros";

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
            " ficará indisponível para " +
            targetName +
            ".",

          actionLabel:
            "BLOQUEAR",

          danger:
            false
        }
      );

    if (
      !confirmed
    ) {
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
        "admin_block_slot_by_barber",
        {
          p_booking_date:
            date,

          p_booking_time:
            time,

          p_barber_id:
            barberId,

          p_reason:
            reason ||
            null
        }
      );

      setMessage(
        blockSlotMessage,
        "Horário bloqueado para " +
          targetName +
          ".",
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

      await loadBlockedSlotsByBarber();

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

  function patchBlockedSlotFunctions() {
    loadBlockedSlots =
      loadBlockedSlotsByBarber;

    renderBlockedSlots =
      renderBlockedSlotsByBarber;
  }

  function setupCaptureHandlers() {
    if (
      manualBookingForm
    ) {
      manualBookingForm.addEventListener(
        "submit",
        handleManualBookingByBarber,
        true
      );
    }

    if (
      blockSlotForm
    ) {
      blockSlotForm.addEventListener(
        "submit",
        handleBlockSlotByBarber,
        true
      );
    }

    if (
      blockedSlotsRefresh
    ) {
      blockedSlotsRefresh.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();

          loadBlockedSlotsByBarber();
        },
        true
      );
    }

    if (
      manualBarber
    ) {
      manualBarber.addEventListener(
        "change",
        async function () {
          await refreshTimeSelectAvailability(
            manualBookingTime,
            manualBookingDate.value
          );
        }
      );
    }

    if (
      blockSlotBarber
    ) {
      blockSlotBarber.addEventListener(
        "change",
        async function () {
          await refreshTimeSelectAvailability(
            blockSlotTime,
            blockSlotDate.value
          );
        }
      );
    }
  }

  async function install() {
    if (
      typeof rpc !==
        "function" ||
      typeof refreshDashboard !==
        "function"
    ) {
      window.setTimeout(
        install,
        100
      );

      return;
    }

    injectBarberFields();

    patchNotificationRpc();

    patchBookingData();

    patchBookingRendering();

    patchAvailability();

    patchBlockedSlotFunctions();

    setupCaptureHandlers();

    await loadBarbers();

    await refreshManagementAvailability();

    await loadBlockedSlotsByBarber();

    if (
      state.user
    ) {
      await refreshDashboard();
    }
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      install,
      {
        once:
          true
      }
    );
  } else {
    install();
  }
})();
