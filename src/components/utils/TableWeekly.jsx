export function TableWeekly({ data }) {
  return (
    <div className="overflow-x-auto w-full max-h-96 custom-scrollbar">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50/50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold sticky top-0 backdrop-blur-md">
          <tr>
            <th className="px-6 py-4">Tanggal</th>
            <th className="px-6 py-4">Pemasukkan</th>
            <th className="px-6 py-4">Pengeluaran</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                {(() => {
                  const d = new Date(item.date);
                  return d.toLocaleDateString("id-ID", {
                    day: "2-digit", month: "short", year: "numeric",
                  });
                })()}
              </td>
              <td
                className={`px-6 py-4 font-bold ${
                  item.pemasukkan === 0
                    ? "text-gray-400 dark:text-gray-600"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {item.pemasukkan === 0
                  ? "-"
                  : `+ ${item.pemasukkan.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}`}
              </td>
              <td
                className={`px-6 py-4 font-bold ${
                  item.pengeluaran === 0
                    ? "text-gray-400 dark:text-gray-600"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {item.pengeluaran === 0
                  ? "-"
                  : `- ${item.pengeluaran.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
