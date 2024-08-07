import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/pages/Login";
import { SignUp } from "../../Application/pages/SignUp";
import { PasswordForget } from "../../Application/pages/PasswordForget";
import { App } from "../../Application/pages/App";
import { Layout } from "../../Application/layout/Layout";
import { UserProfilPage } from "../../Application/pages/UserProfil";
import { Events } from "../../Application/pages/Events";
import { Settings } from "../../Application/pages/Settings";

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
        element: <App />,
      },
      {
        path: "/profil",
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
    ],
  },
]);
