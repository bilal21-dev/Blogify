import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Intro from "./Components/Intro.jsx";
import Login from "./Components/Register/Login.jsx";
import SignUp from "./Components/Register/Signup.jsx";
import Post from "./Components/Home/Post.jsx";
import Layout from "./Layout.jsx";
import { AuthProvider } from "./Components/AuthContext.jsx";
import Profile from "./Components/ProfilePage/Profile.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import About from "./Components/About.jsx/About.jsx";
import AppFaq from "./Components/FAQ/AppFaq.jsx";
import { ProfileSettingsProvider } from "./Components/ProfileSettingsContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Intro screen */}
      <Route index element={<Intro />} />
      {/* Home Route */}
      <Route path="home" element={<Post />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="FAQ" element={<AppFaq />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfileSettingsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ProfileSettingsProvider>

  </StrictMode>
);
