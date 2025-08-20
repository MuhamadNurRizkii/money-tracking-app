import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

export const WeeklyLineChart = ({ data }) => {
  // ambil 7 hari terakhir
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ambil label tanggal
  const labels = sortedData.map((item) => {
    const d = new Date(item.date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  });

  const pemasukkanData = sortedData.map((item) => item.pemasukkan);
  const pengeluaranData = sortedData.map((item) => item.pengeluaran);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Pemasukkan",
        data: pemasukkanData,
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Pengeluaran",
        data: pengeluaranData,
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="md:h-[400px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
