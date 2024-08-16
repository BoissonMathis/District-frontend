import { ImCross } from "react-icons/im";
import { AiFillPicture } from "react-icons/ai";
import { setUpdateFormUser } from "../../../../Module/Observable/modal/UpdateFormUser.observable";
import {
  putUpdateUser,
  useUserConnected,
} from "../../../../Module/Observable/userConnected/UserConnected.observable";
import { useEffect, useState } from "react";
import {
  Token,
  useUserToken,
} from "../../../../Module/Observable/userConnected/UserToken.observable";

export function UpdateUserForm() {
  const user = useUserConnected();
  const token = useUserToken();
  const [username, setUsername] = useState<string>(user.username);
  const [bio, setBio] = useState<string>(user.bio);

  useEffect(() => {
    setUsername(user.username);
    setBio(user.bio);
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center b-gray h-full relative z-20">
      <div className="flex flex-col gap-4 pt-4 items-center border-2 border-brown b-beige w-3/5 h-4/5 h-16 rounded-xl relative">
        <ImCross
          className="cursor-pointer absolute top-4 right-4 z-30"
          onClick={() => setUpdateFormUser()}
        />
        <div className="flex w-full justify-center relative">
          <img
            src={user.banner_image}
            alt=""
            className="w-[85%] h-32 object-cover rounded-xl opacity-50 border-2 border-brown"
          />
          <AiFillPicture className="w-16 h-16 absolute top-[25%]" />
        </div>
        <div className="flex w-full justify-center relative">
          <img
            src={user.profil_image}
            alt=""
            className="user-profil-picture-xl opacity-50"
          />
          <AiFillPicture className="w-6 h-6 absolute top-[30%]" />
        </div>
        <input
          type="text"
          defaultValue={user.username}
          className="h-8 w-3/5 b-soft-brown rounded-xl pl-4 border-2 border-brown"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />

        <textarea
          defaultValue={user.bio}
          className="h-32 w-3/5 b-soft-brown rounded-xl p-4 border-2 border-brown resize-none overflow-y-auto"
          placeholder="Entrez votre texte ici..."
          onChange={(e) => setBio(e.currentTarget.value)}
        />
        <button
          className="auth-btn"
          onClick={() => {
            console.log({ username: username, bio: bio }),
              putUpdateUser(user._id, token as Token, {
                username: username,
                bio: bio,
              });
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
}
