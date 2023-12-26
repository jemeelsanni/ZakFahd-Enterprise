/* eslint-disable react/prop-types */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DoughnutChart = ({ brandAnalysis }) => {
  console.log(brandAnalysis);
  console.log(brandAnalysis?.map((x) => Number(x.totalproductsperbrand)));
  const data = {
    labels: brandAnalysis?.map((x) => x.brand),
    datasets: [
      {
        label: "Number",
        data: brandAnalysis?.map((x) => Number(x.totalproductsperbrand)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
  };
  return (
    <div className="h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
