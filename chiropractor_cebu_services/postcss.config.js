const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
  plugins: [
    purgecss({
      content: [
        // Dashboard
        './admin_dashboard.html', 

        // Appointments Page
        './admin_appointment_page.html',
        './admin_create_appointment.html',
        './admin_show_appointment.html',
        './admin_update_appointment.html',

        // People Page
        './admin_people_page.html', 
        './admin_create_person.html', 
        './admin_show_person.html', 
        './admin_update_person.html',

        // Appointments Page JS
        './assets/js/pages/admin_appointment_page.js',
        './assets/js/pages/admin_create_appointment.js',
        './assets/js/pages/admin_show_appointment.js',
        './assets/js/pages/admin_update_appointment.js',

        // People Page JS
        './assets/js/pages/admin_people_page.js',
        './assets/js/pages/admin_create_person.js', 
        './assets/js/pages/admin_show_person.js', 
        './assets/js/pages/admin_update_person.js', 
        './safelist.html'
      ],
      safelist: [
        'show', 
        'hide', 
        'fade', 
        'collapsing', 
        'modal', 
        'modal-open', 
        'modal-backdrop', 
        'active', 
        'disabled', 
        'form-control', 
        'form-select', 
        'bx-show', 
        'layout-menu-expanded', 
        'bx-sun', 
        'bx-moon', 
        '[data-theme=dark]'
      ]
    })
  ]
};