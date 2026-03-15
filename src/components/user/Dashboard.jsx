import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { getDataTransaction } from "../../lib/api/userApi";
import { alertError } from "../../lib/alert";
import { motion } from "motion/react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const formatCurrency = (value) =>
    Number(value).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await getDataTransaction(token);
      const data = await response.json();

      if (response.status === 200) {
        setTransactions(data.data || {});
      } else {
        await alertError(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchTransactions().then(() => console.log("fetch data berhasil"));
  }, [fetchTransactions]);

  const {
    total_pemasukan = 0,
    total_pengeluaran = 0,
    recent = [],
  } = transactions;

  const saldo = total_pemasukan - total_pengeluaran;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.main 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative max-w-5xl mx-auto"
    >
      <div className="mb-8">
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 dark:text-white">
          Overview
        </motion.h1>
        <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400 mt-1">
          Laporan ringkas keuangan Anda
        </motion.p>
      </div>

      {/* Keterangan Saldo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Saldo Saat Ini */}
        <motion.div
          variants={itemVariants}
          className="relative p-6 lg:p-8 bg-gradient-brand
                        rounded-3xl shadow-lg shadow-[#5044E5]/30 flex flex-col justify-between lg:col-span-2 overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-lg"></div>
          
          <div className="relative z-10">
            <h2 className="text-white/80 font-medium tracking-wide">
              Total Saldo
            </h2>
            <p className="text-white text-4xl lg:text-5xl font-bold mt-2">
              {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                formatCurrency(saldo)
              )}
            </p>
          </div>
          <div className="absolute right-6 lg:right-8 bottom-6 lg:bottom-8 bg-white/20 backdrop-blur-md p-4 rounded-2xl">
            <i className="fa-solid fa-wallet text-white text-2xl"></i>
          </div>
        </motion.div>

        {/* Wrapper pemasukan + pengeluaran */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
          {/* Pemasukkan */}
          <motion.div
            variants={itemVariants}
            className="p-5 glass-card rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                <i className="fa-solid fa-arrow-trend-up"></i>
              </div>
              <h2 className="text-gray-600 dark:text-gray-400 font-medium text-sm">Pemasukan</h2>
            </div>
            <p className="text-gray-800 dark:text-white text-xl font-bold truncate">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                formatCurrency(total_pemasukan)
              )}
            </p>
          </motion.div>

          {/* Pengeluaran */}
          <motion.div
            variants={itemVariants}
            className="p-5 glass-card rounded-3xl relative overflow-hidden group hover:border-rose-500/50 transition-colors duration-300"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-colors"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded-xl text-rose-600 dark:text-rose-400">
                <i className="fa-solid fa-arrow-trend-down"></i>
              </div>
              <h2 className="text-gray-600 dark:text-gray-400 font-medium text-sm">Pengeluaran</h2>
            </div>
            <p className="text-gray-800 dark:text-white text-xl font-bold truncate">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                formatCurrency(total_pengeluaran)
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* History Transaksi */}
      <motion.div variants={itemVariants} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Riwayat Transaksi
          </h2>
          <button onClick={() => navigate('/dashboard/transactions')} className="text-sm font-medium text-[#5044E5] dark:text-[#4d8cea] hover:underline">
            Lihat Semua
          </button>
        </div>
        
        <div
          className="glass-card rounded-3xl divide-y divide-gray-100 dark:divide-gray-800/50 overflow-hidden"
        >
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-20 bg-gray-100/50 dark:bg-gray-800/50 m-2 rounded-2xl"
              ></div>
            ))
          ) : recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <i className="fa-solid fa-receipt text-4xl mb-3 opacity-50"></i>
              <p>Belum ada transaksi.</p>
            </div>
          ) : (
            recent.map(({ id, title, amount, type, created_at }) => {
              const [day, month, year] = created_at.split("-");
              const formattedDate = new Date(
                `${year}-${month}-${day}`
              ).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              
              const isIncome = type === "pemasukkan";

              return (
                <div
                  key={id}
                  className="flex justify-between items-center p-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${
                      isIncome 
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                        : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                    }`}>
                      <i className={`fa-solid ${isIncome ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      isIncome
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {isIncome ? "+" : "-"} {amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.main>
  );
}
