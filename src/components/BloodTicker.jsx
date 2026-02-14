import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { MdBloodtype, MdLocationOn } from "react-icons/md";

const BloodTicker = () => {
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["tickerRequests"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/donation-requests/public/all`,
      );
      return res.data;
    },
  });

  // Don't show anything if loading or no requests
  if (isLoading || requests.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden whitespace-nowrap flex border-y border-red-700">
      <motion.div
        className="flex gap-12 items-center"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          ease: "linear",
          duration: 180, // Increase for slower movement
          repeat: Infinity,
        }}
      >
        {requests.map((request, index) => (
          <div key={index} className="flex items-center gap-3 px-4">
            <MdBloodtype className="text-white text-xl animate-pulse" />
            <span className="font-bold text-lg underline">
              {request.bloodGroup}
            </span>
            <span className="font-medium">
              Needed at {request.hospitalName}
            </span>
            <span className="flex items-center gap-1 text-red-100 text-sm">
              <MdLocationOn /> {request.district}
            </span>
          </div>
        ))}
        {/* Mirror the list once for a seamless loop if the list is short */}
        {requests.map((request, index) => (
          <div key={`dup-${index}`} className="flex items-center gap-3 px-4">
            <MdBloodtype className="text-white text-xl animate-pulse" />
            <span className="font-bold text-lg underline">
              {request.bloodGroup}
            </span>
            <span className="font-medium">
              Needed at {request.hospitalName}
            </span>
            <span className="flex items-center gap-1 text-red-100 text-sm">
              <MdLocationOn /> {request.district}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BloodTicker;
