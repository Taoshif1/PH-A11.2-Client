# 🩸 LifeStream | Frontend Client

The user interface for the LifeStream blood donation platform. A responsive, high-performance Single Page Application (SPA) built with React and Vite, featuring a comprehensive dashboard for Donors, Volunteers, and Admins.

## 🚀 Live Application

**URL:** [https://bloodapp2client.vercel.app/](https://bloodapp2client.vercel.app/)

## 🛠️ Tech Stack

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS & DaisyUI
- **State Management:** React Context API (AuthContext)
- **Routing:** React Router v7
- **Icons:** React Icons
- **Data Fetching:** Axios
- **Authentication:** Firebase Client SDK

## 📂 Project Structure

```text

client
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json                     
├─ public                           # Static assets & Local JSON data (Districts/Upazilas)
│ ├─ bloodRequestEvent.json
│ ├─ districts.json
│ ├─ divisions.json
│ ├─ unions.json
│ ├─ upazilas.json
│ └─ vite.svg
├─ README.md
├─ src
│ ├─ App.css
│ ├─ App.jsx
│ ├─ assets                         # Images and brand logos
│ │ ├─ logo.png
│ │ ├─ lsh1.png
│ │ ├─ lsh2.png
│ │ ├─ lsh3.png
│ │ ├─ lsh4.png
│ │ ├─ lsh5.png
│ │ ├─ lsh6.png
│ │ └─ react.svg
│ ├─ components                      # Reusable UI components (Hero, Navbar, Stats)
│ │ ├─ AboutUs.jsx
│ │ ├─ BloodTicker.jsx
│ │ ├─ CallToAction.jsx
│ │ ├─ Events.jsx
│ │ ├─ FindDonors.jsx
│ │ ├─ Footer.jsx
│ │ ├─ Hero.jsx
│ │ ├─ HowItWorks.jsx
│ │ ├─ LifeStreamLoader.jsx
│ │ ├─ Navbar.jsx
│ │ ├─ Stats.jsx
│ │ └─ WhyDonate.jsx
│ ├─ context                        # Authentication logic & Global state
│ │ ├─ AuthContext.jsx
│ │ └─ AuthProvider.jsx
│ ├─ Dashboard                      # Role-based dashboard modules
│ │ ├─ admin                        # User management & Site-wide stats
│ │ │ ├─ AdminHome.jsx
│ │ │ ├─ AllRequests.jsx
│ │ │ └─ AllUsers.jsx
│ │ ├─ common                       # Common Features for all
│ │ │ ├─ Profile.jsx
│ │ │ └─ Sidebar.jsx
│ │ ├─ donor                        # Request creation & Personal history
│ │ │ ├─ CreateRequest.jsx
│ │ │ ├─ DonorHome.jsx
│ │ │ ├─ EditRequest.jsx
│ │ │ ├─ MyRequests.jsx
│ │ │ └─ ViewRequest.jsx
│ │ └─ volunteer                    # Request status management
│ │ ├─ VolunteerHome.jsx
│ │ └─ VolunteerRequests.jsx
│ ├─ firebase
│ │ └─ firebase.config.js
│ ├─ hooks                           # Custom hooks
│ │ ├─ useAuth.js
│ │ └─ useAxiosSecure.jsx
│ ├─ layouts                        # Main, Auth & Dashboard wrapper layouts     
│ │ ├─ AuthLayout.jsx
│ │ ├─ DashBoardLayout.jsx
│ │ └─ MainLayout.jsx
│ ├─ main.jsx
│ ├─ index.css
│ ├─ pages                          # High-level views (Home, Funding, Search)
│ │ ├─ DashboardHome.jsx
│ │ ├─ ErrorPage.jsx
│ │ ├─ Funding.jsx
│ │ ├─ Home.jsx
│ │ ├─ Login.jsx
│ │ ├─ Register.jsx
│ │ └─ RegisterVolunteer.jsx
│ └─ routes                         # Protected and Role-based routing logic
│   ├─ PrivateRoute.jsx
│   ├─ RoleRoute.jsx
│   └─ router.jsx
└─ vite.config.js

```

## 🔐 Environment Variables

To connect with the backend, create a `.env` file in the root:
```js
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=[https://bloodapp2.vercel.app](https://bloodapp2.vercel.app)
```

## 🧪 Demo Credentials

For testing purposes, you may use the following accounts:

Role,Email,Password
Admin,Admin@gmail.com,Admin12
Volunteer,moon12@gmail.com,Tasu12
Donor,Donor@gmail.com,Donor12

write like this ->

| Role      | Email            | Password |
|-----------|------------------|----------|
| Admin     | Admin@gmail.com  | Admin12  |
| Donor     | Donor@gmail.com  | Donor12  |
| Volunteer | moon12@gmail.com | Tasu12   |


## ✨ Key Features

- **Role-Based Access Control (RBAC)**: Distinct permissions for Donors, Volunteers & Admins.

- **Search & Filter**: Advanced search for blood requests by Blood Group, District, and Upazila.

- **Donation Management**: Create, Edit, and Track blood donation requests in real-time.

- **Secure Payments**: Integrated Stripe gateway for platform funding and community support.

- **Security**: Middleware-protected API endpoints using Firebase Admin SDK.


## ⚙️ Installation & Setup

1. Clone the repository:

```Bash
git clone <your-repo-url>
cd client
```

2. Install dependencies:

```Bash
npm install
```

3. Configure Environment Variables (.env):

```bash
Code snippet
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_API_URL=https://bloodapp2.vercel.app
```

4. Run Development Mode:

```Bash
npm run dev
```

## 📄 License & Purpose

This project is not licensed for commercial use. It was developed as a technical showcase to demonstrate mastery of:

- Complex Role-Based Dashboards

- Firebase Admin SDK & Security

- Stripe Payment Integration

- MongoDB Aggregation


## 🌟 Support & Connect

If you found this project helpful or learned something new from the implementation, please consider giving this repository a Star ⭐!

## 🛠️ Need Customization or Upgrades?
Looking to scale this platform or need help with a similar MERN stack deployment? I'm open to collaborations and technical consultations.

Let's build something impactful together!

- Developer: Taoshiflex
