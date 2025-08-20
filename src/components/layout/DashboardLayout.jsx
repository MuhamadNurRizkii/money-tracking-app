import { Link, Outlet, useNavigate } from "react-router";
// import { greeting } from "../../utils/greeting";
import ThmeToggle from "../landing-page-component/ThemeToggleBtn.jsx";
import { useState } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
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
      icon: <i className="fa-solid fa-user mr-2"></i>,
    },
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <i className="fa-solid fa-house mr-2"></i>,
    },
    {
      label: "Chart",
      to: "/dashboard/transactions/chart",
      icon: <i className="fa-solid fa-chart-line mr-2"></i>,
    },
    {
      label: "Detail Transaksi",
      to: "/dashboard/transactions",
      icon: <i className="fa-solid fa-clipboard-list mr-2"></i>,
    },
    {
      label: "Tambah Transaksi",
      to: "/dashboard/transactions/add",
      icon: <i className="fa-solid fa-plus mr-2"></i>,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar Desktop */}
      <aside
        className="hidden lg:flex flex-col w-64 
                     bg-gradient-to-br from-blue-600 via-blue-400 to-blue-500 
                     dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                     p-6 relative transition-colors"
      >
        <h2 className="text-2xl font-bold text-white dark:text-blue-400 mb-10">
          Money Tracking
        </h2>
        <nav className="flex flex-col justify-center gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 text-sm rounded p-2 transition-all
              ${
                location.pathname === item.to
                  ? "bg-white text-blue-600 dark:bg-blue-600 dark:text-white"
                  : "text-white dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="flex justify-center mt-2">
            <ThmeToggle theme={theme} setTheme={setTheme} />
          </div>
        </nav>
        <button
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-white cursor-pointer hover:bg-white hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white transition-all"
          onClick={handleLogOut}
        >
          <i className="fa-solid fa-arrow-left"></i> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="w-full overflow-x-hidden pb-16">
        {/* Navbar Mobile */}
        <Outlet />

        <div
          className="fixed lg:hidden bottom-0 left-0 right-0 
                      border-t border-slate-300 dark:border-gray-700 
                      bg-white dark:bg-gray-800 
                      shadow-md z-50 transition-colors"
        >
          <div className="dock dark:bg-gray-800 relative flex justify-around items-center py-2">
            <Link
              to={"/dashboard"}
              className={`flex flex-col items-center ${
                location.pathname === "/dashboard"
                  ? "text-blue-600 dark:text-blue-400 underline underline-offset-1"
                  : "text-black dark:text-gray-300"
              } hover:text-blue-500 dark:hover:text-blue-300`}
            >
              <i className="fa-solid fa-house text-[1.2em]"></i>
              <span className="dock-label">Home</span>
            </Link>

            <Link
              to={"/dashboard/transactions/chart"}
              className={`flex flex-col items-center ${
                location.pathname === "/dashboard/transactions/chart"
                  ? "text-blue-600 dark:text-blue-400 underline underline-offset-1"
                  : "text-black dark:text-gray-300"
              } hover:text-blue-500 dark:hover:text-blue-300`}
            >
              <i className="fa-solid fa-chart-line text-[1.2em]"></i>
              <span className="dock-label">Chart</span>
            </Link>

            {/* tombol + */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <Link
                to={"/dashboard/transactions/add"}
                className="flex items-center justify-center w-14 h-14 
                         rounded-full bg-blue-600 text-white shadow-lg 
                         hover:bg-blue-700 dark:hover:bg-blue-500 transition"
              >
                <i className="fa-solid fa-plus text-2xl"></i>
              </Link>
            </div>

            <Link
              to={"/dashboard/transactions"}
              className={`flex flex-col items-center ${
                location.pathname === "/dashboard/transactions"
                  ? "text-blue-600 dark:text-blue-400 underline underline-offset-1"
                  : "text-black dark:text-gray-300"
              } hover:text-blue-500 dark:hover:text-blue-300`}
            >
              <i className="fa-solid fa-clipboard-list text-[1.2em]"></i>
              <span className="dock-label">Transactions</span>
            </Link>

            <Link
              to={"/dashboard/profile"}
              className={`flex flex-col items-center ${
                location.pathname === "/dashboard/profile"
                  ? "text-blue-600 dark:text-blue-400 underline underline-offset-1"
                  : "text-black dark:text-gray-300"
              } hover:text-blue-500 dark:hover:text-blue-300`}
            >
              <i className="fa-solid fa-user text-[1.2em]"></i>
              <span className="dock-label">Profile</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
