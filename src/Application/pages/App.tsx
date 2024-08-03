import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserConnected } from "../../Module/Observable/UserConnected.observable";
import {
  Token,
  useUserToken,
} from "../../Module/Observable/UserToken.observable";
import { getUserConnectedPosts } from "../../Module/Observable/UserConnectedPosts.observable";

export const App = () => {
  const userConnected = useUserConnected();
  let user = useUserConnected();
  let token = useUserToken();
  const navigate = useNavigate();

  return (
    <div className="b-beige">
      <p>Bienvenue {userConnected.username}</p>
      <button
        onClick={() => {
          getUserConnectedPosts(user._id, token as Token, 1);
        }}
      >
        test get posts
      </button>
    </div>
  );
};
