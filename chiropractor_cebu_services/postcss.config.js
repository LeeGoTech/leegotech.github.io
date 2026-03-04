const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
  plugins: [
    purgecss({
      content: [
        './admin_dashboard.html', 
        './admin_booking_page.html', 
        './admin_booking_show_page.html', 
        './admin_people_page.html', 
        './admin_create_person.html', 
        './admin_show_person.html', 
        './admin_update_person.html', 
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