import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMdHome, IoMdPersonAdd } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdFindInPage, MdEvent, MdLogin } from "react-icons/md";
import { SiCodestream } from "react-icons/si";
import { RiRefund2Fill } from "react-icons/ri";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  // Define links in an array for cleaner mapping and to avoid repetition
  const navLinks = [
    { to: "/", label: "Home", icon: <IoMdHome /> },
    { to: "/find-donors", label: "Donate Blood", icon: <MdFindInPage /> },
    { to: "/funding", label: "Funding", icon: <RiRefund2Fill /> },
    { to: "/events", label: "Events", icon: <MdEvent /> },
    { to: "/about-us", label: "About Us", icon: <SiCodestream /> },
  ];

  const renderLinks = navLinks.map((link) => (
    <li key={link.to}>
      <NavLink
        to={link.to}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive ? "active" : "hover:bg-gray-100 text-gray-700"
          }`
        }
      >
        {link.icon} {link.label}
      </NavLink>
    </li>
  ));

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 lg:px-12 py-3 flex items-center justify-between">
      {/* Left: Logo & Mobile Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden btn btn-ghost btn-circle text-gray-700"
        >
          {isOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
        </button>

        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="LifeStream"
            className="w-32 lg:w-40 object-contain"
          />
        </Link>
      </div>

      {/* Center: Desktop Links */}
      <div className="hidden lg:flex">
        <ul className="flex items-center gap-2 font-medium">
          {renderLinks}
          {user && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? "active" : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <TbLayoutDashboardFilled /> Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-error/20 hover:border-error transition-all"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/mJR9z8y/user-placeholder.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-gray-100"
            >
              <li className="px-4 py-3 border-b mb-2">
                <p className="font-bold text-gray-800 truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </li>
              <li>
                <Link to="/dashboard/profile" className="py-2">
                  View Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="text-error font-semibold py-2"
                >
                  <CiLogout size={18} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-error btn-sm lg:btn-md text-white rounded-full px-6 shadow-md shadow-error/20 hover:scale-105 transition-all"
          >
            <MdLogin /> Login
          </Link>
        )}

        {/* Action Button */}
        <Link
          to="/register-volunteer"
          className="hidden sm:flex btn btn-outline btn-error btn-sm lg:btn-md rounded-full px-6 hover:scale-105 transition-all"
        >
          <IoMdPersonAdd size={18} />
          <span className="hidden lg:inline">Join as Volunteer</span>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden transition-all duration-300 ease-in-out border-t border-gray-50 overflow-hidden ${
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul
          className="flex flex-col p-4 space-y-2 font-medium"
          onClick={() => setIsOpen(false)}
        >
          {renderLinks}
          {!user && (
            <li>
              <Link
                to="/register-volunteer"
                className="flex items-center gap-2 p-2 text-error"
              >
                <IoMdPersonAdd /> Join as Volunteer
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
