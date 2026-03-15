import { useEffect, useState } from "react";
import { getDataProfile } from "../../lib/api/userApi";
import { alertError } from "../../lib/alert";
import ThemeToggle from "../landing-page-component/ThemeToggleBtn";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // change tema
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  async function fetchDataProfile() {
    try {
      setLoading(true);
      const response = await getDataProfile(token);
      const responBody = await response.json();

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-[#5044E5] loading-lg"></span>
      </div>
    );

  if (!profile)
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-card rounded-3xl max-w-md mx-auto mt-10">
        <i className="fa-solid fa-user-slash text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-500 font-medium">Data profil tidak ditemukan</p>
      </div>
    );

  const fullName = `${profile.first_name} ${profile.last_name}`;
  const totalPemasukkan = Number(profile.total_pemasukkan) || 0;
  const totalPengeluaran = Number(profile.total_pengeluaran) || 0;
  const saldoAkhir = totalPemasukkan - totalPengeluaran;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-8 glass-card rounded-3xl mt-10 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="flex flex-col items-center relative z-10">
        <div className="w-24 h-24 flex items-center justify-center rounded-3xl bg-gradient-brand text-white text-4xl font-bold shadow-xl shadow-[#5044E5]/30 transform rotate-3 hover:rotate-6 transition-transform duration-300">
          <div className="transform -rotate-3">
            {profile?.first_name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">
          {fullName}
        </h1>
        <p className="text-[#5044E5] dark:text-[#4d8cea] font-medium mt-1">
          @{profile.username}
        </p>
      </div>

      {/* Info Keuangan */}
      <div className="mt-8 space-y-4 relative z-10">
        <div className="flex lg:hidden items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Tema Gelap
          </span>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
            <div className="text-emerald-600 dark:text-emerald-400 mb-1">
              <i className="fa-solid fa-arrow-trend-up"></i>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              Pemasukan
            </p>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
              Rp {totalPemasukkan.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
            <div className="text-rose-600 dark:text-rose-400 mb-1">
              <i className="fa-solid fa-arrow-trend-down"></i>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              Pengeluaran
            </p>
            <p className="font-semibold text-rose-600 dark:text-rose-400 truncate">
              Rp {totalPengeluaran.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div className="bg-gradient-brand text-white rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-[#5044E5]/20 mt-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <span className="font-medium text-white/90">Saldo Akhir</span>
          </div>
          <span className="font-bold text-xl">
            Rp {saldoAkhir.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8 relative z-10">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full py-4 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-2xl font-bold transition-colors flex justify-center items-center gap-2"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </motion.div>
  );
}
