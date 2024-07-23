import { useEffect } from "react";
import { LoginForm } from "../componants/LoginForm";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
import { useNavigate } from "react-router-dom";
import { useError } from "../../Module/Observable/Errors.observable";

export function Login() {
  const token = useUserToken();
  const error = useError();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (token && token.token !== null) {
      console.log("connected");
      navigate("/");
    }
  }, [token]);

  console.log("LAAAAA", error);

  return (
    <div className="col gap-16 items-center justify-center h-screen b-beige">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">S'identifier</h2>
      <LoginForm />
      {error?.status != 0 && (
        <p className="absolute bottom-12 text-red-500 text-sm">
          {error?.message}
        </p>
      )}
    </div>
  );
}
