import toast from "react-hot-toast";
import Title from "./Title";
import { motion } from "motion/react";

export default function ContactUs() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", `${import.meta.env.VITE_ACCESS_KEY}`);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL_WEB3FORM}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Terima kasih, pesan anda terkirim");
        event.target.reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <motion.div
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="contact-us"
      className="flex flex-col items-center gap-7 px-3 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title title={"Ada Pertanyaan? Kami Siap Membantu"} />

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full"
      >
        <div>
          <p className="mb-2 text-sm font-medium pl-1">Nama</p>
          <div className="relative flex rounded-lg border border-gray-300 dark:border-gray-600">
            <i className="fa-solid fa-user absolute text-lg top-3 left-1"></i>
            <input
              name="name"
              type="text"
              placeholder="Masukkan Nama Anda"
              className="w-full p-3 pl-8 text-sm outline-none"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium pl-1">Email</p>
          <div className="relative flex rounded-lg border border-gray-300 dark:border-gray-600">
            <i className="fa-solid fa-envelope absolute text-lg top-3 left-1"></i>
            <input
              name="email"
              type="email"
              placeholder="Masukkan Email Anda"
              className="w-full p-3 pl-8 text-sm outline-none"
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium pl-1">Pesan</p>
          <textarea
            name="message"
            rows={8}
            placeholder="Masukkan Pesan"
            className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-max gap-2 bg-primaryy text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Kirim
        </button>
      </motion.form>
    </motion.div>
  );
}
