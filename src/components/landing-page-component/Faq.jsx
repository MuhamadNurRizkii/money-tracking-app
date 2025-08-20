import Title from "./Title";
import { motion } from "motion/react";

export default function Faq() {
  return (
    <motion.div
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      id="faq"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:24px xl:px-40 pt-30 text-gray-800 dark:text-white"
    >
      <Title title={"FAQ (Pertanyaan Umum)"} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="w-full"
      >
        <div className="collapse collapse-arrow bg-base-100 dark:bg-gray-900 border border-base-300 dark:border-white/20">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold ">
            Apakah aplikasi ini gratis?
          </div>
          <div className="collapse-content text-sm ">
            Tentu, aplikasi ini bisa digunakan secara gratis tanpa biaya
            tersembunyi.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 dark:bg-gray-900 border border-base-300 dark:border-white/20">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Apakah data saya aman?
          </div>
          <div className="collapse-content text-sm">
            Tentu. Semua data disimpan dengan aman dan tidak dibagikan ke pihak
            ketiga.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 dark:bg-gray-900 border border-base-300 dark:border-white/20">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Bisa dipakai di perangkat apa saja?
          </div>
          <div className="collapse-content text-sm">
            Aplikasi ini bisa diakses lewat smartphone dan juga desktop browser.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 dark:bg-gray-900 border border-base-300 dark:border-white/20">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Apakah ada batasan jumlah catatan transaksi?
          </div>
          <div className="collapse-content text-sm">
            Tidak ada batasan. Anda bebas mencatat sebanyak mungkin transaksi
            harian.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
