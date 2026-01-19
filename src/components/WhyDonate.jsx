import { FaTint, FaHandHoldingMedical, FaHeartbeat } from "react-icons/fa";

const points = [
  {
    icon: <FaTint />,
    text: "Blood cannot be manufactured artificially",
  },
  {
    icon: <FaHandHoldingMedical />,
    text: "1 donation can save up to 3 lives",
  },
  {
    icon: <FaHeartbeat />,
    text: "Every minute someone needs blood",
  },
];

const WhyDonate = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-8">Why Donate Blood?</h2>

        <div className="space-y-4 text-lg">
          {points.map((point, i) => (
            <div
              key={i}
              className="alert alert-error bg-opacity-10 flex items-center gap-3 text-left"
            >
              <span className="text-2xl">{point.icon}</span>
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;
