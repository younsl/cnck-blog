// Light/dark theme switcher for the CNCK theme.
// The initial theme is applied by an inline script in <head> to avoid a flash;
// this file wires up the toggle button and keeps the syntax-highlight
// stylesheets in sync with the *effective* theme (manual toggle overrides the
// prefers-color-scheme media queries on the syntax <link> tags).
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var lightCss = document.getElementById("syntax-light");
  var darkCss = document.getElementById("syntax-dark");

  function syncSyntax(theme) {
    if (!lightCss || !darkCss) return;
    var dark = theme === "dark";
    lightCss.media = dark ? "not all" : "all";
    darkCss.media = dark ? "all" : "not all";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    syncSyntax(theme);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }

  // Reconcile with whatever the inline head script already set.
  apply(root.getAttribute("data-theme") || "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", next); } catch (e) {}
      apply(next);
    });
  }

  // Follow the OS preference only while the user hasn't chosen explicitly.
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      var stored;
      try { stored = localStorage.getItem("theme"); } catch (err) {}
      if (!stored) apply(e.matches ? "dark" : "light");
    });
  }
})();
