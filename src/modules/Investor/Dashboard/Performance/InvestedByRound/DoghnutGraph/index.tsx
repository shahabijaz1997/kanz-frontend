
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';




const DoghnutGraph = ({}: any) :any => {

    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
  
        if (ctx) {
            if (Chart.getChart(ctx)) {
                Chart.getChart(ctx)?.destroy();
              }
          const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                  '#0D485B',
                  '#155E75',
                  '#4D8697',
                  '#9FC6D2',
                  '#E1EFF3',
                ],
                borderWidth: 0,
              }],
            },
            options: {              
              responsive: true,
              maintainAspectRatio: true, 
              plugins: {
                tooltip: {
                  enabled: false,
                },
              },
            },
          });
        }
      }
    }, []);
  
    return (
      <div>
        <canvas ref={chartRef} ></canvas>
      </div>
    );
    

};
export default DoghnutGraph;
