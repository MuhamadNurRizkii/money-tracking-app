import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-gray-900 pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40"
    >
      {/* Footer Top */}
      <div className="flex justify-between lg:items-center max-sm:flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="dark:text-white"
        >
          <h1 className="text-2xl lg:text-3xl font-medium">Money Tracking</h1>
          <p className="pt-2 text-sm max-w-md">
            Atur uang lebih mudah, hidup lebih tenang.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ul className="flex flex-col md:flex-row gap-6 md:pt-9 dark:text-white">
            <li>
              <a
                className="hover:text-primaryy hover:underline hover:underline-offset-1"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="hover:text-primaryy hover:underline hover:underline-offset-1"
                href="#feature"
              >
                Feature
              </a>
            </li>
            <li>
              <a
                className="hover:text-primaryy hover:underline hover:underline-offset-1"
                href="#preview"
              >
                Preview
              </a>
            </li>
            <li>
              <a
                className="hover:text-primaryy hover:underline hover:underline-offset-1"
                href="#faq"
              >
                Faq
              </a>
            </li>
            <li>
              <a
                className="hover:text-primaryy hover:underline hover:underline-offset-1"
                href="#contact-us"
              >
                Contact-Us
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
      <hr className="border-gray-600 dark:border-gray-800 my-6" />
      {/* footer bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap"
      >
        <p>© 2025 MoneyTracking. All rights reserved.</p>
      </motion.div>
    </motion.div>
  );
}
