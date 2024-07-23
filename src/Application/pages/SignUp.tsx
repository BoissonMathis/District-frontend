import { useNavigate } from "react-router-dom";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
import { SignUpForm } from "../componants/SignUpForm";
import { useEffect } from "react";

export function SignUp() {
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
    <div className="col gap-6 items-center justify-center h-screen b-beige box-border">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">S'inscrire</h2>
      <SignUpForm />
    </div>
  );
}
