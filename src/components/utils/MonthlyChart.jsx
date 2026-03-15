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
        label: "Pemasukkan",
        data: data.map((item) => item.pemasukkan),
        backgroundColor: "#10B981", // emerald-500
        hoverBackgroundColor: "#34D399",
        borderRadius: 6,
        categoryPercentage: 0.6,
        barPercentage: 0.7,
      },
      {
        label: "Pengeluaran",
        data: data.map((item) => item.pengeluaran),
        backgroundColor: "#F43F5E", // rose-500
        hoverBackgroundColor: "#FB7185",
        borderRadius: 6,
        categoryPercentage: 0.6,
        barPercentage: 0.7,
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
      }
    },
    scales: {
      x: {
        grid: { display: false },
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
      <Bar data={chartData} options={options} />
    </div>
  );
}
