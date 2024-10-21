import { useNavigate } from "react-router-dom";
import { postLoginUser } from "../../../Module/Observable/userConnected/UserConnected.observable";
import { useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember_me, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <div className="auth-input-text-form mb-12 w-full">
        <label htmlFor="username">Email/Nom d'utilisateur</label>
        <input
          className="auth-input-text w-full"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div className="auth-input-text-form mb-4 w-full">
        <label htmlFor="password">Mot de passe</label>
        <input
          className="auth-input-text w-full"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <a onClick={() => navigate("/password-forget")} className="form-a mb-2">
        Mot de passe oublié ?
      </a>
      <div className="auth-input-checkbox mb-8 flex items-center">
        <input
          type="checkbox"
          id="remember"
          onChange={() => setRememberMe(!remember_me)}
          className="mr-2"
        />
        <label htmlFor="remember">Se souvenir de moi</label>
      </div>
      <button
        className="auth-btn mb-4 w-full"
        onClick={() => postLoginUser(username, password, remember_me)}
      >
        Valider
      </button>
      <a className="form-a" onClick={() => navigate("/sign-up")}>
        Pas encore inscrit ? S'inscrire
      </a>
    </div>
  );
}
