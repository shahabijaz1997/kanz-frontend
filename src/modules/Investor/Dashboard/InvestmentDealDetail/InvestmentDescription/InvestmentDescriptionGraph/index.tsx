import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Investment',
        data: [21,32,43,12,65,75, 56, 32, 43, 12, 65, 75],
        backgroundColor: '#0F3743',
        borderColor: '#0F3743',
        borderWidth: 1,
      },
      {
        label: 'Net Value',
        data: [21,32,43,12,65,75, 56, 32, 43, 12, 65, 75],
        backgroundColor: '#327286',
        borderColor: '#327286',
        borderWidth: 1,
      },
      // Add more datasets as needed
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        align: "end", 
        labels: {
          boxWidth:20,
          font: {
              size: 10, 
            },
          usePointStyle: true,
          pointStyle: "circle",
          size:2 
        },
      },
    },
    scales: {
      x: {
      categoryPercentage: 1,
        stacked: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        min: 0,
        max: 160,
        ticks: {
          callback: (value:number) => `$${value}`, // Add dollar sign to label
        },
      },
    },
    barPercentage: 0.4,
  };

  const InvestmentDescriptionGraph : any = () => {
    return (
       <div className='w-full mt-5 px-3 flex justify-center'><Bar data={data} options={options} /></div> 
      );
}

export default InvestmentDescriptionGraph;