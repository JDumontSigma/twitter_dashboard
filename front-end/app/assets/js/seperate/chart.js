'use strict';

import Chart from 'chart.js';//import chart.js library

export function Update_Chart( number, time ) {
   update_chart.data.datasets[0].data.push(number);
   update_chart.data.labels.push(time);
   update_chart.update();
}

let chart = document.getElementById('chartupdate');

let data = [],
    labels = [],
    config = {
     labels: labels,
     datasets: [{
        data: data,
        backgroundColor: '#19B5FE',
        borderColor: 'rgba(106, 202, 197, 0.15)'
     }]  
    };

    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = false;

    let update_chart = new Chart(chart, {
    type: 'line',
    data: config,
    options: {
        scaleShowVeritcalLines: false,
        responsive: false,
        scales: {
            xAxes: [{
                display: false,
                gridLines:{
                display: false
                }
            }],
            yAxes: [{
                display: false,
                gridLines: {
                display: false
                },
                ticks: {
                beginAtZero: true
                }
            }]
        }
    }
    });

