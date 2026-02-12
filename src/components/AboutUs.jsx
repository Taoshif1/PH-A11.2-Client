import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaDroplet, FaUsers, FaHospital, FaHeartPulse, 
    FaClock, FaShieldHeart, FaHandHoldingHeart, FaLocationDot 
} from 'react-icons/fa6';
import { Link } from 'react-router';

const AboutUs = () => {
    const stats = [
        { icon: <FaDroplet className="text-error" />, label: "Blood Requests", value: "1,200+" },
        { icon: <FaUsers className="text-primary" />, label: "Active Donors", value: "850+" },
        { icon: <FaHospital className="text-secondary" />, label: "Partner Hospitals", value: "45+" },
    ];

    const values = [
        { icon: <FaShieldHeart />, title: "Secure Data", desc: "Your health records are encrypted with MERN security protocols." },
        { icon: <FaClock />, title: "Real-time Alerts", desc: "Instant notifications when your blood group is needed nearby." },
        { icon: <FaHandHoldingHeart />, title: "Community led", desc: "Built by donors, for donors, to save lives together." },
    ];

    const steps = [
        { icon: <FaLocationDot />, title: "Search", text: "Find donors by blood group & location." },
        { icon: <FaHeartPulse />, title: "Connect", text: "Contact verified donors instantly." },
        { icon: <FaDroplet />, title: "Save Lives", text: "Complete the donation and track impact." },
    ];

    return (
        <section className="py-20 bg-base-100 overflow-x-clip">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- HERO SECTION --- */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="badge badge-error badge-outline mb-4 font-semibold"
                    >
                        EST. 2025
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-base-content mb-6"
                    >
                        Life<span className="text-red-500">Stream</span>
                    </motion.h2>
                    <p className="max-w-2xl mx-auto text-lg text-base-content/60 leading-relaxed uppercase tracking-tighter font-medium">
                        Where Technology meets Humanity.
                    </p>
                </div>

                {/* --- MISSION & STATS SECTION --- */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative px-4" 
                    >
                        {/* THE ROTATED CARD  */}
                        <div className="card bg-error text-white-content shadow-xl p-10 transform md:-rotate-3 hover:rotate-2 transition-all duration-800">
                            <FaHeartPulse className="text-7xl mb-6 animate-pulse" />
                            <h3 className="text-4xl font-bold mb-4 font-mono">OUR VISION</h3>
                            <p className="text-xl opacity-90 leading-relaxed">
                                To create a world where no one loses a loved one due to blood unavailability. 
                                We are a digital heartbeat.
                            </p>
                        </div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-error/20 rounded-full blur-3xl -z-10"></div>
                    </motion.div>

                    <div className="space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="prose prose-lg"
                        >
                            <h3 className="text-3xl font-bold">Bridging the Gap</h3>
                            <p className="text-base-content/70">
                                LifeStream utilizes the <span className="font-bold text-primary italic">MERN Stack</span> to provide high-performance, real-time donor matching. 
                                From profile management to emergency alerts, our platform is built for speed.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {stats.map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="stats shadow-sm bg-base-200 border border-base-300"
                                >
                                    <div className="stat p-4">
                                        <div className="stat-figure text-error text-2xl">{stat.icon}</div>
                                        <div className="stat-title text-[10px] uppercase font-bold tracking-widest">{stat.label}</div>
                                        <div className="stat-value text-2xl">{stat.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- HOW IT WORKS (ANIMATED CARDS) --- */}
                <div className="mb-32">
                    <h3 className="text-3xl font-bold text-center mb-12">The LifeStream Journey</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="flex flex-col items-center text-center p-10 bg-base-200/50 rounded-[2.5rem] border border-base-300 backdrop-blur-md"
                            >
                                <div className="w-20 h-20 rounded-full bg-error/10 text-error flex items-center justify-center text-4xl mb-6 ring-8 ring-error/5">
                                    {step.icon}
                                </div>
                                <h4 className="text-2xl font-bold mb-2 uppercase italic">{step.title}</h4>
                                <p className="text-base-content/60 leading-relaxed">{step.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- WHY TRUST US (DARK SECTION) --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-neutral text-neutral-content rounded-[4rem] p-12 lg:p-24 relative overflow-hidden"
                >
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-5xl font-bold mb-8 text-white leading-tight">Why Donors <br/>Trust Us?</h3>
                            <p className="text-neutral-content/70 mb-10 text-lg">
                                Transparency and safety are our core pillars. Every donor is verified and every request is monitored by our administrative team.
                            </p>
                            <Link to='/beadonor' className="btn btn-error btn-lg rounded-full px-12 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all">
                                Join Now
                            </Link>
                        </div>
                        <div className="grid gap-6">
                            {values.map((v, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="group flex gap-6 items-start bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div className="text-4xl text-error group-hover:scale-110 transition-transform">{v.icon}</div>
                                    <div>
                                        <h5 className="text-2xl font-bold text-white mb-1">{v.title}</h5>
                                        <p className="text-base opacity-50">{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {/* Floating Orbs for Visual Flair */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-error/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
