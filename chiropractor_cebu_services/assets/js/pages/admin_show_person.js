/**
 * Admin Show Person
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Tabs JS code
   */
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
 
  /**
   * Use the function `makeModalController` from `main.js` file
   */
  const imagePreview = makeModalController("imagePreviewModal", {
    openSelector: ".user-image",

    onOpen: (triggerEl) => {
      const preview = document.getElementById("previewImage");

      preview.src = triggerEl.src;

      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    }
  });

  const preview = document.getElementById("previewImage");

  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Apply transform
  function updateTransform() {
    preview.style.transform =
      `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  // Scroll zoom
  preview.addEventListener("wheel", function (e) {
    e.preventDefault();
    const zoomSpeed = 0.1;
    if (e.deltaY < 0) {
      scale += zoomSpeed;
    } else {
      scale -= zoomSpeed;
    }
    scale = Math.max(1, Math.min(scale, 5));
    updateTransform();
  });

  // Double click zoom
  preview.addEventListener("dblclick", function () {
    if (scale === 1) {
      scale = 2;
    } else {
      scale = 1;
      translateX = 0;
      translateY = 0;
    }
    updateTransform();
  });
  
  /**
  * Range Picker for Start and End Date
  */
  const startToEndDateFilter = document.querySelector('#start-to-end-date-filter');
  if (typeof startToEndDateFilter != undefined) {
    startToEndDateFilter.flatpickr({
      mode: 'range',
      static: true
    });
  }
});