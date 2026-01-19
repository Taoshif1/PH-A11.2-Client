import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  // Container variants to stagger the children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 border border-base-300 w-full"
    >
      {/* Stat 1: Total Donors */}
      <motion.div variants={item} className="stat">
        <div className="stat-figure text-error">
          <motion.svg
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </motion.svg>
        </div>
        <div className="stat-title">Registered Donors</div>
        <div className="stat-value text-error">12,800+</div>
        <div className="stat-desc">↗︎ Growing every month</div>
      </motion.div>

      {/* Stat 2: Blood Requests Served */}
      <motion.div variants={item} className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="stat-title">Blood Requests Served</div>
        <div className="stat-value text-secondary">3,450+</div>
        <div className="stat-desc text-secondary">
          ↗︎ 22% increase this year
        </div>
      </motion.div>

      {/* Stat 3: Lives Impacted */}
      <motion.div variants={item} className="stat">
        <div className="stat-figure text-success">
          <div className="avatar avatar-online">
            <div className="w-16 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                alt="Lives saved"
              />
            </div>
          </div>
        </div>
        <div className="stat-value text-success">10,000+</div>
        <div className="stat-title">Lives Impacted</div>
        <div className="stat-desc">Every drop counts ❤️</div>
      </motion.div>

      {/* Stat 4: Live Donation Campaigns */}
      <motion.div variants={item} className="stat">
        <div className="stat-title">Live Donation Campaigns</div>
        <div className="stat-value text-primary">28</div>
        <div className="stat-desc">
          Active & completed nationwide
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Stats;
