import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "./Observable/UserConnected.observable";

const Auth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const ComponentAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        authUser(userId, { token: token });
      } else {
        navigate("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentAuth;
};

export default Auth;
