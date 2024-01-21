
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';




const DoghnutGraph = (props: any) :any => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    console.log(props)

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
                data: [props?.data?.rental_property,
                  props?.data?.non_rental_property],
                backgroundColor: [
                  '#0D485B',
                  '#9FC6D2',
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
