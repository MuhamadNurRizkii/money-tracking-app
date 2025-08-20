import { useEffect, useState } from "react";
import { getDataProfile } from "../../lib/api/userApi";
import { alertError } from "../../lib/alert";
import ThemeToggle from "../landing-page-component/ThemeToggleBtn";
import { useNavigate } from "react-router";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // change tema
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  async function fetchDataProfile() {
    try {
      setLoading(true);
      const response = await getDataProfile(token);
      const responBody = await response.json();
      console.log(responBody);

      if (response.status === 200) {
        setProfile(responBody.data);
      } else {
        alertError(responBody.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDataProfile().then(() => console.log("fetch data berhasil"));
  }, [token]);
  console.log(profile);

  if (loading)
    return (
      <p className="text-center mt-10">
        Loading...{" "}
        <span className="loading loading-spinner loading-sm pl-5"></span>
      </p>
    );
  if (!profile)
    return <p className="text-center mt-10">Data profil tidak ditemukan</p>;

  const fullName = `${profile.first_name} ${profile.last_name}`;
  const totalPemasukkan = Number(profile.total_pemasukkan) || 0;
  const totalPengeluaran = Number(profile.total_pengeluaran) || 0;
  const saldoAkhir = totalPemasukkan - totalPengeluaran;

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl hover:shadow-2xl rounded-2xl mt-10 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-400 text-white text-3xl font-bold shadow-md">
          {profile?.first_name?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
          {fullName}
        </h1>
        <p className="text-gray-400 text-sm">@{profile.username}</p>
      </div>

      {/* Info Keuangan */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 pl-6">Tema</span>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            💰 Pemasukkan
          </span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            Rp {totalPemasukkan.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            💸 Pengeluaran
          </span>
          <span className="font-semibold text-red-500 dark:text-red-400">
            Rp {totalPengeluaran.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-4 flex items-center justify-between shadow">
          <span className="font-medium">Saldo Akhir</span>
          <span className="font-semibold text-lg">
            Rp {saldoAkhir.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
