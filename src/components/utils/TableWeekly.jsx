export function TableWeekly({ data }) {
  return (
    <div className="overflow-x-auto lg:hidden rounded-2xl shadow-md bg-white dark:bg-gray-800">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Tanggal</th>
            <th className="px-6 py-3">Pemasukkan</th>
            <th className="px-6 py-3">Pengeluaran</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                {item.date}
              </td>
              <td
                className={`px-6 py-4  font-semibold ${
                  item.pemasukkan === 0
                    ? "text-center text-gray-800"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {item.pemasukkan === 0
                  ? "-"
                  : item.pemasukkan.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
              </td>
              <td
                className={`px-6 py-4 font-semibold ${
                  item.pengeluaran === 0
                    ? "text-center text-gray-800"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {item.pengeluaran === 0
                  ? "-"
                  : item.pengeluaran.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
