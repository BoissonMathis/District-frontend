import { ImCross } from "react-icons/im";
import { setUpdateFormUser } from "../../../Module/Observable/modal/UpdateFormUser.observable";
import { useUserConnected } from "../../../Module/Observable/UserConnected.observable";

export function UpdateUserForm() {
  const user = useUserConnected();
  return (
    <div className="flex flex-col justify-center items-center b-gray-70 h-full">
      <div className="flex flex-col gap-4 pt-4 items-center border-2 border-brown b-beige w-3/5 h-4/5 h-16 rounded-xl relative">
        <ImCross
          className="cursor-pointer absolute top-4 right-4"
          onClick={() => setUpdateFormUser()}
        />
        <img
          src={user.banner_image}
          alt=""
          className="w-[85%] h-32 object-cover rounded-xl"
        />
        <img
          src={user.profil_image}
          alt=""
          className="user-profil-picture-xl"
        />
        <input
          type="text"
          defaultValue={user.username}
          className="h-8 w-3/5 b-soft-brown rounded-xl pl-4 border-2 border-brown"
        />

        <textarea
          defaultValue={user.bio}
          className="h-32 w-3/5 b-soft-brown rounded-xl p-4 border-2 border-brown resize-none overflow-y-auto"
          placeholder="Entrez votre texte ici..."
        />
        <button className="auth-btn">Valider</button>
      </div>
    </div>
  );
}
