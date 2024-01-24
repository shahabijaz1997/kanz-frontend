import { Bar } from "react-chartjs-2";


const getFormattedData = (data: any) => {
  return {
    labels:data?.labels,
    datasets: [
      {
        label: "Property Investment",
        data: data?.property_investment, 
        backgroundColor: "#0E2E35",
        borderColor: "#0E2E35",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Property Value",
        data: data?.property_net_value, 
        backgroundColor: "#327286",
        borderColor: "#327286",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Startup Investment",
        data: data?.startup_investment, 
        backgroundColor: "#768A2A",
        borderColor: "#768A2A",
        borderWidth: 1,
        stack: "Stack 2",
      },
      {
        label: "Startup Value",
        data: data?.startup_net_value,
        backgroundColor: "#BED36F",
        borderColor: "#BED36F",
        borderWidth: 1,
        stack: "Stack 2",
      },
    ],
  };

}

const options: any = {
  plugins: {
      tooltip: {
        enabled: false,
      },
    legend: {
      align: "end", 
      labels: {
        boxWidth:20,
        font: {
            size: 8, 
          },
        usePointStyle: true,
        pointStyle: "circle",
        size:2 
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        drawOnChartArea: false,
      },
      barThickness: 10,
    },
    y: {
      stacked: true,
    },
  },
  barPercentage: 0.1,
};

const PerfomanceGraph  = ({data}:any) => {
  return <div className="h-[75vh] w-full"><Bar data={getFormattedData(data)} options={options} /></div> ;
};

export default PerfomanceGraph;