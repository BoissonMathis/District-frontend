import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewUser } from "../../Module/Observable/UserConnected.obesrvable";

export function SignUpForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("joueur");
  const [termsOfUseChecked, setTermsOfUseChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  /// faire la partie condition d'utilisation (si open : overlay visible, sinon invisible)
  return (
    <div className="col items-center justify-center">
      <div className="auth-input-text-form mb-8">
        <label htmlFor="email">Email</label>
        <input
          className="auth-input-text"
          type="text"
          id="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div className="auth-input-text-form mb-8">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          className="auth-input-text"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div className="auth-input-text-form mb-8">
        <label htmlFor="password">Mot de passe</label>
        <input
          className="auth-input-text"
          type="text"
          id="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div className="auth-input-text-form mb-4">
        <label htmlFor="confirm-password">Confirmer le mot de passe</label>
        <input
          className="auth-input-text"
          type="text"
          id="confirm-password"
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
      </div>
      <div className="auth-input-checkbox mb-4">
        <input
          type="checkbox"
          id="remember"
          onChange={() => setTermsOfUseChecked(!termsOfUseChecked)}
        />
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
          id="new-user-status-list"
          className="w-auto border-2 rounded-xl border-soft-brown pl-1 pb-1"
          onChange={(e) => setStatus(e.currentTarget.value)}
        >
          <option value="educateur">éducateur</option>
          <option value="coach">coach</option>
          <option value="joueur">joueur</option>
          <option value="supporter">supporter</option>
        </select>
      </div>
      <button
        className="auth-btn mb-4"
        onClick={() =>
          postNewUser(
            email,
            username,
            password,
            confirmPassword,
            status,
            termsOfUseChecked
          )
        }
      >
        S'inscrire
      </button>
      <a className="form-a" onClick={() => navigate("/login")}>
        S'authentifier
      </a>
    </div>
  );
}
