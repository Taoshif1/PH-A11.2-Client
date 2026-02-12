import { Outlet } from "react-router";
import Sidebar from "../Dashboard/common/Sidebar";
import { motion } from "framer-motion";
import { FaHandHoldingHeart } from "react-icons/fa6";

const DashboardLayout = () => {
  // Static name for now will replace with actual user name from Auth context/state
  const donorName = "Heroic Donor"; 

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Sidebar */}
      <div>
      <Sidebar />

      </div>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* --- ANIMATED WELCOME HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300"
        >
          <div className="p-3 bg-error/10 rounded-xl text-error text-2xl hidden md:block">
            <FaHandHoldingHeart className="animate-pulse" />
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <span className="text-base-content/70">Welcome back,</span>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-error bg-error/5 px-3 py-1 rounded-lg italic"
              >
                {donorName}!
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 20, 0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block origin-bottom-right"
              >
                👋
              </motion.span>
            </h1>
            <p className="text-sm text-base-content/50 mt-1 font-medium">
                Ready to save lives today? Your contribution makes a difference.
            </p>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="min-h-[calc(100vh-200px)]">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
