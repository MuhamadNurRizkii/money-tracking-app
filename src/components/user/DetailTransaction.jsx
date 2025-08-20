import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  deleteTransaction,
  fetchDetailTransaction,
} from "../../lib/api/transactionApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";

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
    if (!confrim) {
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

  return (
    <div>
      <main className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <h1 className="text-xl font-bold mb-4 relative top-4 left-4 text-gray-900 dark:text-white">
          Detail Transactions
        </h1>

        {loading ? (
          <div className="skeleton h-96 w-full"></div>
        ) : transactions.length > 0 ? (
          <>
            <div className="p-2 mx-auto">
              {/* tampilan desktop */}
              <div className="hidden md:block">
                <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-800">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-3">No</th>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Created at</th>
                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {transactions.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                            {(page - 1) * limit + (index + 1)}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                            {item.amount.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </td>
                          <td
                            className={`px-6 py-4 font-medium ${
                              item.type === "pemasukkan"
                                ? "text-emerald-500"
                                : "text-rose-500"
                            }`}
                          >
                            {item.type}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                            {item.created_at}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                            <div className="flex items-center gap-3">
                              <Link
                                to={`/dashboard/transactions/edit/${item.id}`}
                                className="text-blue-500 hover:text-blue-400 transition-colors duration-200"
                              >
                                <i className="fa-solid fa-pen-to-square text-xl"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-rose-500 hover:text-rose-400 transition-colors duration-200"
                              >
                                <i className="fa-solid fa-trash-can text-xl"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* tampilan mobile */}
              <div className="flex md:hidden flex-col justify-center items-center gap-4 p-4">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4"
                  >
                    {/* Title & Amount */}
                    <div className="flex justify-between items-start">
                      <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                        {item.title}
                      </h2>
                      <span
                        className={`font-semibold ${
                          item.type === "pemasukkan"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {item.amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}
                      </span>
                    </div>

                    {/* Type & Date */}
                    <div className="flex justify-between mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="capitalize">{item.type}</span>
                      <span>
                        {(() => {
                          const [day, month, year] = item.created_at.split("-");
                          return new Date(
                            `${year}-${month}-${day}`
                          ).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          });
                        })()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-3">
                      <Link
                        to={`/dashboard/transactions/edit/${item.id}`}
                        className="text-blue-500 hover:text-blue-400 transition-colors duration-200"
                      >
                        <i className="fa-solid fa-pen-to-square text-sm"></i>{" "}
                        edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-500 hover:text-rose-400 transition-colors duration-200"
                      >
                        <i className="fa-solid fa-trash-can text-sm"></i> delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* pagination control */}
            <div className="text-center mt-5">
              <div className="join dark:border dark:border-white/20">
                {/* Prev Button */}
                <button
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                  className={`join-item btn ${
                    page === 1
                      ? "btn-disabled bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "btn-primary"
                  }`}
                >
                  Prev
                </button>

                {/* Numbered Pages */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`join-item btn ${
                      page === i + 1
                        ? "btn-primary"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  disabled={page === totalPages}
                  onClick={() => goToPage(page + 1)}
                  className={`join-item btn ${
                    page === totalPages
                      ? "btn-disabled bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "btn-primary"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Tidak ada data
          </p>
        )}
      </main>
    </div>
  );
}
