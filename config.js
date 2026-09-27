const SUPABASE_URL =
  "https://ueqfokfnjsjgocotvdae.supabase.co";

const SUPABASE_PUBLIC_KEY =
  "sb_publishable_YqWCSylIzOdQcxuJFpE9dQ_3mVV4oji";

const GNG_ADMIN_EMAIL =
  "vyzo.studiodesign@gmail.com";

function showStartupError(message) {
  console.error(message);

  const target =
    document.getElementById(
      "login-message"
    );

  if (!target) {
    return;
  }

  target.hidden =
    false;

  target.textContent =
    message;

  target.classList.remove(
    "is-success",
    "is-info"
  );

  target.classList.add(
    "is-error"
  );
}

function storageWorks(storage) {
  if (!storage) {
    return false;
  }

  const testKey =
    "__gng_barbearia_storage_test__";

  try {
    storage.setItem(
      testKey,
      "1"
    );

    const valid =
      storage.getItem(
        testKey
      ) === "1";

    storage.removeItem(
      testKey
    );

    return valid;
  } catch (error) {
    return false;
  }
}

function createMemoryStorage() {
  const values = {};

  return {
    getItem(key) {
      if (
        Object.prototype.hasOwnProperty.call(
          values,
          key
        )
      ) {
        return values[key];
      }

      return null;
    },

    setItem(key, value) {
      values[key] =
        String(value);
    },

    removeItem(key) {
      delete values[key];
    }
  };
}

function resolveAuthStorage() {
  try {
    if (
      storageWorks(
        window.localStorage
      )
    ) {
      return {
        storage:
          window.localStorage,

        mode:
          "localStorage"
      };
    }
  } catch (error) {
  }

  try {
    if (
      storageWorks(
        window.sessionStorage
      )
    ) {
      return {
        storage:
          window.sessionStorage,

        mode:
          "sessionStorage"
      };
    }
  } catch (error) {
  }

  return {
    storage:
      createMemoryStorage(),

    mode:
      "memory"
  };
}

function normalizeAdminEmail(email) {
  return String(
    email || ""
  )
    .trim()
    .toLowerCase();
}

function isConfiguredAdminEmail(email) {
  return (
    normalizeAdminEmail(
      email
    ) ===
    normalizeAdminEmail(
      GNG_ADMIN_EMAIL
    )
  );
}

function loadAdminNotifications() {
  if (
    document.querySelector(
      'script[data-gng-admin-notifications="true"]'
    )
  ) {
    return;
  }

  const script =
    document.createElement(
      "script"
    );

  script.src =
    "admin-notifications.js?v=2.0";

  script.async =
    true;

  script.dataset.gngAdminNotifications =
    "true";

  script.addEventListener(
    "error",
    function () {
      console.error(
        "Não foi possível carregar o sistema de notificações."
      );
    }
  );

  document.head.appendChild(
    script
  );
}

window.GNG_CONFIG = {
  supabaseUrl:
    SUPABASE_URL,

  publicKey:
    SUPABASE_PUBLIC_KEY,

  adminEmail:
    GNG_ADMIN_EMAIL,

  businessTimezone:
    "America/Sao_Paulo",

  businessName:
    "GNG Barbearia",

  whatsapp:
    "5561994075539"
};

window.GNG_isConfiguredAdminEmail =
  isConfiguredAdminEmail;

if (
  !SUPABASE_URL ||
  SUPABASE_URL ===
    "COLE_AQUI_A_PROJECT_URL"
) {
  window.supabaseClient =
    null;

  showStartupError(
    "A conexão com o Supabase não está configurada."
  );
} else if (
  !SUPABASE_PUBLIC_KEY
) {
  window.supabaseClient =
    null;

  showStartupError(
    "A chave pública do Supabase não está configurada."
  );
} else if (
  typeof window.supabase ===
    "undefined"
) {
  window.supabaseClient =
    null;

  showStartupError(
    "Não foi possível carregar o sistema administrativo. Recarregue a página."
  );
} else {
  const authStorage =
    resolveAuthStorage();

  window.GNG_AUTH_STORAGE_MODE =
    authStorage.mode;

  try {
    window.supabaseClient =
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
              false,

            storage:
              authStorage.storage
          }
        }
      );

    loadAdminNotifications();
  } catch (error) {
    console.error(
      "Erro ao iniciar Supabase:",
      error
    );

    window.supabaseClient =
      null;

    showStartupError(
      "Não foi possível iniciar a conexão do painel. Recarregue a página."
    );
  }
}
