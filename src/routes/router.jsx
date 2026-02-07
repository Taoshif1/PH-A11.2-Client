import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FindDonors from "../components/FindDonors";
import Events from "../components/Events";
import AboutUs from "../components/AboutUs";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  // --- MAIN SITE SECTION ---
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage> ,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "find-donors", // Removed leading slashes for consistency
        Component: FindDonors,
      },
      {
        path: "events",
        Component: Events,
        loader: () => fetch('/bloodRequestEvent.json').then(res => res.json())
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "dashboard",
        element:
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>,
        errorElement: <div className="p-10 text-red-500">Dashboard failed to load.</div>
      },
    ],
  },

  // --- AUTH SECTION ---
  // This is a "Pathless Route". It doesn't add anything to the URL,
  // but it wraps the children in AuthLayout.
  {
    Component: AuthLayout, 
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",    // URL remains: /login
        Component: Login,
      },
      {
        path: "register", // URL remains: /register
        Component: Register,
      },
    ],
  },
]);
