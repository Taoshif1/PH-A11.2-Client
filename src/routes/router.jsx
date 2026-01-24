import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FindDonors from "../components/FindDonors";
import Events from "../components/Events";
import AboutUs from "../components/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/find-donors",
        Component: FindDonors,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      }
    ],
  },
]);
