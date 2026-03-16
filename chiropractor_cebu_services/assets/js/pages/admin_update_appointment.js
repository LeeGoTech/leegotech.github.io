/**
 * Admin Update Appointment
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Dropzone JS Default Code
   */
  let myDropzoneMulti;
  const previewTemplate = `<div class="dz-preview dz-file-preview">
    <div class="dz-details">
      <div class="dz-thumbnail">
        <img data-dz-thumbnail>
        <span class="dz-nopreview">No preview</span>
        <div class="dz-success-mark"></div>
        <div class="dz-error-mark"></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
        </div>
      </div>
      <div class="dz-filename" data-dz-name></div>
      <div class="dz-size" data-dz-size></div>
    </div>
  </div>`;
  /**
   * Dropzone Custom Code
   */
  const dropzoneMulti = document.querySelector('#dropzone-multi');
  if (dropzoneMulti) {
    myDropzoneMulti = new Dropzone(dropzoneMulti, {
      url: "/upload",
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      acceptedFiles: "image/jpeg,image/png",
      addRemoveLinks: true
    });

    /**
     * Sample iterations for pre-uploaded images (will be used soon once backend is integrated)
     */
    const existingImages = [
      { name: "1.png", size: 123456, url: "assets/images/1.png" },
      { name: "brand.png", size: 223456, url: "assets/images/brand.png" }
    ];
    existingImages.forEach(file => {
      const mockFile = {
        name: file.name,
        size: file.size
      };
      myDropzoneMulti.displayExistingFile(mockFile, file.url);
      // register file inside Dropzone so remove buttons work
      myDropzoneMulti.files.push(mockFile);
    });
  }


  /**
   * Update Appointment Form Validation
   */
  const form = document.getElementById("appointmentForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const fullName = document.getElementById("fullName");
    const date = document.getElementById("date");
    const healthConcerns = document.getElementById("healthConcerns");

    // Reset validation
    form.querySelectorAll(".form-control, .form-select").forEach(el => {
      el.classList.remove("is-invalid", "is-valid");
    });

    // Full Name
    if (fullName.value === "" || fullName.value === "-----") {
      fullName.classList.add("is-invalid");
      valid = false;
    } else {
      fullName.classList.add("is-valid");
    }

    // Date
    if (date.value === "") {
      date.classList.add("is-invalid");
      valid = false;

    } else {
      const selectedDate = new Date(date.value);
      const now = new Date();

      if (selectedDate < now) {
        date.classList.add("is-invalid");
        valid = false;
      } else {
        date.classList.add("is-valid");
      }
    }

    // Health Concerns (optional but mark valid if filled)
    if (healthConcerns.value.trim() !== "") {
      healthConcerns.classList.add("is-valid");
    }
    /**
     * Notyf sample (will be changed when backend is integrated)
     */
    const notyf = new Notyf({
      position: { x: 'right', y: 'top' },
      duration: 3000
    });
    if (valid) {
      notyf.success("Appointment information saved successfully!");
      // simulate delay so admin can see notification
      setTimeout(() => {
        form.submit();
      }, 3000);
    }
  });

});