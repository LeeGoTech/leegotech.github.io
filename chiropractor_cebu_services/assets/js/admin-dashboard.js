/**
 * Admin Dashboard
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  /**
  * Navbar toggler when on mobile/tablet
  */
  const toggler = document.getElementById("navbar-toggler");
  if (toggler) {
    toggler.addEventListener("click", function () {
      document.documentElement.classList.add("layout-menu-expanded");
    });
  }

  const closeBtn = document.getElementById("navbar-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.documentElement.classList.remove("layout-menu-expanded");
    });
  }

  /**
  * Generic modal helper (Bootstrap-style, no Bootstrap JS plugin)
  */
  function makeModalController(modalId, opts = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) return null;

    const {
      openSelector = null,
      closeSelector = ".btn-close, .btn-label-secondary, [data-modal-close]",
      onOpen = null
    } = opts;

    let backdrop = null;

    function createBackdrop() {
      backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade";
      document.body.appendChild(backdrop);

      setTimeout(() => backdrop && backdrop.classList.add("show"), 10);
      backdrop.addEventListener("click", close);
    }

    function removeBackdrop() {
      if (!backdrop) return;
      backdrop.classList.remove("show");
      setTimeout(() => {
        if (backdrop) {
          backdrop.remove();
          backdrop = null;
        }
      }, 150);
    }

    function open(triggerEl = null) {
      if (typeof onOpen === "function") onOpen(triggerEl);

      modal.style.display = "block";
      modal.removeAttribute("aria-hidden");
      document.body.classList.add("modal-open");

      createBackdrop();
      setTimeout(() => modal.classList.add("show"), 10);
    }

    function close() {
      if (document.activeElement && modal.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      modal.classList.remove("show");

      setTimeout(() => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      }, 150);

      document.body.classList.remove("modal-open");
      removeBackdrop();
    }

    modal.querySelectorAll(closeSelector).forEach((btn) => {
      btn.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) close();
    });

    if (openSelector) {
      document.querySelectorAll(openSelector).forEach((el) => {
        el.addEventListener("click", function (e) {
          if (el.tagName.toLowerCase() === "a") e.preventDefault();
          open(el);
        });
      });
    }

    return { open, close, modal };
  }

  // makeModalController("basicModal", {
  //   openSelector: "#openModalBtn",
  //   closeSelector: ".btn-close, .btn-label-secondary, [data-modal-close]"
  // });

  // const maintenanceForm = document.getElementById("maintenanceModalForm");
  // const maintenanceTitle = document.getElementById("maintenanceModalTitle");

  // const assetNameEl = document.getElementById("maintenanceAssetName");
  // const assignedToEl = document.getElementById("maintenanceAssignedTo");

  // makeModalController("maintenanceModal", {
  //   openSelector: ".open-maintenance-modal",
  //   closeSelector: ".btn-close, .btn-label-secondary, [data-modal-close]",
  //   onOpen: (triggerEl) => {
  //     if (!triggerEl) return;

  //     const action = triggerEl.getAttribute("data-action");
  //     const assetName = triggerEl.getAttribute("data-asset-name") || "";
  //     const assignedTo = triggerEl.getAttribute("data-assigned-to") || "Unassigned";

  //     if (maintenanceForm && action) maintenanceForm.setAttribute("action", action);

  //     if (maintenanceTitle) {
  //       maintenanceTitle.textContent = assetName
  //         ? `Log Repair — ${assetName}`
  //         : "Log Repair";
  //     }

  //     if (assetNameEl) assetNameEl.textContent = assetName || "—";
  //     if (assignedToEl) assignedToEl.textContent = assignedTo || "Unassigned";

  //     if (maintenanceForm) maintenanceForm.reset();
  //   }
  // });

  /**
  * Dropdown JS
  */
  const dropdown = document.querySelector(".dropdown-user");
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");

  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    menu.classList.toggle("show");
  });

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
});
