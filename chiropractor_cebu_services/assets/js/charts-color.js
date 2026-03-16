/**
 * Charts Color Config JS
 */

'use strict';

window.chartConfig = {};

(function () {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark"){
    chartConfig.cardColor = '#2b2c40';
    chartConfig.headingColor = '#d5d5e2';
    chartConfig.labelColor = '#7e7f96';
    chartConfig.legendColor = '#b2b2c4';
    chartConfig.borderColor = '#4e4f6c';
  } else if (savedTheme === "light") {
    chartConfig.cardColor = '#fff';
    chartConfig.headingColor = '#384551';
    chartConfig.labelColor = '#a7acb2';
    chartConfig.legendColor = '#646378';
    chartConfig.borderColor = '#e4e6e8';
  } else {
    chartConfig.cardColor = '#fff';
    chartConfig.headingColor = '#384551';
    chartConfig.labelColor = '#a7acb2';
    chartConfig.legendColor = '#646378';
    chartConfig.borderColor = '#e4e6e8';
  }
  chartConfig.fontFamily = '"Public Sans", -apple-system, blinkmacsystemfont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

  chartConfig.colors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    donut: {
      series1: '#fee802',
      series2: '#3fd0bd',
      series3: '#826bf8',
      series4: '#2b9bf4'
    },
    area: {
      series1: '#29dac7',
      series2: '#60f2ca',
      series3: '#a5f8cd'
    },
    bar: {
      bg: '#1D9FF2'
    }
  };
})();
