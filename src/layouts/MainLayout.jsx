import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import BloodTicker from "../components/BloodTicker";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <BloodTicker></BloodTicker>
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
