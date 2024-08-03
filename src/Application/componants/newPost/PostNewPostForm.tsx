import { ImCross } from "react-icons/im";
import { AiFillPicture } from "react-icons/ai";
import { useUserConnected } from "../../../Module/Observable/UserConnected.observable";
import {
  postUserPost,
  setPostForm,
} from "../../../Module/Observable/modal/PostForm.observable";
import { useState } from "react";
import {
  Token,
  useUserToken,
} from "../../../Module/Observable/UserToken.observable";
import {
  setUserConnectedPosts,
  useUserConnectedPosts,
} from "../../../Module/Observable/UserConnectedPosts.observable";

export function PostNewPostForm() {
  const [formContentText, setFormcContentText] = useState<string>("");
  const user_connected = useUserConnected();
  const token = useUserToken();
  const user = useUserConnected();
  const posts = useUserConnectedPosts();
  return (
    <div className="flex flex-col gap-4 h-fit w-2/5 p-4 rounded-xl border-2 border-brown b-soft-brown absolute bottom-16 right-36 z-10">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={user.profil_image}
            alt=""
            className="user-profil-picture-xs"
          />
          <span>
            {user.username} - {user.status}
          </span>
        </div>
        <ImCross onClick={() => setPostForm()} className="cursor-pointer" />
      </div>
      <input
        type="text"
        className="h-24 b-beige rounded-xl pb-16 pl-4 border-2 border-brown resize-none overflow-y-auto"
        placeholder="De quoi voulez-vous parler ?"
        onChange={(e) => setFormcContentText(e.currentTarget.value)}
      />
      <div className="flex gap-8 items-center justify-center">
        <div className="flex flex-col items-center">
          <AiFillPicture />
          <span>ajouter une image</span>
        </div>
        <input
          type="text"
          className="pl-4 b-beige rounded-xl border-2 border-brown w-3/5"
          placeholder="Ajoutez des #hashtags"
        />
      </div>
      <button
        onClick={() => {
          postUserPost(user_connected._id, formContentText, token as Token);
        }}
        className="flex justify-center self-center w-64 b-brown text-black font-bold py-2 px-4 rounded-xl"
      >
        publier
      </button>
    </div>
  );
}
