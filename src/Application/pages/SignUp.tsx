import { useNavigate } from "react-router-dom";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
import { SignUpForm } from "../componants/connection/SignUpForm";
import { useEffect } from "react";
import { ErrorMessage } from "../componants/ErrorMessage";
import { setError } from "../../Module/Observable/Errors.observable";

export function SignUp() {
  const token = useUserToken();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    if (token && token.token !== null) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="col gap-4 items-center justify-center h-screen b-beige box-border">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">S'inscrire</h2>
      <SignUpForm />
      <ErrorMessage />
    </div>
  );
}
