import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserConnected } from "../../../Module/Observable/UserConnected.observable";
import {
  Token,
  useUserToken,
} from "../../../Module/Observable/UserToken.observable";
import { getUserConnectedPosts } from "../../../Module/Observable/UserConnectedPosts.observable";

export function App() {
  const userConnected = useUserConnected();
  let user = useUserConnected();
  let token = useUserToken();
  const navigate = useNavigate();
  // console.log(localStorage);

  return (
    <div className="b-beige">
      <p>Bienvenue {userConnected.username}</p>
    </div>
  );
}
