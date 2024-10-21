import { useEffect } from "react";
import { LoginForm } from "../componants/connection/LoginForm";
import { useUserToken } from "../../Module/Observable/userConnected/UserToken.observable";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../componants/ErrorMessage";
import { setError } from "../../Module/Observable/Errors.observable";

export function Login() {
  const token = useUserToken();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    if (token && token.token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen b-beige px-4">
      <h1 className="text-6xl md:text-8xl text-center c-brown">DISTRICT</h1>
      <h2 className="text-lg md:text-xl text-center">S'identifier</h2>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
      <ErrorMessage />
    </div>
  );
}
