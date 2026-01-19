import { motion } from "framer-motion";

const steps = [
  {
    title: "Register as Donor",
    desc: "Sign up in minutes and become part of the LifeStream community.",
    icon: "📝",
  },
  {
    title: "Request or Donate",
    desc: "Find nearby blood requests or donate when someone needs help.",
    icon: "🩸",
  },
  {
    title: "Save Lives",
    desc: "Your donation can save up to 3 lives. Be someone’s hero.",
    icon: "❤️",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-12"
        >
          How LifeStream Works
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="card bg-base-200 shadow-md p-6"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm opacity-80 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
