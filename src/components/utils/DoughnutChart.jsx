// DoughnutChart.jsx
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ totalPemasukan, totalPengeluaran }) => {
  const data = {
    labels: ["Pemasukan", "Pengeluaran"],
    datasets: [
      {
        label: "Total",
        data: [parseInt(totalPemasukan), parseInt(totalPengeluaran)],
        backgroundColor: ["#10B981", "#F43F5E"],
        hoverBackgroundColor: ["#34D399", "#FB7185"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
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
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-2 relative">
      <Doughnut data={data} options={options} />
      {totalPemasukan === 0 && totalPengeluaran === 0 && (
         <div className="absolute inset-0 flex items-center justify-center text-gray-400">
             Belum ada data
         </div>
      )}
    </div>
  );
};

export default DoughnutChart;
