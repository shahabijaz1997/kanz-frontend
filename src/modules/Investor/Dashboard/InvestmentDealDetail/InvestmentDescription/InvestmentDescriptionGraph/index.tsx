import { Bar } from 'react-chartjs-2';
const formatData = (data: any) => {
  return {
    labels: data?.labels,
    datasets: [
      {
        label: 'Investment',
        data: data?.invested_amount,
        backgroundColor: '#0F3743',
        borderColor: '#0F3743',
        borderWidth: 1,
      },
      {
        label: 'Net Value',
        data: data?.net_value,
        backgroundColor: '#327286',
        borderColor: '#327286',
        borderWidth: 1,
      },
    ],
  };
} 


const options :any = {
  plugins: {
    legend: {
      align: "end",
      labels: {
        boxWidth: 20,
        font: {
          size: 10,
        },
        usePointStyle: true,
        pointStyle: "circle",
        size: 2,
      },
    },
  },
  scales: {
    x: {
      categoryPercentage: 1,
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      stacked: false, 
      beginAtZero: true,
      ticks: {
        callback: (value: number) => `$${value}`, 
      },
    },
  },
  barPercentage: 0.4,
};
const InvestmentDescriptionGraph = ({data}:any) => {
  return (
    <div className='w-full mt-5 px-3 flex justify-center'>
      <Bar data={formatData(data)} options={options} />
    </div>
  );
};

export default InvestmentDescriptionGraph;