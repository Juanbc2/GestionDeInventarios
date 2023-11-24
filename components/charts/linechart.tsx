import React from "react";
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
import { inventoryByQuantityType } from "@/types";

interface LinechartProps {
  totalBalance: string;
  inventory: inventoryByQuantityType[];
}

const Linechart = (props: LinechartProps) => {
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
          bold: true,
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
          font: {
            size: 15,
            bold: true,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Saldo",
          font: {
            size: 15,
            bold: true,
          },
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
        borderColor: "#10b981",
        backgroundColor: "#6366f1",
      },
    ],
  };

  return <Line options={options} data={data} style={{ height: "700px" }} />;
};

export { Linechart };
