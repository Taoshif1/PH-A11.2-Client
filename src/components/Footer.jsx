import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-neutral text-neutral-content mt-20"
    >
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-error">LifeStream</h2>
          <p className="mt-3 text-sm opacity-80">
            A life-saving blood donation platform connecting donors
            and patients in real time.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Donation Requests</li>
            <li>Become a Donor</li>
            <li>Login</li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm opacity-80">
            Dhaka, Bangladesh <br />
            support@lifestream.org
          </p>
        </div>

      </div>

        {/* copyright */}
      <div className="text-center text-sm py-4 border-t border-neutral-content/20">
        © {new Date().getFullYear()} LifeStream. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
