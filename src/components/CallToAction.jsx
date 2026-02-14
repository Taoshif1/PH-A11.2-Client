import { motion } from "framer-motion";
import { FaHandsHelping, FaHeartbeat, FaTint } from "react-icons/fa";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 flex items-center justify-center gap-3 flex-wrap"
        >
          <FaHandsHelping className="text-4xl md:text-5xl" />
          <span>Ready to </span>
          <span className="text-yellow-300">Save</span>
          <span> a </span>
          <span className="text-green-300">Life?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Join thousands of donors and help someone today. Your contribution can save lives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center flex-wrap gap-4"
        >
          <Link to="/register" className="btn btn-outline btn-lg flex items-center gap-2 border-white hover:bg-white hover:text-red-600 transition-colors duration-300">
            <FaHeartbeat /> Become a Donor
          </Link>
          <Link to="/find-donors" className="btn btn-gradient btn-lg flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black transition-colors duration-300">
            <FaTint /> Request Blood
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
