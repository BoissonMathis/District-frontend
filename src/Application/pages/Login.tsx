import { useEffect } from "react";
import { LoginForm } from "../componants/connection/LoginForm";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
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
  }, [token]);

  return (
    <div className="col gap-16 items-center justify-center h-screen b-beige">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">S'identifier</h2>
      <LoginForm />
      <ErrorMessage />
    </div>
  );
}
