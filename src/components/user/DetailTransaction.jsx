import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  deleteTransaction,
  fetchDetailTransaction,
} from "../../lib/api/transactionApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { motion } from "motion/react";

export default function DetailTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [seacrhParams, setSeacrhParams] = useSearchParams();
  const page = parseInt(seacrhParams.get("page")) || 1;
  const limit = 5; // jumlah data per halaman

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function fecthTransaction() {
    try {
      setLoading(true);
      const response = await fetchDetailTransaction(token, page, limit);
      const responseBody = await response.json();

      if (response.status === 200) {
        setTransactions(responseBody.data.data);
        setTotalPages(responseBody.data.totalPages || 1);
      } else {
        alertError(responseBody.message || "Terjadi kesalahan");
        navigate("/login");
      }
    } catch (error) {
      console.log("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthTransaction().then(() => console.log("fetch data sukses"));
  }, [page]);

  const goToPage = (pageNumber) => {
    setSeacrhParams({ page: pageNumber });
  };

  async function handleDelete(id) {
    const confrim = await alertConfirm();
    if (!confrim.isConfirmed) {
      return;
    }

    const response = await deleteTransaction(id, token);
    const responseBody = await response.json();

    if (response.status === 200) {
      await alertSuccess(responseBody.message);
      await fecthTransaction();
    } else {
      await alertError(responseBody.error);
    }
  }

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
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 lg:p-8 max-w-6xl mx-auto min-h-[80vh] relative"
    >
      {/* Decorative background gradients */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mb-8 pl-2">
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-gray-800 dark:text-white"
        >
          Detail Transaksi
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-gray-500 dark:text-gray-400 mt-2 font-medium"
        >
          Daftar seluruh riwayat transaksi Anda
        </motion.p>
      </div>

      {loading ? (
        <div className="glass-card rounded-3xl p-6 h-[500px] flex items-center justify-center">
          <span className="loading loading-spinner text-[#5044E5] loading-lg"></span>
        </div>
      ) : transactions.length > 0 ? (
        <motion.div variants={itemVariants}>
          {/* tampilan desktop */}
          <div className="hidden md:block glass-card rounded-3xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-3xl">No</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Created at</th>
                    <th className="px-6 py-4 rounded-tr-3xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50 glass-card bg-transparent border-0">
                  {transactions.map((item, index) => {
                    const isIncome = item.type === "pemasukkan";
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group"
                      >
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {(page - 1) * limit + (index + 1)}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                          {item.title}
                        </td>
                        <td
                          className={`px-6 py-4 font-bold ${isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-100"}`}
                        >
                          {isIncome ? "+" : "-"}{" "}
                          {item.amount.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isIncome
                                ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-rose-100/50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {(() => {
                            const [day, month, year] =
                              item.created_at.split("-");
                            return new Date(
                              `${year}-${month}-${day}`,
                            ).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            });
                          })()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              to={`/dashboard/transactions/edit/${item.id}`}
                              className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                              title="Edit"
                            >
                              <i className="fa-solid fa-pen text-xs"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* tampilan mobile */}
          <div className="flex md:hidden flex-col gap-4 mb-8">
            {transactions.map((item) => {
              const isIncome = item.type === "pemasukkan";
              const [day, month, year] = item.created_at.split("-");
              const formattedDate = new Date(
                `${year}-${month}-${day}`,
              ).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={item.id}
                  className="glass-card w-full rounded-2xl p-5 hover:border-[#5044E5]/30 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                          isIncome
                            ? "bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-rose-100/50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}
                      >
                        <i
                          className={`fa-solid ${isIncome ? "fa-arrow-trend-up" : "fa-arrow-trend-down"}`}
                        ></i>
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800 dark:text-gray-200">
                          {item.title}
                        </h2>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formattedDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Link
                        to={`/dashboard/transactions/edit/${item.id}`}
                        className="w-7 h-7 rounded-full flex flex-col items-center justify-center text-gray-400 hover:text-[#5044E5] hover:bg-blue-50 dark:hover:bg-[#5044E5]/10 transition-colors"
                      >
                        <i className="fa-solid fa-pen text-xs"></i>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-7 h-7 rounded-full flex flex-col items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/50">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isIncome
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span
                      className={`font-bold text-lg ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {isIncome ? "+" : "-"}{" "}
                      {item.amount.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* pagination control */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                    page === i + 1
                      ? "bg-gradient-brand text-white shadow-md shadow-[#5044E5]/30"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-receipt text-4xl text-gray-300 dark:text-gray-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Belum Ada Transaksi
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
            Mulai catat pemasukan dan pengeluaran Anda untuk melihat riwayatnya
            disini.
          </p>
          <Link
            to="/dashboard/transactions/add"
            className="px-6 py-3 bg-gradient-brand text-white font-medium rounded-xl shadow-lg shadow-[#5044E5]/30 hover:shadow-[#5044E5]/50 hover:-translate-y-0.5 transition-all"
          >
            <i className="fa-solid fa-plus mr-2"></i> Tambah Transaksi
          </Link>
        </motion.div>
      )}
    </motion.main>
  );
}
