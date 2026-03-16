/**
 * Admin Appointment Page
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  /**
   * Notyf sample (will be changed when backend is integrated)
   */
  const notyf = new Notyf({
    position: { x: 'right', y: 'top' },
    duration: 3000
  });

  /**
  * Add an alert to delete an appointment when pressing the `delete` icon
  */
  document.querySelectorAll(".delete-appointment").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this appointment?")) {
        notyf.success("Appointment information deleted successfully!");
      }
    });
  });

  /**
  * Modal for appointments export to CSV
  */
  const exportCSVModal = makeModalController("appointmentsExportCSVModal");

  const exportBtn = document.getElementById("appointmentsExportToCSV");
  if (exportBtn && exportCSVModal) {
    exportBtn.addEventListener("click", function () {
      exportCSVModal.open();
    });
  }

  const exportForm = document.getElementById("exportCSVForm");
  if (exportForm) {
    exportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Export CSV from:", start, "to:", end);

      // ⭐ later you will call API here
      // fetch(`/appointments/export?start=${start}&end=${end}`)

      exportCSVModal.close();
    });
  }
  
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
  const startToEndDateAppointments = document.querySelector('#start-to-end-date-appointments');
  if (typeof startToEndDateAppointments != undefined) {
    startToEndDateAppointments.flatpickr({
      mode: 'range',
      static: true
    });
  }
});
