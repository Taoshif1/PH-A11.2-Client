import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdOutlineBloodtype } from "react-icons/md";


import lsh1 from "../assets/lsh1.png";
import lsh2 from "../assets/lsh2.png";
import lsh3 from "../assets/lsh3.png";
import lsh4 from "../assets/lsh4.png";
import lsh6 from "../assets/lsh6.png";

const Hero = () => {
  return (
    <section className="bg-base-100 py-20 overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Donate Blood, <br />
            <span className="text-error">Save Lives Today</span>
          </h1>

          <p className="text-lg text-base-content/70 max-w-xl">
            LifeStream connects blood donors with patients instantly.
            One small act can mean a lifetime for someone else.
          </p>

          <div className="flex flex-wrap gap-4">
            <NavLink to="/register" className="btn btn-error text-white">
              <BiSolidDonateBlood /> Become a Donor
            </NavLink>
            <NavLink to="/donations" className="btn btn-outline btn-error">
              <MdOutlineBloodtype /> Request Blood
            </NavLink>
          </div>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {[lsh1, lsh4, lsh6, lsh3].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="LifeStream Hero"
              className="rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
