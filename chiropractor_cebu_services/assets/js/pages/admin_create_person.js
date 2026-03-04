/**
 * Admin Create Person
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("userForm");
  const avatar = document.getElementById("avatar");

  // Avatar change validation (runs immediately when selecting file)
  avatar.addEventListener("change", function () {

    const file = this.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed.");
      this.value = "";
      this.classList.add("is-invalid");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB.");
      this.value = "";
      this.classList.add("is-invalid");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("avatarPreview").src = e.target.result;
    };

    reader.readAsDataURL(file);

    this.classList.remove("is-invalid");
    this.classList.add("is-valid");
  });


  form.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const gender = document.getElementById("gender");
    const dob = document.getElementById("dateOfBirth");
    const phone = document.getElementById("phoneNumber");
    const address = document.getElementById("address");

    // Reset validation
    form.querySelectorAll(".form-control, .form-select").forEach(el => {
      el.classList.remove("is-invalid", "is-valid");
    });

    // First Name
    if (firstName.value.trim() === "") {
      firstName.classList.add("is-invalid");
      valid = false;
    } else {
      firstName.classList.add("is-valid");
    }

    // Last Name
    if (lastName.value.trim() === "") {
      lastName.classList.add("is-invalid");
      valid = false;
    } else {
      lastName.classList.add("is-valid");
    }

    // Gender
    if (gender.value === "") {
      gender.classList.add("is-invalid");
      valid = false;
    } else {
      gender.classList.add("is-valid");
    }

    // Date of Birth
    if (dob.value === "") {
      dob.classList.add("is-invalid");
      valid = false;
    } else {
      dob.classList.add("is-valid");
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone.value)) {
      phone.classList.add("is-invalid");
      valid = false;
    } else {
      phone.classList.add("is-valid");
    }

    // Address
    if (address.value.trim() === "") {
      address.classList.add("is-invalid");
      valid = false;
    } else {
      address.classList.add("is-valid");
    }

    // Avatar size validation during submit
    if (avatar.files.length > 0) {

      const file = avatar.files[0];

      if (file.size > 2 * 1024 * 1024) {
        avatar.classList.add("is-invalid");
        valid = false;
      }
    }

    /**
     * Notyf sample (will be changed when backend is integrated)
     */
    const notyf = new Notyf({
      position: { x: 'right', y: 'top' },
      duration: 3000
    });
    if (valid) {
      notyf.success("User information saved successfully!");
      // simulate delay so user can see notification
      setTimeout(() => {
        form.submit();
      }, 3000);
    }

  });

});