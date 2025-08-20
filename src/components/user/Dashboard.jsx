import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { getDataTransaction } from "../../lib/api/userApi";
import { alertError } from "../../lib/alert";

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

  return (
    <main className="relative p-4 lg:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Keterangan Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Saldo Saat Ini */}
        <div
          className="relative p-6 bg-gradient-to-br from-blue-600 to-cyan-600 
                        rounded-2xl shadow-lg flex flex-col justify-between md:row-span-3"
        >
          <div>
            <h1 className="text-white/90 text-sm font-semibold">
              Saldo Saat Ini
            </h1>
            <p className="text-white text-2xl font-medium mt-2">
              {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                formatCurrency(saldo)
              )}
            </p>
          </div>
          <div className="absolute right-4 bottom-4 bg-white/20 p-3 rounded-full">
            <i className="fa-solid fa-wallet text-white text-xl"></i>
          </div>
        </div>

        {/* Wrapper pemasukan + pengeluaran */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Pemasukkan */}
          <div
            className="p-3 bg-gradient-to-br from-emerald-600 to-green-600 
                          rounded-xl shadow-md relative"
          >
            <h1 className="text-white/90 text-xs font-semibold">Pemasukkan</h1>
            <p className="text-white text-base font-medium mt-1 truncate">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                formatCurrency(total_pemasukan)
              )}
            </p>
            <div className="absolute right-2 bottom-2 bg-white/20 p-2 rounded-full">
              <i className="fa-solid fa-arrow-up text-white text-sm"></i>
            </div>
          </div>

          {/* Pengeluaran */}
          <div
            className="p-3 bg-gradient-to-br from-rose-600 to-red-500 
                          rounded-xl shadow-md relative"
          >
            <h1 className="text-white/90 text-xs font-semibold">Pengeluaran</h1>
            <p className="text-white text-base font-medium mt-1 truncate">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                formatCurrency(total_pengeluaran)
              )}
            </p>
            <div className="absolute right-2 bottom-2 bg-white/20 p-2 rounded-full">
              <i className="fa-solid fa-arrow-down text-white text-sm"></i>
            </div>
          </div>
        </div>
      </div>

      {/* History Transaksi */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Riwayat Transaksi
        </h2>
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md 
                        border border-gray-200 dark:border-gray-700 divide-y dark:divide-gray-700"
        >
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-20 bg-gray-100 dark:bg-gray-700 rounded-xl m-2"
              ></div>
            ))
          ) : recent.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-gray-400">
              Belum ada transaksi.
            </p>
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

              return (
                <div
                  key={id}
                  className="flex justify-between items-center px-4 py-3"
                >
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {type} • {formattedDate}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      type === "pemasukkan"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {amount.toLocaleString("id-ID", {
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
      </div>
    </main>
  );
}
