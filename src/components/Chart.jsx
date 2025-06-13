import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [income, expenses],
        backgroundColor: ["#22c55e", "#ef4444"], // Tailwind green & red
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Income vs Expenses</h2>
      <Pie data={data} />
    </div>
  );
};

export default Chart;
