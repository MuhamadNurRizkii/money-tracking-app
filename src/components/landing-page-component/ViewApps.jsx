import Title from "./Title";
import mockup1 from "../../../public/assets/mockup-1.jpg";
import mockup2 from "../../../public/assets/mockup-2.jpg";
import mockupMobile from "../../../public/assets/mockup-mobile.jpg";
import { motion } from "motion/react";

export default function ViewApps() {
  const previewData = [
    {
      title: "Semua transaksi Anda dalam satu tampilan.",
      description:
        "Dashboard yang simpel memudahkan Anda memantau keuangan tanpa ribet.",
      img: mockup1,
    },
    {
      title: "Catatan transaksi yang jelas dan rapi.",
      description:
        "Data tersimpan lengkap, transparan, dan bisa Anda akses kapan saja.",
      img: mockup2,
    },
    {
      title: "Mudah di genggaman.",
      description:
        "Semua fitur utama di genggaman cek saldo, pemasukan, dan pengeluaran seketika.",
      img: mockupMobile,
    },
  ];
  return (
    <motion.div
      initial={"hidden"}
      whileInView={"visible"}
      transition={{ staggerChildren: 0.2 }}
      viewport={{ once: true }}
      id="preview"
      className="flex flex-col items-center gap-7 px-5 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <div className="text-center">
        <Title title={`Lihat seperti apa mudahnya mengatur keuangan`} />
      </div>

      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {previewData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="hover:scale-102 rounded-xl shadow-xl hover:shadow-2xl dark:bg-gray-900 duration-500 transition-all cursor-pointer"
          >
            <div className="px-2 pt-3">
              <img src={`${item.img}`} className="w-full rounded-xl" alt="" />
            </div>
            <div className="px-2 pb-3">
              <h3 className="mt-3 mb-2 text-lg ">{item.title}</h3>
              <p className="text-sm opacity-60 w-5/6">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
