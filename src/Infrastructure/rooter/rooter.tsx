import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/pages/Login";
import { SignUp } from "../../Application/pages/SignUp";
import { PasswordForget } from "../../Application/pages/PasswordForget";
import { ProtectedApp } from "../../Application/pages/App/ProtectedApp"; // Utilisez le composant protégé directement
import Layout from "../../Application/layout/Layout";
import UserProfilPage from "../../Application/pages/UserProfil/UserProfil";
import Events from "../../Application/pages/Events";
import { Settings } from "../../Application/pages/Settings";
import { PostDetail } from "../../Application/pages/PostDetail";
import { EventDetail } from "../../Application/pages/EventDetail";

export const rooter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/password-forget",
    element: <PasswordForget />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedApp />,
      },
      {
        path: "/profil/:id",
        element: <UserProfilPage />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
      {
        path: "/evenement/:id",
        element: <EventDetail />,
      },
    ],
  },
]);
