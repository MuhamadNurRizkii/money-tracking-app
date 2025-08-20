import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function MonthlyChart({ data }) {
  const labels = data.map((item) => {
    if (!item.month || typeof item.month !== "string") return "Invalid"; // handle error

    const [year, month] = item.month.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "pemasukkan",
        data: data.map((item) => item.pemasukkan),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        categoryPercentage: 0.5, // biar gak terlalu lebar
        barPercentage: 0.6,
      },
      {
        label: "pengeluaran",
        data: data.map((item) => item.pengeluaran),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        categoryPercentage: 0.5, // biar gak terlalu lebar
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Laporan Bulanan",
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
