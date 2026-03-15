import { useEffect, useState } from "react";
import { fetchTransactionsByDate } from "../../lib/api/transactionApi";
import { alertError } from "../../lib/alert";
import { WeeklyLineChart } from "../utils/WeeklyLineChart";
import MonthlyChart from "../utils/MonthlyChart";
import { TableWeekly } from "../utils/TableWeekly";
import { TableMonthly } from "../utils/TableMonthly";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export default function ChartPage() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("mingguan");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function fecthTransactionsForChart() {
    setLoading(true);
    try {
      const response = await fetchTransactionsByDate(token, type);
      const responseBody = await response.json();

      if (response.status === 200) {
        setTransactions(responseBody.data || []);
      } else {
        alertError(responseBody.message);
        navigate("/login");
      }
    } catch (error) {
      alertError("Gagal memuat data chart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthTransactionsForChart().then(() => console.log("fetch berhasil"));
  }, [type]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 lg:p-8 min-h-[80vh] relative"
    >
      {/* Decorative background gradients */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              Laporan Keuangan
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-500 dark:text-gray-400 mt-2 font-medium"
            >
              Analisis pemasukan dan pengeluaran Anda
            </motion.p>
          </div>

          {/* Toggle button */}
          <motion.div
            variants={itemVariants}
            className="flex bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-sm rounded-2xl p-1.5 border border-gray-200 dark:border-white/10 w-full sm:w-auto self-stretch"
          >
            <button
              onClick={() => setType("mingguan")}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                type === "mingguan"
                  ? "text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {type === "mingguan" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-brand rounded-xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              Mingguan
            </button>
            <button
              onClick={() => setType("bulanan")}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                type === "bulanan"
                  ? "text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {type === "bulanan" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-brand rounded-xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              Bulanan
            </button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-3xl h-[400px] flex items-center justify-center border border-gray-100 dark:border-white/5 mb-8"
            >
              <span className="loading loading-spinner text-[#5044E5] loading-lg"></span>
            </motion.div>
          ) : transactions.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-3xl h-[400px] flex flex-col items-center justify-center border border-gray-100 dark:border-white/5 mb-8 text-center px-4"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-chart-pie text-3xl text-gray-300 dark:text-gray-600"></i>
              </div>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Tidak ada data
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Belum ada transaksi untuk periode ini.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Chart Card */}
              <div className="glass-card rounded-3xl p-4 md:p-8 border border-gray-100 dark:border-white/5">
                <div className="h-[300px] sm:h-[400px] w-full relative">
                  {type === "mingguan" ? (
                    <WeeklyLineChart data={transactions} />
                  ) : (
                    <MonthlyChart data={transactions} />
                  )}
                </div>
              </div>

              {/* Table Data */}
              <div className="glass-card rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 pb-2">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800/50">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Rincian Data
                  </h2>
                </div>
                {type === "mingguan" ? (
                  <TableWeekly data={transactions} />
                ) : (
                  <TableMonthly data={transactions} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
