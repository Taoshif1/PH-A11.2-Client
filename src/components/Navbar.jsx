import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { IoMdHome } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdFindInPage, MdEvent, MdBloodtype, MdLogin } from "react-icons/md"
import { SiCodestream } from "react-icons/si";
import { RiRefund2Fill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  // console.log("User in Navbar ", user);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded "
        >
          <IoMdHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/find-donors"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
        >
          <MdFindInPage /> Donate Blood
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
        >
          <TbLayoutDashboardFilled /> DashBoard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/funding"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
        >
          <RiRefund2Fill /> Funding
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
        >
          <MdEvent /> Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
        >
          <SiCodestream /> About Us
        </NavLink>
      </li>

      {/* {user && (
      )} */}
    </>
  );

  // Helper Toggle function
  // const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* Hamburger / Cross Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 focus:outline-none z-50"
        >
          {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="LifeStream" className="w-40" />
        </NavLink>
      </div>

      {/* Center: Desktop Links */}
      <div className="hidden lg:flex">
        <ul className="flex flex-row gap-6 font-medium">{links}</ul>
      </div>

      {/* Right: Dynamic Login & Donor Button */}
      <div className="flex items-center gap-3">
        {/* login button */}
        {user ? (
          <>
            {/* User Name */}
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user.displayName || user.email}
            </span>

            {/* Logout */}
            <button
              onClick={logOut}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center gap-2 hover:scale-105"
            >
              <CiLogout /> Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition hover:scale-105"
          >
            <MdLogin /> Login
          </NavLink>
        )}

        {/* Be a donor button */}
        <NavLink
          to="/beadonor"
          className={({ isActive }) =>
            `btn ${isActive ? "btn-disabled" : "btn-error text-white"} flex items-center gap-2 shadow-sm transition-all hover:scale-105`
          }
        >
          <IoMdPersonAdd size={20} />
          Join as Volunteer
        </NavLink>

      </div>

      {/* Mobile Menu Overlay */}
      {/* This will slide/show only when isOpen is true */}
      <div
        className={`
        absolute top-full left-0 w-full bg-white shadow-lg lg:hidden transition-all duration-300 ease-in-out z-40
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      >
        <ul
          className="flex flex-col p-4 space-y-2"
          onClick={() => setIsOpen(false)}
        >
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
