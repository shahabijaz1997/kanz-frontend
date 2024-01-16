import { Bar } from "react-chartjs-2";

const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Property Investment",
        data: [65, 59, 80, 81, 56, 70, 68, 75, 82, 73, 64, 85], 
        backgroundColor: "#0E2E35",
        borderColor: "#0E2E35",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Property Value",
        data: [28, 48, 40, 19, 86, 35, 42, 51, 38, 49, 31, 62], 
        backgroundColor: "#327286",
        borderColor: "#327286",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Startup Investment",
        data: [20, 45, 55, 75, 81, 60, 50, 63, 70, 65, 58, 78], 
        backgroundColor: "#768A2A",
        borderColor: "#768A2A",
        borderWidth: 1,
        stack: "Stack 2",
      },
      {
        label: "Startup Value",
        data: [10, 25, 35, 65, 51, 40, 30, 45, 55, 42, 38, 58], // Dummy data added
        backgroundColor: "#BED36F",
        borderColor: "#BED36F",
        borderWidth: 1,
        stack: "Stack 2",
      },
    ],
  };

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
    },
    y: {
      stacked: true,
    },
  },
  barPercentage: 0.5,
};

const PerfomanceGraph  = () => {
  return <div className="h-[75vh] w-full"><Bar data={data} options={options} /></div> ;
};

export default PerfomanceGraph;