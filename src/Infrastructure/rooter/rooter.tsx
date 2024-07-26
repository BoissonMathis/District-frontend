import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/pages/Login";
import { SignUp } from "../../Application/pages/SignUp";
import { PasswordForget } from "../../Application/pages/PasswordForget";
import { App } from "../../Application/pages/App";
import { Layout } from "../../Application/layout/Layout";
import { UserProfil } from "../../Application/componants/UserProfil";

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
        element: <UserProfil />,
      },
    ],
  },
]);
