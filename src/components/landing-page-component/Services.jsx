import bgImage2 from "../../../public/assets/bgImage2.png";
import ServiceCard from "./ServiceCard";
import Title from "./Title";
import { motion } from "motion/react";

export default function Service() {
  const serviceData = [
    {
      title: "Pencatatan Cepat & Mudah",
      description:
        "Tambahkan transaksi hanya dalam hitungan detik, di mana saja dan kapan saja.",
      icon: (
        <i className="fa-solid fa-book text-2xl text-blue-600 dark:text-white 0 m-2"></i>
      ),
    },
    {
      title: "Laporan Otomatis",
      description:
        "Pantau pemasukan dan pengeluaran lewat grafik mingguan & bulanan yang rapi dan mudah dipahami.",
      icon: (
        <i className="fa-solid fa-chart-line text-3xl text-blue-600 dark:text-white 0 m-2"></i>
      ),
    },
    {
      title: "Aman & Pribadi",
      description: "Data tersimpan aman, hanya Anda yang bisa mengakses.",
      icon: (
        <i className="fa-solid fa-shield-halved text-3xl text-blue-600 dark:text-white 0 m-2"></i>
      ),
    },
    {
      title: "Multi Device",
      description: "Akses di ponsel atau laptop tanpa kehilangan data.",
      icon: (
        <i className="fa-solid fa-mobile text-3xl text-blue-600 dark:text-white 0 m-2"></i>
      ),
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="feature"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <img
        src={bgImage2}
        alt=""
        className="absolute -top-80 -left-70 -z-10 dark:hidden"
      />

      <Title title={"Kenapa Pilih Money Tracking?"} />

      <div className="flex flex-col md:grid grid-cols-2">
        {serviceData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
