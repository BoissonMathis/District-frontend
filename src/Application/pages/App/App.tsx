import { useEffect } from "react";
import { UserFeed } from "../../componants/user/UserFeed";
import { getUserConnectedFeed } from "../../../Module/Observable/userConnected/UserConnectedFeed.observable";

export function App() {
  let user_id = localStorage.userId;
  let token = localStorage.token;

  useEffect(() => {
    getUserConnectedFeed(user_id, token);
  }, []);
  return (
    <div className="flex flex-col b-beige w-full items-center pt-8 pb-8">
      <UserFeed />
    </div>
  );
}
