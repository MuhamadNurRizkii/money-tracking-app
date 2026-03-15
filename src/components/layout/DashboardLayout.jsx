import { Link, Outlet, useNavigate, useLocation } from "react-router";
// import { greeting } from "../../utils/greeting";
import ThmeToggle from "../landing-page-component/ThemeToggleBtn.jsx";
import { useState } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const menuItems = [
    {
      label: "Profile",
      to: "/dashboard/profile",
      icon: <i className="fa-solid fa-user mr-3 text-lg w-5 text-center"></i>,
    },
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <i className="fa-solid fa-house mr-3 text-lg w-5 text-center"></i>,
    },
    {
      label: "Chart",
      to: "/dashboard/transactions/chart",
      icon: <i className="fa-solid fa-chart-line mr-3 text-lg w-5 text-center"></i>,
    },
    {
      label: "Detail Transaksi",
      to: "/dashboard/transactions",
      icon: <i className="fa-solid fa-clipboard-list mr-3 text-lg w-5 text-center"></i>,
    },
    {
      label: "Tambah Transaksi",
      to: "/dashboard/transactions/add",
      icon: <i className="fa-solid fa-plus mr-3 text-lg w-5 text-center"></i>,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-black transition-colors duration-300">
      {/* Sidebar Desktop */}
      <aside
        className="hidden lg:flex flex-col w-72 
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-white/10
                     p-6 relative transition-colors z-20"
      >
        <div className="mb-10 pl-2">
          <h2 className="text-2xl font-bold text-gradient">
            Money Tracking
          </h2>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center text-sm font-medium rounded-xl p-3 transition-all duration-200 group
                ${
                  isActive
                    ? "bg-gradient-brand text-white shadow-md shadow-[#5044E5]/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <div className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </div>
                {item.label}
              </Link>
            );
          })}
          
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
            <ThmeToggle theme={theme} setTheme={setTheme} />
          </div>
        </nav>

        <button
          className="mt-auto flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all font-medium"
          onClick={handleLogOut}
        >
          <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="w-full flex-1 overflow-x-hidden pb-20 lg:pb-0 relative">
        {/* Animated background subtle gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 p-4 lg:p-8 min-h-screen">
          <Outlet />
        </div>

        {/* Navbar Mobile Container */}
        <div
          className="fixed lg:hidden bottom-0 left-0 right-0 p-4 z-50 pointer-events-none"
        >
          {/* Mobile Dock Glass Card */}
          <div className="pointer-events-auto flex justify-around items-center px-2 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl">
            <Link
              to={"/dashboard"}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === "/dashboard"
                  ? "text-[#5044E5] dark:text-[#4d8cea] scale-110"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <i className="fa-solid fa-house text-xl"></i>
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
              to={"/dashboard/transactions/chart"}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === "/dashboard/transactions/chart"
                  ? "text-[#5044E5] dark:text-[#4d8cea] scale-110"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <i className="fa-solid fa-chart-line text-xl"></i>
              <span className="text-[10px] font-medium">Chart</span>
            </Link>

            {/* tombol + FAB */}
            <div className="relative -top-6">
              <Link
                to={"/dashboard/transactions/add"}
                className="flex items-center justify-center w-14 h-14 
                         rounded-full bg-gradient-brand text-white shadow-lg shadow-[#5044E5]/40
                         hover:shadow-xl hover:shadow-[#5044E5]/60 hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-solid fa-plus text-2xl"></i>
              </Link>
            </div>

            <Link
              to={"/dashboard/transactions"}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === "/dashboard/transactions"
                  ? "text-[#5044E5] dark:text-[#4d8cea] scale-110"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <i className="fa-solid fa-clipboard-list text-xl"></i>
              <span className="text-[10px] font-medium">List</span>
            </Link>

            <Link
              to={"/dashboard/profile"}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === "/dashboard/profile"
                  ? "text-[#5044E5] dark:text-[#4d8cea] scale-110"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <i className="fa-solid fa-user text-xl"></i>
              <span className="text-[10px] font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
