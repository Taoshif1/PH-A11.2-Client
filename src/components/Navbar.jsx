import { NavLink } from "react-router";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/donations">Donation Requests</NavLink></li>
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="LifeStream" className="w-48" />
          {/* <span className="text-xl font-bold">
            Life<span className="text-red-500">Stream</span>
          </span> */}
        </NavLink>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/donations">Donation Requests</NavLink></li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end">
        <NavLink to="/login" className="btn btn-error text-white">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
