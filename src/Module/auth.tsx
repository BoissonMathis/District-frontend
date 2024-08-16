import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  authUser,
  useUserConnected,
} from "./Observable/userConnected/UserConnected.observable";

const Auth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const ComponentAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const user = useUserConnected();
    var token = localStorage.getItem("token");
    var userId = localStorage.getItem("userId");
    var remember_me = localStorage.getItem("remember_me");

    // useEffect(() => {
    //   console.log("auth délenché");
    //   if (user && user._id == "") {
    //     if (token && userId) {
    //       authUser(userId, { token: token });
    //     } else {
    //       navigate("/login");
    //     }
    //   } else {
    //     navigate("/login");
    //   }
    // }, [token, userId]);

    return <WrappedComponent {...props} />;
  };

  return ComponentAuth;
};

export default Auth;
