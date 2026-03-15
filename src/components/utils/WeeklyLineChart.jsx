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
        borderColor: "#10B981", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10B981",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Pengeluaran",
        data: pengeluaranData,
        borderColor: "#F43F5E", // rose-500
        backgroundColor: "rgba(244, 63, 94, 0.1)",
        pointBackgroundColor: "#F43F5E",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#F43F5E",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#9CA3AF", // gray-400
          font: {
            family: "'Poppins', sans-serif",
            size: 13,
            weight: '500'
          },
          usePointStyle: true,
          boxWidth: 8,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)", // gray-900
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 12,
        titleFont: {
          family: "'Poppins', sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "'Poppins', sans-serif",
          size: 14,
          weight: 'bold'
        },
        displayColors: true,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          callback: function(value) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            }
            return value;
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="h-full w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
