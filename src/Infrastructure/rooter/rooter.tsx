import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/pages/Login";
import { SignUp } from "../../Application/pages/SignUp";
import { PasswordForget } from "../../Application/pages/PasswordForget";
import { App } from "../../Module/App";
import { Layout } from "../../Application/layout/Layout";

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
    ],
  },
]);
