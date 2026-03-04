/**
 * Admin Show Person
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const tabs = document.querySelectorAll(".nav-link[data-target]");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {

    tab.addEventListener("click", function () {

      const target = this.getAttribute("data-target");

      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove("active"));

      // Hide all panes
      panes.forEach(pane => {
        pane.classList.remove("active", "show");
      });

      // Activate clicked tab
      this.classList.add("active");

      // Show corresponding pane
      const activePane = document.querySelector(target);

      if (activePane) {
        activePane.classList.add("active", "show");
      }

    });

  });
  
});