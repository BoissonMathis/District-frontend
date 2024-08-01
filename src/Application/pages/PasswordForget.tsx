import { PasswordForgetForm } from "../componants/connection/PasswordForgetForm";

export function PasswordForget() {
  return (
    <div className="col gap-16 items-center justify-center h-screen b-beige">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">Mot de passe oublié</h2>
      <span>
        Veuillez renseigner vote Email que nous puissions vous envoyer votre mot
        de passe !
      </span>
      <PasswordForgetForm />
    </div>
  );
}
