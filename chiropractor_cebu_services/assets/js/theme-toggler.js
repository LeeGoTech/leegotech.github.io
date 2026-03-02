/**
 * Theme Toggler
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  /**
  * Light/dark mode switcher
  */  
  function updateIcon(theme) {
    if (theme === "dark") {
      themeIcon.classList.remove("bx-sun");
      themeIcon.classList.add("bx-moon");
    } else {
      themeIcon.classList.remove("bx-moon");
      themeIcon.classList.add("bx-sun");
    }
  }

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light"

    this.location.reload()

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });
});
