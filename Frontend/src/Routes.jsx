import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import ProfileEnhanced from "./components/user/ProfileEnhanced.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import DashboardEnhanced from "./components/dashboard/DashboardEnhanced.jsx";
import RepositoriesEnhanced from "./components/repo/RepositoriesEnhanced.jsx";
import IssuesEnhanced from "./components/issue/IssuesEnhanced.jsx";

import { useAuth } from "./authContext.jsx";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    // Restore session
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    // Not logged in? Redirect to Login
    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }
  }, [currentUser, navigate, setCurrentUser]);

  const element = useRoutes([
    {
      path: "/",
      element: <DashboardEnhanced />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <ProfileEnhanced />,
    },
    {
      path: "/repositories",
      element: <RepositoriesEnhanced />,
    },
    {
      path: "/issues",
      element: <IssuesEnhanced />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
