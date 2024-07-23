import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserConnected } from "./Observable/UserConnected.obesrvable";

export const App = () => {
  const userConnected = useUserConnected();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <p>Bienvenue {userConnected.username}</p>
    </>
  );
};
