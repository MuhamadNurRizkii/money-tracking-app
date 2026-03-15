import { useState } from "react";
import { createTransaction } from "../../lib/api/transactionApi";
import { alertError } from "../../lib/alert";
import { motion } from "motion/react";

export default function CreateTransaction() {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createTransaction(token, title, amount, type);
      const responBody = await response.json();

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1500);
        setTitle("");
        setAmount("");
        setType("");
      } else {
        alertError(responBody.error);
      }
    } catch (error) {
      alertError("Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-8 max-w-4xl mx-auto"
    >
      {/* container form */}
      <div className="glass-card w-full p-6 lg:p-10 mx-auto mt-6 rounded-3xl relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Tambah Transaksi
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Catat pemasukan atau pengeluaran baru Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="mb-2 pl-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Judul Transaksi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fa-solid fa-pen"></i>
                  </div>
                  <input
                    type="text"
                    id="title"
                    placeholder="Contoh: Gaji bulanan, Makan siang..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                    bg-gray-50/50 dark:bg-gray-800/50 
                    text-gray-800 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                    placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col">
                <label
                  htmlFor="amount"
                  className="mb-2 pl-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Nominal (Rp)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fa-solid fa-money-bill-wave"></i>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 
                    bg-gray-50/50 dark:bg-gray-800/50 
                    text-gray-800 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-[#5044E5]/50 focus:border-[#5044E5]
                    placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                    required
                    autoComplete="off"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col">
              <label className="mb-3 pl-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tipe Transaksi
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border ${type === 'pemasukkan' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-xl p-4 flex items-center gap-3 transition-colors duration-200`}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="pemasukkan" 
                    checked={type === 'pemasukkan'}
                    onChange={(e) => setType(e.target.value)}
                    className="hidden" 
                    required
                  />
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${type === 'pemasukkan' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                  <div>
                    <span className={`block font-semibold ${type === 'pemasukkan' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>Pemasukan</span>
                  </div>
                </label>

                <label className={`cursor-pointer border ${type === 'pengeluaran' ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-xl p-4 flex items-center gap-3 transition-colors duration-200`}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="pengeluaran" 
                    checked={type === 'pengeluaran'}
                    onChange={(e) => setType(e.target.value)}
                    className="hidden" 
                    required
                  />
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${type === 'pengeluaran' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                    <i className="fa-solid fa-arrow-trend-down"></i>
                  </div>
                  <div>
                    <span className={`block font-semibold ${type === 'pengeluaran' ? 'text-rose-700 dark:text-rose-400' : 'text-gray-700 dark:text-gray-300'}`}>Pengeluaran</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 mt-8 border-t border-gray-100 dark:border-gray-800">
              <button
                type="submit"
                className="w-full md:w-auto md:px-8 bg-gradient-brand text-white font-medium py-3 rounded-xl 
                       shadow-lg shadow-[#5044E5]/30 hover:shadow-[#5044E5]/50
                       hover:-translate-y-0.5 active:translate-y-0.5 
                       transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <i className="fa-solid fa-check"></i>
                    Simpan Transaksi
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          role="alert"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 lg:bottom-10 z-50
          bg-emerald-50 dark:bg-gray-800 border-emerald-500 border
          text-emerald-700 dark:text-emerald-400 shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex justify-center items-center text-white shrink-0">
            <i className="fa-solid fa-check"></i>
          </div>
          <span className="font-semibold">Transaksi berhasil ditambahkan</span>
        </motion.div>
      )}
    </motion.div>
  );
}
