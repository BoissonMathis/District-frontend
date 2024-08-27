import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/pages/Login";
import { SignUp } from "../../Application/pages/SignUp";
import { PasswordForget } from "../../Application/pages/PasswordForget";
import Layout from "../../Application/layout/Layout";
import { Settings } from "../../Application/pages/Settings";
import { ProtectedApp } from "../../Application/pages/App/ProtectedApp";
import { ProtectedUserProfil } from "../../Application/pages/UserProfil/ProtectedUserProfil";
import { ProtectedEvents } from "../../Application/pages/Events/ProtectedEvents";
import { ProtectedPostDetail } from "../../Application/pages/PostDetail/ProtectedPostDetail";
import { ProtectedEventDetail } from "../../Application/pages/EventDetail/ProtectedEventDetail";
import { ProtectedCommentDetail } from "../../Application/pages/CommentDetail/ProtectedCommentDetail";

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
        element: <ProtectedUserProfil />,
      },
      {
        path: "/events",
        element: <ProtectedEvents />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/post/:id",
        element: <ProtectedPostDetail />,
      },
      {
        path: "/post/comment/:id",
        element: <ProtectedCommentDetail />,
      },
      {
        path: "/evenement/:id",
        element: <ProtectedEventDetail />,
      },
    ],
  },
]);
