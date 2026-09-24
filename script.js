const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!menuToggle || !mainNav) return;
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function openMenu() {
  if (!menuToggle || !mainNav) return;
  mainNav.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    if (mainNav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mainNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (!mainNav.classList.contains("is-open")) return;
    if (mainNav.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) closeMenu();
  });
}
