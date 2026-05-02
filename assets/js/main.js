// ========================================
// markblogforpublic — Main JavaScript
// MD3 Edition
// ========================================

(function () {
  "use strict";

  // ---------- State ----------
  const STORAGE_KEYS = {
    LANG: "blog_lang",
    THEME: "blog_theme",
  };

  let currentLang = localStorage.getItem(STORAGE_KEYS.LANG) || "en";
  let currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "system";

  // ---------- DOM refs ----------
  const html = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const langLabel = document.getElementById("langLabel");
  const darkToggle = document.getElementById("darkToggle");
  const lightIcon = document.getElementById("lightIcon");
  const darkIcon = document.getElementById("darkIcon");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  // ---------- Language ----------
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    if (langLabel) {
      langLabel.textContent = lang === "en" ? "中文" : "EN";
    }

    document.querySelectorAll("[data-lang]").forEach((el) => {
      const isMatch = el.getAttribute("data-lang") === lang;
      el.classList.toggle("hidden", !isMatch);
    });
  }

  function toggleLang() {
    applyLang(currentLang === "en" ? "zh" : "en");
  }

  if (langToggle) {
    langToggle.addEventListener("click", toggleLang);
  }

  // ---------- Theme ----------
  function getEffectiveTheme() {
    if (currentTheme === "dark") return "dark";
    if (currentTheme === "light") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme() {
    const effective = getEffectiveTheme();
    const isDark = effective === "dark";

    html.classList.toggle("dark", isDark);

    // Toggle Material Symbol icons
    if (lightIcon && darkIcon) {
      lightIcon.classList.toggle("hidden", !isDark);
      darkIcon.classList.toggle("hidden", isDark);
    }
  }

  function toggleTheme() {
    if (currentTheme === "system") {
      currentTheme = "dark";
    } else if (currentTheme === "dark") {
      currentTheme = "light";
    } else {
      currentTheme = "system";
    }
    localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
    applyTheme();
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system dark mode changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);

  // ---------- Mobile Menu ----------
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // ---------- Initialize ----------
  applyLang(currentLang);
  applyTheme();
})();
