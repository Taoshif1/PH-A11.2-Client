import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdOutlineBloodtype } from "react-icons/md";
import lsh1 from "../assets/lsh1.png";
import lsh3 from "../assets/lsh3.png";
import lsh4 from "../assets/lsh4.png";
import lsh6 from "../assets/lsh6.png";

const Hero = () => {
  return (
    <section className="relative bg-base-100 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Donate Blood, <br />
            <span className="text-error relative">
              Save Lives Today
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 350 12"
                fill="none"
              >
                <path
                  d="M3.5 9c50-3.5 150-8 343-2"
                  stroke="#F87272"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-8 text-xl text-base-content/70 max-w-lg">
            LifeStream connects blood donors with patients instantly. Join our
            community and become a hero in someone's story.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <NavLink
              to="/register"
              className="btn btn-error btn-lg text-white shadow-lg hover:shadow-error/40 transition-all"
            >
              <BiSolidDonateBlood size={24} /> Become a Donor
            </NavLink>
            <NavLink to="/find-donors" className="btn btn-outline btn-error btn-lg">
              <MdOutlineBloodtype size={24} /> Search Donors
            </NavLink>
          </div>
        </motion.div>

        {/* Right Images - Modern Floating Grid */}
        <div className="relative grid grid-cols-2 gap-4">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="space-y-4"
          >
            <img
              src={lsh1}
              alt="Hero 1"
              className="rounded-2xl shadow-2xl border-4 border-white"
            />
            <img
              src={lsh4}
              alt="Hero 4"
              className="rounded-2xl shadow-xl border-4 border-white h-40 w-full object-cover"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="space-y-4 pt-12"
          >
            <img
              src={lsh6}
              alt="Hero 6"
              className="rounded-2xl shadow-2xl border-4 border-white"
            />
            <img
              src={lsh3}
              alt="Hero 3"
              className="rounded-2xl shadow-xl border-4 border-white h-48 w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
