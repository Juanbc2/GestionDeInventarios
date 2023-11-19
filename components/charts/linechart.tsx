import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface LinechartProps {
  totalBalance: string;
  inventory: {
    createdAt: string;
    quantity: string;
  }[];
}

export default function Linechart(props: LinechartProps) {
  const { inventory, totalBalance } = props;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Saldo Actual: ${totalBalance} unidades.`,
        color: "#000",
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha",
        },
      },
      y: {
        title: {
          display: true,
          text: "Saldo",
        },
      },
    },
  };

  const data = {
    labels: inventory.map((item) =>
      new Date(item.createdAt).toLocaleDateString().split("/").join("-")
    ),
    datasets: [
      {
        label: "Saldo",
        data: inventory.map((item) => item.quantity),
        borderColor: "#2D8F1D",
        backgroundColor: "#2D8F1D",
      },
    ],
  };

  return <Line options={options} data={data} style={{ height: "700px" }} />;
}
