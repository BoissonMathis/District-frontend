import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserConnected } from "../../../Module/Observable/UserConnected.observable";
import {
  Token,
  useUserToken,
} from "../../../Module/Observable/UserToken.observable";
import { getUserConnectedPosts } from "../../../Module/Observable/UserConnectedPosts.observable";
import { UserFeed } from "../../componants/user/UserFeed";

export function App() {
  const userConnected = useUserConnected();
  let user = useUserConnected();
  let token = useUserToken();
  const navigate = useNavigate();
  // console.log(localStorage);

  return (
    <div className="flex flex-col b-beige w-full items-center pt-8 pb-8">
      <UserFeed />
    </div>
  );
}
