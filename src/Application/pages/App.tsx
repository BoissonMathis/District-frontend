import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserConnected } from "../../Module/Observable/UserConnected.observable";
import { useUserToken } from "../../Module/Observable/UserToken.observable";

export const App = () => {
  const userConnected = useUserConnected();
  let token = useUserToken();
  const navigate = useNavigate();

  return (
    <div className="b-beige">
      <p>Bienvenue {userConnected.username}</p>
    </div>
  );
};
