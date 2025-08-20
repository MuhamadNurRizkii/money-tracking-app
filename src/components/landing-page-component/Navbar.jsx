import { useState } from "react";
import { Link } from "react-router";
import ThmeToggle from "./ThemeToggleBtn";
import { motion } from "motion/react";

export default function Navbar({ theme, setTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70"
    >
      {/* judul */}
      <h1 className={`text-xl font-bold text-gray-700 dark:text-white`}>
        Money Tracking
      </h1>

      <div
        className={`text-gray-700 dark:text-white sm:text-sm ${
          !sidebarOpen
            ? "max-sm:w-0 overflow-hidden"
            : "max-sm:w-60 max-sm:pl-10"
        } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primaryy dark:max-sm:bg-gray-900/90 dark:border dark:border-gray-100/30 md:dark:border-0 max-sm:dark:backdrop-blur-2xl max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 sm:hidden text-2xl cursor-pointer active:scale-75 transition-transform"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <a
          onClick={() => setSidebarOpen(false)}
          href="#"
          className="sm:hover:border-b"
        >
          Home
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#feature"
          className="sm:hover:border-b"
        >
          Feature
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#preview"
          className="sm:hover:border-b"
        >
          Preview
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#faq"
          className="sm:hover:border-b"
        >
          Faq
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#contact-us"
          className="sm:hover:border-b"
        >
          Contact Us
        </a>
      </div>

      <div className="flex items-center gap-4 sm:gap-4">
        <ThmeToggle theme={theme} setTheme={setTheme} />

        <button
          onClick={() => setSidebarOpen(true)}
          className={` ${
            sidebarOpen ? "hidden" : "block"
          } sm:hidden dark:text-white text-gray-700 text-2xl cursor-pointer active:scale-75 transition-transform`}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <Link
          className="text-sm max-sm:hidden flex items-center gap-2 bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all"
          to={"/register"}
        >
          Daftar Gratis
        </Link>
      </div>
    </motion.div>
  );
}
