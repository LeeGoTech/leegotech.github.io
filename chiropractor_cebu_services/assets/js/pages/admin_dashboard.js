/**
 * Admin Dashboard
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  /**
   * Notyf Configuration
   */
  const notyf = new Notyf({
    position: { x: 'right', y: 'top' },
    duration: 3000
  });

  const dateElement = document.getElementById("dashboard-current-date");
  const timeElement = document.getElementById("dashboard-current-time");

  if (!dateElement || !timeElement) return;

  const updateDashboardDateTime = () => {
    const now = new Date();

    dateElement.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    timeElement.textContent = now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  updateDashboardDateTime();
  setInterval(updateDashboardDateTime, 1000);

  /* =====================================
    Code for Complete and Cancel Appointment
  ===================================== */
  const appointmentStatusModal = makeModalController("appointmentStatusModal");

  let selectedStatus = null;
  let selectedPriority = null;

  document.querySelectorAll(".appointment-action")
  .forEach(btn => {
    btn.addEventListener("click", function () {
      const priority = this.dataset.priority;
      const patient = this.dataset.patient;
      const date = this.dataset.date;
      const status = this.dataset.status;
      selectedStatus = status;
      selectedPriority = priority;
      const badge_color = status === "completed" ? "badge bg-label-success" : "badge bg-label-danger";

      document.getElementById("appointmentStatusMessage").innerHTML =
        `Set Priority ${priority} ${patient}, ${date} to <span class="${badge_color}">${status.toUpperCase()}</span>?`;
      appointmentStatusModal.open(this);
    });
  });

  document.getElementById("confirmStatusBtn")
  .addEventListener("click", function () {
    console.log("Priority:", selectedPriority);
    console.log("New Status:", selectedStatus);

    // ⭐ TODO: call backend update here
    // fetch('/update-status', { ... })

    appointmentStatusModal.close();

    notyf.success("Appointment status updated successfully!");
    // simulate delay so user can see notification
    setTimeout(() => {
      form.submit();
    }, 3000);
  });

  /* =====================================
    APPOINTMENTS TREND — FRONTEND VERSION
  ===================================== */
  // NOTE: Replace the function with fetch in the future. For instance, `fetch('/api/appointments-trend.php')`.
  function generateDumpDailyData(days) {
    if (!days || isNaN(days)) days = 30;
    const categories = [];
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      categories.push(
        d.toLocaleDateString(undefined, {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        })
      );
      data.push(Math.floor(Math.random() * 40) + 10);
    }
    return { categories, data };
  }

  const defaultRange = 7;
  let dumpDataset = generateDumpDailyData(defaultRange);

  const appointmentsTrendChartEl = document.querySelector('#appointmentsTrendChart');
  if (appointmentsTrendChartEl) {
    window.appointmentsTrendChart = new ApexCharts(
      appointmentsTrendChartEl,
      {
        chart: {
          height: 400,
          type: 'area',
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: "Appointments",
            data: dumpDataset.data
          }
        ],
        colors: ['#ffab00'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        markers: {
          size: 5,
          strokeWidth: 4,
          strokeColors: chartConfig.cardColor
        },
        grid: {
          borderColor: chartConfig.borderColor,
          strokeDashArray: 4,
          yaxis: { lines: { show: true } },
          xaxis: { lines: { show: false } }
        },
        xaxis: {
          categories: dumpDataset.categories,
          labels: {
            show: true,
            style: {
              colors: chartConfig.labelColor,
              fontSize: '13px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: chartConfig.labelColor
            }
          }
        },
        tooltip: {
          y: {
            formatter: val => val + " patients"
          }
        }
      }
    );
    appointmentsTrendChart.render();
  }
  /* =====================================
    DATE RANGE FILTER CHANGE
  ===================================== */
  const trendRangeSelect = document.getElementById('trendRange');
  if (trendRangeSelect) {
    trendRangeSelect.addEventListener('change', function () {
      let days = parseInt(this.value);
      if (!days || days <= 0) days = 30;

      // ⭐ decide marker size dynamically
      const markerSize = (days == 7) ? 5 : 0;
      const xAxisCategories = (days == 7) ? true : false;
      const newDataset = generateDumpDailyData(days);

      appointmentsTrendChart.destroy();
      appointmentsTrendChart = new ApexCharts(
        appointmentsTrendChartEl,
        {
          chart: {
            height: 400,
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false }
          },
          dataLabels: {
            enabled: false,
          },
          series: [
            {
              name: "Appointments",
              data: newDataset.data
            }
          ],
          colors: ['#ffab00'],
          stroke: {
            curve: 'smooth',
            width: 3
          },
          markers: {
            size: markerSize,
            strokeWidth: 4,
            strokeColors: chartConfig.cardColor
          },
          grid: {
            borderColor: chartConfig.borderColor,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } }
          },
          xaxis: {
            categories: newDataset.categories,
            labels: {
              show: xAxisCategories,
              style: {
                colors: chartConfig.labelColor,
                fontSize: '13px'
              }
            }
          },
          yaxis: {
            labels: {
              style: { colors: chartConfig.labelColor }
            }
          },
          tooltip: {
            y: {
              formatter: val => val + " patients"
            }
          }
        }
      );
      appointmentsTrendChart.render();
    });
  }

  /* =====================================
    STATUS DISTRIBUTION — DUMP VERSION
  ===================================== */
  const statusDistributionChartEl = document.querySelector('#statusDistributionChart');
  function generateDumpStatusData() {
    // ⭐ dump counts (not percent — more realistic)
    const data = {
      completed: Math.floor(Math.random() * 40) + 30,
      serving: Math.floor(Math.random() * 25) + 5,
      waiting: Math.floor(Math.random() * 25) + 5,
      cancelled: Math.floor(Math.random() * 10) + 3
    };
    return data;
  }

  function computeStatusStats(raw) {
    const total =
      raw.completed +
      raw.serving +
      raw.waiting +
      raw.cancelled
    return {
      total,
      percentages: [
        Math.round((raw.completed / total) * 100),
        Math.round((raw.serving / total) * 100),
        Math.round((raw.waiting / total) * 100),
        Math.round((raw.cancelled / total) * 100)
      ]
    };
  }

  function updateStatusSideUI(percentages) {
    const container = document.getElementById('statusDistributionList');
    if (!container) return;
    const rows = container.querySelectorAll('.text-body-primary');
    rows.forEach((el, i) => {
      el.textContent = percentages[i] + "%";
    });

  }

  if (statusDistributionChartEl) {
    const rawData = generateDumpStatusData();
    const stats = computeStatusStats(rawData);
    window.statusDistributionChart = new ApexCharts(
      statusDistributionChartEl,
      {
        chart: {
          type: 'donut',
          height: 220,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        },
        series: [
          rawData.completed,
          rawData.serving,
          rawData.waiting,
          rawData.cancelled
        ],
        labels: [
          'Completed',
          'Serving',
          'Waiting',
          'Cancelled'
        ],
        colors: [
          '#6dd32e',
          '#1ca8c7',
          '#f5a200',
          '#ff3b1d'
        ],
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        legend: { show: false },
        tooltip: {
          y: {
            formatter: val => val
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '72%',
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 0
                },
                value: {
                  show: true,
                  color: chartConfig.labelColor,
                },
                total: {
                  show: true,
                  label: 'Total',
                  fontSize: '14px',
                  color: chartConfig.headingColor,
                  formatter: () => stats.total
                }
              }
            }
          }
        },
        states: {
          hover: {
            filter: { type: 'none' }
          }
        }
      }
    );
    statusDistributionChart.render();
    // ⭐ sync right side percentages
    updateStatusSideUI(stats.percentages);
  }

  /* =====================================
    PATIENT DEMOGRAPHICS — AGE GROUP
  ===================================== */
  const patientDemographicsChartEl = document.querySelector('#patientDemographicsChart');
  function generateDumpAgeGroupData() {
    return [
      Math.floor(Math.random() * 15) + 5,   // 0–17
      Math.floor(Math.random() * 25) + 10,  // 18–30
      Math.floor(Math.random() * 30) + 15,  // 31–45
      Math.floor(Math.random() * 20) + 8,   // 46–60
      Math.floor(Math.random() * 15) + 5    // 60+
    ];
  }
  if (patientDemographicsChartEl) {
    const dumpAgeData = generateDumpAgeGroupData();
    const patientDemographicsChart = new ApexCharts(
      patientDemographicsChartEl,
      {
        chart: {
          type: 'bar',
          height: 320,
          toolbar: { show: false }
        },
        series: [
          {
            name: 'Patients',
            data: dumpAgeData
          }
        ],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '55%',
            borderRadius: 6,
            distributed: true
          }
        },
        colors: [
          '#7ed957',
          '#29a3ef',
          '#f5a200',
          '#ff6b6b',
          '#8c98a4'
        ],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        grid: {
          borderColor: chartConfig.borderColor,
          strokeDashArray: 4,
          xaxis: { lines: { show: true } },
          yaxis: { lines: { show: false } }
        },
        xaxis: {
          categories: [
            '0–17',
            '18–30',
            '31–45',
            '46–60',
            '60+'
          ],
          labels: {
            style: {
              colors: chartConfig.labelColor
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: chartConfig.labelColor
            }
          }
        },
        tooltip: {
          y: {
            formatter: val => val + " patients"
          }
        },
        legend: {
          labels: {
            colors: chartConfig.headingColor
          }
        }
      }
    );
    patientDemographicsChart.render();
  }
});
