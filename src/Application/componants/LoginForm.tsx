import { useNavigate } from "react-router-dom";
import { postLoginUser } from "../../Module/Observable/UserConnected.obesrvable";
import { useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div>
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
      <a onClick={() => navigate("/passwordForget")} className="form-a">
        Mot de passe oublié ?
      </a>
      <div className="auth-input-checkbox mb-12">
        <input type="checkbox" name="remember" id="remember" />
        <label htmlFor="remember">Se souvenir de moi</label>
      </div>
      <button
        className="auth-btn mb-4"
        onClick={() => postLoginUser(username, password)}
      >
        Valider
      </button>
      <a className="form-a" onClick={() => navigate("/signup")}>
        Pas encore inscrit ? S'inscrire
      </a>
    </div>
  );
}
