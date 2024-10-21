import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewUser } from "../../../Module/Observable/userConnected/UserConnected.observable";

export function SignUpForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("joueur");
  const [termsOfUseChecked, setTermsOfUseChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeModal = (e: any) => {
    if (e.target.id === "overlay") {
      setIsOpen(false);
    }
  };

  const acceptAndClose = () => {
    setTermsOfUseChecked(true);
    setIsOpen(false);
  };

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
          checked={termsOfUseChecked}
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

      {isOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 relative flex flex-col justify-center items-center text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Bienvenue sur District !
            </h2>
            <p>
              En utilisant notre plateforme, vous acceptez nos conditions
              d'utilisation et notre politique de confidentialité. Voici un
              résumé des principaux points :
            </p>
            <ol className="mb-4 mt-4 text-sm text-left list-decimal pl-5">
              <li>
                <strong>Collecte de données :</strong> Nous collectons certaines
                informations personnelles, telles que votre adresse e-mail et
                votre mot de passe, pour vous offrir une expérience
                personnalisée sur notre réseau social.
              </li>
              <li>
                <strong>Utilisation des données :</strong> Vos données seront
                utilisées pour vous fournir des fonctionnalités et des services
                et améliorer notre plateforme.
              </li>
              <li>
                <strong>Partage des données :</strong> Nous ne partagerons pas
                vos informations personnelles avec des tiers sans votre
                consentement explicite, sauf si cela est nécessaire pour fournir
                nos services ou si nous y sommes légalement obligés.
              </li>
              <li>
                <strong>Protection des données :</strong> Nous prenons des
                mesures de sécurité appropriées pour protéger vos informations
                contre tout accès non autorisé, divulgation, altération ou
                destruction.
              </li>
              <li>
                <strong>Vos droits :</strong> Vous avez le droit d'accéder à vos
                données, de les rectifier, de les supprimer, de limiter leur
                traitement et de les transférer vers un autre service.
              </li>
            </ol>
            <p>
              En acceptant nos conditions d'utilisation et notre politique de
              confidentialité, vous consentez à la collecte, au traitement et à
              l'utilisation de vos données conformément à ces directives.{" "}
            </p>
            <p
              className="underline cursor-pointer text-sm"
              onClick={acceptAndClose}
            >
              Accepter et fermer
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
