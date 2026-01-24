import { motion } from "motion/react";
import { FaTint, FaHandHoldingMedical, FaHeartbeat } from "react-icons/fa";

const points = [
  { icon: <FaTint className="text-red-500" />, text: "Blood cannot be manufactured artificially" },
  { icon: <FaHandHoldingMedical className="text-red-500" />, text: "1 donation can save up to 3 lives" },
  { icon: <FaHeartbeat className="text-red-500" />, text: "Every minute someone needs blood" },
];

const WhyDonate = () => {
  return (
    <section className="py-20 bg-base-200 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Why Donate <span className="text-red-500"> Blood </span>?
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-1">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-red-100 via-red-200 to-red-100 shadow-lg border border-red-300 text-left"
            >
              <div className="text-3xl">{point.icon}</div>
              <p className="font-medium text-lg">
                {point.text.split(" ").map((word, idx) => (
                  // Highlight keywords
                  ["Blood", "lives", "minute"].includes(word) ? 
                  <span key={idx} className="text-red-600 font-bold">{word} </span> :
                  word + " "
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;
