import { useState } from "react";
import { createTransaction } from "../../lib/api/transactionApi";
import { alertError } from "../../lib/alert";

export default function CreateTransaction() {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
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
                  placeholder-gray-400 dark:placeholder-gray-500"
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
                  placeholder-gray-400 dark:placeholder-gray-500"
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
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 
                p-2 rounded-lg 
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="btn w-full bg-blue-600 text-white hover:bg-blue-500 mt-4"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Transaksi"}
            </button>
          </form>
        </div>

        {showAlert && (
          <div
            role="alert"
            className="alert alert-success absolute top-2 right-14 
            bg-emerald-600 text-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Transaksi berhasil ditambahkan</span>
          </div>
        )}
      </main>
    </div>
  );
}
