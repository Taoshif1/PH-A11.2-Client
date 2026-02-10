import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FindDonors from "../components/FindDonors";
import Events from "../components/Events";
import AboutUs from "../components/AboutUs";
import Dashboard from "../pages/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import axios from "axios";
import BeADonor from "../pages/BeADonor";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Profile from "../Dashboard/common/Profile";
import DonorHome from "../Dashboard/donor/DonorHome";
import MyRequests from "../Dashboard/donor/MyRequests";
import CreateRequest from "../Dashboard/donor/CreateRequest";
import AdminHome from "../Dashboard/admin/AdminHome";
import AllUsers from "../Dashboard/admin/AllUsers";
import AllRequests from "../Dashboard/admin/AllRequests";
import VolunteerHome from "../Dashboard/volunteer/VolunteerHome";
import VolunteerRequests from "../Dashboard/volunteer/VolunteerRequests";

export const router = createBrowserRouter([
  // --- MAIN SITE SECTION ---
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
        loader: async () => {
          // fetch('/bloodRequestEvent.json').then(res => res.json())
          const response = await axios.get("/bloodRequestEvent.json");
          return response.data;
        },
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "beadonor",
        element: (
          // <PrivateRoute>
          // </PrivateRoute>,
          <BeADonor />
        ),
        errorElement: (
          <div className="p-10 text-red-500">Donor Page failed to load.</div>
        ),
        loader: async () => {
          // Fetch all files in parallel for better speed
          const [divRes, distRes, upzRes, uniRes] = await Promise.all([
            axios.get("/divisions.json"),
            axios.get("/districts.json"),
            axios.get("/upazilas.json"),
            axios.get("/unions.json"),
          ]);

          // Helper to clean the structure
          const clean = (res) =>
            res.data.find((item) => item.type === "table").data;

          return {
            divisions: clean(divRes),
            districts: clean(distRes),
            upazilas: clean(upzRes),
            unions: clean(uniRes),
          };
        },
      },
    ],
  },

  // --- DASHBOARD SECTION (Private & Role-Based) ---
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      // common
      {
        path: "profile",
        Component: Profile,
      },
      //donor
      {
        path: "donor",
        Component: DonorHome,
      },
      {
        path: "donor/requests",
        Component: MyRequests,
      },
      {
        path: "donor/create",
        Component: CreateRequest,
      },

      // admin
      {
        path: "admin",
        Component: AdminHome,
      },
      {
        path: "admin/users",
        Component: AllUsers,
      },
      {
        path: "admin/requests",
        Component: AllRequests,
      },

      // volunteer
      {
        path: "volunteer",
        Component: VolunteerHome,
      },
      {
        path: "volunteer/requests",
        Component: VolunteerRequests,
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
        path: "login", // URL remains: /login
        Component: Login,
      },
      {
        path: "register", // URL remains: /register
        Component: Register,
      },
    ],
  },
]);
