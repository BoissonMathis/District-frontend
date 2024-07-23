import { useEffect } from "react";
import { LoginForm } from "../componants/LoginForm";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
import { useNavigate } from "react-router-dom";

export function Login() {
  const token = useUserToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (token && token.token !== null) {
      console.log("connected");
      navigate("/");
    }
  }, [token]);

  return (
    <div className="col gap-16 items-center justify-center h-screen b-beige">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">S'identifier</h2>
      <LoginForm />
    </div>
  );
}
