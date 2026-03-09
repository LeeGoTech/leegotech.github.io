/**
 * Admin Show Appointment
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  /**
   * Swiper JS code for with arrows
   */
  const swiperWithArrows = document.querySelector('#swiper-with-arrows');
  if (swiperWithArrows) {
    new Swiper(swiperWithArrows, {
      slidesPerView: 'auto',
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }
    });
  }

  /**
   * Use the function `makeModalController` from `main.js` file
   */
  const imagePreview = makeModalController("imagePreviewModal", {
    openSelector: ".appointment-image",

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
});
