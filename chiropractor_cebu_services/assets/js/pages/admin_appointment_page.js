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
  * ADd an alert to delete an appointment when pressing the `delete` icon
  */
  document.querySelectorAll(".delete-appointment").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this appointment?")) {
        notyf.success("Appointment information deleted successfully!");
      }
    });
  });
});
