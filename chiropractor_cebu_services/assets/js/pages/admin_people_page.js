/**
 * Admin People Page
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
  * Add an alert to delete the person when pressing the `delete` icon
  */
  document.querySelectorAll(".delete-person").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this person?")) {
        notyf.success("User information deleted successfully!");
      }
    });
  });

  /**
  * Modal for people export to CSV
  */
  const exportCSVModal = makeModalController("peopleExportCSVModal");

  const exportBtn = document.getElementById("peopleExportToCSV");
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
      // fetch(`/people/export?start=${start}&end=${end}`)

      exportCSVModal.close();
    });
  }
  
  /**
  * Range Picker for Start and End Date
  */
  const startToEndDatePeople = document.querySelector('#start-to-end-date-people');
  if (typeof startToEndDatePeople != undefined) {
    startToEndDatePeople.flatpickr({
      mode: 'range',
      static: true
    });
  }
});
