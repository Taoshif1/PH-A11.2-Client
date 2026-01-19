import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt  } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com" },
    { icon: <FaInstagram />, url: "https://instagram.com" },
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-white mt-5"
    >
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">
            <span className="text-yellow-300">Life</span>Stream
          </h2>
          <p className="mt-3 text-sm opacity-80">
            A life-saving blood donation platform connecting donors
            and patients in real time.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FFD700" }}
                className="text-lg"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-300 transition-colors cursor-pointer">Home</li>
            <li className="hover:text-yellow-300 transition-colors cursor-pointer">Donation Requests</li>
            <li className="hover:text-yellow-300 transition-colors cursor-pointer">Become a Donor</li>
            <li className="hover:text-yellow-300 transition-colors cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <div className="space-y-3 text-sm opacity-90">
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-yellow-300" />
              <span>House 12, Road 5, <br /> Gulshan, Dhaka</span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-300" />
              <a href="tel:+880123456789" className="hover:text-yellow-300">+880 1234-56789</a>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-300" />
              <a href="mailto:support@lifestream.org" className="hover:text-yellow-300">support@lifestream.org</a>
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <p className="text-sm opacity-80 mb-2">Subscribe for updates & news</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="input input-sm w-full max-w-xs bg-white text-black placeholder-gray-500"
            />
            <button className="btn btn-sm btn-warning">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm py-4 border-t border-white/20">
        © {new Date().getFullYear()} LifeStream. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
