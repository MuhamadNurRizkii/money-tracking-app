import { useEffect, useState } from "react";
import { fetchTransactionsByDate } from "../../lib/api/transactionApi";
import { alertError } from "../../lib/alert";
import { WeeklyLineChart } from "../utils/WeeklyLineChart";
import MonthlyChart from "../utils/MonthlyChart";
import { TableWeekly } from "../utils/TableWeekly";
import { TableMonthly } from "../utils/TableMonthly";
import { useNavigate } from "react-router";

export default function ChartPage() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("mingguan");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(transactions);

  async function fecthTransactionsForChart() {
    const response = await fetchTransactionsByDate(token, type);
    const responseBody = await response.json();

    if (response.status === 200) {
      setTransactions(responseBody.data);
    } else {
      alertError(responseBody.message);
      navigate("/login");
    }
    setLoading(false);
  }

  useEffect(() => {
    fecthTransactionsForChart().then(() => console.log("fetch berhasil"));
  }, [type]);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex max-sm:flex-col items-center justify-between">
          <h1 className="text-2xl max-sm:mb-8 font-bold text-gray-800 dark:text-white">
            Laporan Keuangan
          </h1>

          {/* Toggle button */}
          <div className="flex gap-2 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-1">
            <button
              onClick={() => setType("mingguan")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                type === "mingguan"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setType("bulanan")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                type === "bulanan"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Bulanan
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 md:p-6 mb-8">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Memuat data...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Tidak ada data untuk ditampilkan
            </p>
          ) : type === "mingguan" ? (
            <WeeklyLineChart data={transactions} />
          ) : (
            <MonthlyChart data={transactions} />
          )}
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Memuat data...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Tidak ada data untuk ditampilkan
          </p>
        ) : type === "mingguan" ? (
          <TableWeekly data={transactions} />
        ) : (
          <TableMonthly data={transactions} />
        )}
      </div>
    </div>
  );
}
