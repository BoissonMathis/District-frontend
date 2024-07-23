import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  /// faire la partie condition d'utilisation (si open : overlay visible, sinon invisible)
  return (
    <>
      <form action="" className="col">
        <div className="auth-input-text-form mb-8">
          <label htmlFor="email">Email</label>
          <input className="auth-input-text" type="text" id="email" />
        </div>
        <div className="auth-input-text-form mb-8">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input className="auth-input-text" type="text" id="username" />
        </div>
        <div className="auth-input-text-form mb-8">
          <label htmlFor="password">Mot de passe</label>
          <input className="auth-input-text" type="text" id="password" />
        </div>
        <div className="auth-input-text-form mb-6">
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            className="auth-input-text"
            type="text"
            id="confirm-password"
          />
        </div>
        <div className="auth-input-checkbox mb-8">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">
            J'ai lu et j'accepte les conditions d'utilisation
          </label>
          <span
            className="border-2 border-brown rounded-2xl pl-2 pr-2 b-soft-brown cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            ?
          </span>
        </div>
        <div className="auth-input-select mb-4">
          <label htmlFor="new-user-status-list">Vous êtes </label>
          <select
            name="new-user-status-list"
            className="w-2/5 border-2 rounded-xl border-soft-brown pl-1"
          >
            <option value="educateur">éducateur</option>
            <option value="coach">coach</option>
            <option value="joueur">joueur</option>
            <option value="supporter">supporter</option>
          </select>
        </div>
        <button className="auth-btn mb-4">S'inscrire</button>
        <a className="form-a" onClick={() => navigate("/login")}>
          S'authentifier
        </a>
      </form>
    </>
  );
}
