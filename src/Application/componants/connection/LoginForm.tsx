import { useNavigate } from "react-router-dom";
import { postLoginUser } from "../../../Module/Observable/userConnected/UserConnected.observable";
import { useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember_me, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="col items-center justify-center">
      <div className="auth-input-text-form mb-12">
        <label htmlFor="username">Email/Nom d'utilisateur</label>
        <input
          className="auth-input-text"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div className="auth-input-text-form mb-4">
        <label htmlFor="password">Mot de passe</label>
        <input
          className="auth-input-text"
          type="text"
          id="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <a onClick={() => navigate("/password-forget")} className="form-a">
        Mot de passe oublié ?
      </a>
      <div className="auth-input-checkbox mb-8">
        <input
          type="checkbox"
          id="remember"
          onChange={() => setRememberMe(!remember_me)}
        />
        <label htmlFor="remember">Se souvenir de moi</label>
      </div>
      <button
        className="auth-btn mb-4"
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
