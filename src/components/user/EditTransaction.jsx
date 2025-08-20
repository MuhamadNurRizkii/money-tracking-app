import { useParams } from "react-router";
import {
  fetchTransactionById,
  updateTransactions,
} from "../../lib/api/transactionApi";
import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert";
import { useEffect } from "react";

export default function EditTransaction() {
  const params = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");

  async function fetchDataTransaction() {
    try {
      setLoading(true);
      const response = await fetchTransactionById(token, params.id);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        setTitle(responseBody.data.title);
        setAmount(responseBody.data.amount);
        setType(responseBody.data.type);
      } else {
        alertError(responseBody.message);
      }
    } catch (error) {
      console.log("Terjadi kesalahan server:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await updateTransactions(token, params.id, {
      title,
      amount,
      type,
    });

    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      alertSuccess(responseBody.message);
    } else {
      alertError(responseBody.error);
    }
  }

  useEffect(() => {
    fetchDataTransaction().then(() =>
      console.log("fetch data transaction successfully")
    );
  }, []);

  return (
    <div>
      <main className="p-4">
        {/* container form */}
        <div
          className="container-form w-full p-6 mx-auto mt-10 
        bg-white dark:bg-gray-900 
        rounded-xl shadow-md 
        transition-colors duration-300"
        >
          <h1
            className="text-2xl text-center font-bold mb-6 
          text-gray-800 dark:text-white"
          >
            Tambah Transaksi
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Title & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="mb-2 pl-1 text-sm font-medium 
                text-gray-600 dark:text-gray-300"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Masukkan judul transaksi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 
                p-2 rounded-lg 
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                placeholder-gray-400 dark:placeholder-gray-500 
                transition-colors duration-300"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="amount"
                  className="mb-2 pl-1 text-sm font-medium 
                text-gray-600 dark:text-gray-300"
                >
                  Nominal
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Masukkan nominal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 
                p-2 rounded-lg 
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                placeholder-gray-400 dark:placeholder-gray-500 
                transition-colors duration-300"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col mt-4">
              <label
                htmlFor="type"
                className="mb-2 pl-1 text-sm font-medium 
              text-gray-600 dark:text-gray-300"
              >
                Tipe Transaksi
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 
              p-2 rounded-lg 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-100 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              transition-colors duration-300"
                required
              >
                <option value="">Pilih tipe transaksi</option>
                <option value="pemasukkan">Pemasukkan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full bg-blue-600 text-white hover:bg-blue-500 mt-4 
            rounded-lg py-2 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Transaksi"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
