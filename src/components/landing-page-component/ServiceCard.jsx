import { useRef, useState } from "react";
import { motion } from "motion/react";

const ServiceCard = ({ service, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      ref={divRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      className="relative max-w-lg m-2 sm:m-4 rounded-xl 
                 p-[1px] transition-all duration-500
                 bg-gray-200 dark:bg-gray-700
                 hover:bg-gradient-to-r hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:scale-102"
    >
      {/* Glow effect */}
      <div
        className={`pointer-events-none blur-2xl rounded-full 
                    bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
                    w-[150px] h-[150px] absolute z-0 
                    transition-opacity duration-500 mix-blend-lighten 
                    ${visible ? "opacity-70" : "opacity-0"}`}
        style={{ top: position.y - 150, left: position.x - 150 }}
      />

      {/* Inner content */}
      <div className="relative flex items-center gap-6 p-6 rounded-xl bg-white dark:bg-gray-900 z-10">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
          {service.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{service.title}</h3>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
