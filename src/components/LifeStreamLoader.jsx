import React from 'react';
import { motion } from 'framer-motion';
import { FaDroplet } from 'react-icons/fa6';

const LifeStreamLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-md">
            <div className="relative">
                {/* Outer Ripple Effect */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full bg-error/20"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ 
                            scale: [1, 2, 2.5], 
                            opacity: [0.5, 0.2, 0] 
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut"
                        }}
                    />
                ))}

                {/* Main Pulsing Icon */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        filter: ["drop-shadow(0 0 10px rgba(255,0,0,0.2))", "drop-shadow(0 0 25px rgba(255,0,0,0.6))", "drop-shadow(0 0 10px rgba(255,0,0,0.2))"]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative bg-base-100 p-8 rounded-full shadow-2xl z-10 border border-base-200"
                >
                    <FaDroplet className="text-6xl text-error" />
                </motion.div>
            </div>

            {/* Loading Text with Animated Dots */}
            <div className="mt-12 flex flex-col items-center">
                <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-bold tracking-widest text-base-content/80 flex items-center gap-1 uppercase"
                >
                    LifeStream 
                    <span className="loading loading-dots loading-md text-error"></span>
                </motion.h3>
                <p className="text-sm text-base-content/40 mt-2 italic">Saving lives, one drop at a time...</p>
            </div>
        </div>
    );
};

export default LifeStreamLoader;
