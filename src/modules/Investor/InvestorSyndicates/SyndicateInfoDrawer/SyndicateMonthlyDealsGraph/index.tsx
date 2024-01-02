import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

const SyndicateMonthlyDealsGraph = (props:any):any => {
  useEffect(() => {
    Chart.register(ChartDataLabels);
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: props.months,
        datasets: [
          {
            minBarLength: 5,
            label: "Monthly Values",
            data: props.values,
            backgroundColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value === 0 ? '#737373' : '#155E75';
            },
            borderColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value === 0 ? '#737373' : '#155E75';
            },
            borderWidth: 3,
            borderRadius: props?.borderRadius || 100,
            barThickness: props.barWidth || 10,
            datalabels: {
              color: "#155E75",
              offset:-1,
              anchor: "end",
              align: "top",
              font: {
                size: 14,
                weight:"normal",
              },
              textAlign:"center",
              formatter: (value) => value !== 0 ? value  : ''
            },
          },
        ],
      },
      options: {
        layout:{
          padding:23
        },
        responsive:true,
        maintainAspectRatio:false,
        plugins: {
          tooltip: {
            enabled:false
          },
            legend: {
              display: false,
            },
          },
        scales: {
          y: {
            min:0,
            display: false,
            beginAtZero:false,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },

      },

    });
    return () => {
      myChart.destroy();
    };
  }, [props]);
  
  return props.months && props.values && (
      <canvas height={150} width={20} className="h-full" id="myChart"></canvas>
  );
};

export default SyndicateMonthlyDealsGraph;
