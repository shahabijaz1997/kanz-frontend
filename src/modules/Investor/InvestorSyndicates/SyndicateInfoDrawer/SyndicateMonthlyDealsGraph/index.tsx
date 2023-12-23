import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

const SyndicateMonthlyDealsGraph = (monthsLabel :any, monthsData:any):any => {
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
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        datasets: [
          {
            minBarLength:7,
            label: "Monthly Values",
            data: [4, 2, 3, 2, 1, 3, 3, 0, 7, 4, 2, 3],
            backgroundColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value === 0 ? '#737373' : '#155E75';
            },
            borderColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value === 0 ? '#737373' : '#155E75';
            },
            borderWidth: 3,
            borderRadius: 100,
            barThickness: 10,
            datalabels: {
              color: "#155E75",
              offset:0,
              anchor: "end",
              align: "top",
              font: {
                size: 14,
                weight:"normal",
              },
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
  }, []);

  return (
      <canvas height={150} width={20} className="h-full" id="myChart"></canvas>
  );
};

export default SyndicateMonthlyDealsGraph;
