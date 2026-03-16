/**
 * Admin Calendar Page
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const calendarEl = document.getElementById('calendar');

  const calendarColors = {
    Completed: 'success',
    Serving: 'info',
    Waiting: 'warning',
    Cancelled: 'danger'
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'listMonth',

    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    events: [
      {
        title: 'Priority #1 Juan',
        start: '2026-03-18',
        extendedProps: { 
          status: 'Serving',
          url: '/admin_show_appointment.html'
        }
      },
      {
        title: 'Priority #2 Maria',
        start: '2026-03-18',
        extendedProps: { 
          status: 'Waiting',
          url: '/admin_show_appointment.html' }
      },
      {
        title: 'Priority #3 Pedro',
        start: '2026-03-19',
        extendedProps: { 
          status: 'Completed',
          url: '/admin_show_appointment.html' }
      },
      {
        title: 'Priority #4 Pedro',
        start: '2026-03-20',
        extendedProps: { 
          status: 'Cancelled',
          url: '/admin_show_appointment.html' }
      }
    ],

    eventDidMount: function(info) {
      if (info.event.extendedProps.url) {
        info.el.style.cursor = 'pointer';
        info.el.style.target = '_blank';
      }
    },

    eventClick: function(info) {
      const url = info.event.extendedProps.url;
      if (!url) return;

      info.jsEvent.preventDefault();
      window.open(url, '_blank');
    },

    eventClassNames: function(info) {
      const status = info.event.extendedProps.status;
      const color = calendarColors[status];
      if (color) {
        return ['bg-label-' + color];
      }
      return [];
    }

  });

  calendar.render();
});
