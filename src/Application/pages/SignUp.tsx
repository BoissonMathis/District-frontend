import { SignUpForm } from "../componants/SignUpForm";

export function SignUp() {
  return (
    <div className="col gap-6 items-center justify-center h-screen b-beige box-border">
      <h1 className="text-8xl c-brown">DISTRICT</h1>
      <h2 className="text-xl">S'inscrire</h2>
      <SignUpForm />
    </div>
  );
}
