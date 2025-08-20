import { Link } from "react-router";
import bgImage1 from "../../../public/assets/bgImage1.png";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl xl:text-[80px] font-medium xl:leading-[95px] max-w-5xl"
      >
        Kelola{" "}
        <span className="bg-gradient-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent">
          Keuangan
        </span>{" "}
        Tanpa Ribet
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg pb-3"
      >
        Catat pemasukan, pantau pengeluaran, dan lihat laporan keuangan secara
        instan. Semuanya dalam satu aplikasi yang simpel dan aman.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        viewport={{ once: true }}
      >
        <Link
          className="px-4 py-2 text-xl md:text-2xl text-white rounded-lg bg-gradient-to-r from-[#5044E5] to-[#4d8cea] shadow-lg shadow-[#5044E5]/50 hover:shadow-2xl hover:-translate-y-1.5 active:translate-y-0.5 transition-all duration-200"
          to={"/login"}
        >
          Coba Sekarang
        </Link>
      </motion.div>

      <img
        src={bgImage1}
        className="absolute -top-40 -right-40 sm:-top-70 sm:-right-60 -z-1 dark:hidden"
        alt=""
      />
    </div>
  );
}
