const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
  plugins: [
    purgecss({
      content: ['./admin_dashboard.html', './safelist.html'],
      safelist: ['show', 'hide', 'fade', 'collapsing', 'modal', 'modal-open', 'modal-backdrop', 'active', 'disabled', 'form-control', 'form-select', 'bx-show', 'layout-menu-expanded', 'bx-sun', 'bx-moon', '[data-theme=dark]']
    })
  ]
};