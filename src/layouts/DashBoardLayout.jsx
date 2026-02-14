import { Outlet, useLocation } from "react-router-dom"; // Add useLocation
import Sidebar from "../Dashboard/common/Sidebar";
import { motion } from "framer-motion";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { userInfo } = useAuth();
  const location = useLocation();

  // Logic: Only show welcome if the path is exactly a "Home" route
  const homeRoutes = [
    "/dashboard",
    "/dashboard/",
  ];
  const shouldShowWelcome = homeRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Sidebar - Made Sticky */}
      <div className="sticky top-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* --- CONDITIONAL ANIMATED WELCOME HEADER --- */}
        {shouldShowWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300"
          >
            <div className="p-3 bg-error/10 rounded-xl text-error text-2xl hidden md:block">
              <FaHandHoldingHeart className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <span className="text-base-content/70">Welcome back,</span>
                <span className="text-error italic">
                  {userInfo?.name || "Heroic Donor"}!
                </span>
                <motion.span
                  animate={{ rotate: [0, 20, 0, 20, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
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
        )}

        {/* Dashboard Content */}
        <div className={shouldShowWelcome ? "" : "mt-4"}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
