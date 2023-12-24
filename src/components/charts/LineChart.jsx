import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = () => {
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
      "November",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40, 42, 56, 80],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "#0000FF",
        pointStyle: "rect", // Set point style to 'rect' for square points
        pointRadius: 5, // Adjust the size of the square points
        pointHoverRadius: 7, // Adjust the size when hovering
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          lineWidth: 2, // Thicker grid lines for the x-axis
        },
      },
      y: {
        grid: {
          display: true,
          lineWidth: 2, // Thicker grid lines for the y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <div className="lg:w-[70%] w-full h-full rounded-[8px] p-[24px] bg-white">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
