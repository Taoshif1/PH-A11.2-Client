import { motion } from "framer-motion";
import { FaPenFancy, FaTint, FaHeart } from "react-icons/fa";

const steps = [
  { title: "Register as Donor", desc: "Sign up quickly and join the LifeStream community.", icon: <FaPenFancy className="text-red-600" /> },
  { title: "Request or Donate", desc: "Find nearby blood requests or donate when needed.", icon: <FaTint className="text-red-600" /> },
  { title: "Save Lives", desc: "Your donation can save up to 3 lives.", icon: <FaHeart className="text-red-600" /> },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          How LifeStream Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-200 shadow-md p-6 flex flex-col items-center gap-4"
            >
              <div className="text-5xl">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm opacity-80">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
