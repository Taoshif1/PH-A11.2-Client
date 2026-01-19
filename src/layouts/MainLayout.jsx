import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
