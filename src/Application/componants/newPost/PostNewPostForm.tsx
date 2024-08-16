import { ImCross } from "react-icons/im";
import { AiFillPicture } from "react-icons/ai";
import { useUserConnected } from "../../../Module/Observable/userConnected/UserConnected.observable";
import { useState } from "react";
import {
  Token,
  useUserToken,
} from "../../../Module/Observable/userConnected/UserToken.observable";
import {
  setUserConnectedPosts,
  useUserConnectedPosts,
  Post,
  PostInfos,
  userConnectedPosts$,
} from "../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import {
  postUserPost,
  setPostForm,
} from "../../../Module/Observable/modal/PostForm.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";

export function PostNewPostForm() {
  const [formContentText, setFormcContentText] = useState<string>("");
  const user_connected = useUserConnected();
  const token = useUserToken();
  const user = useUserConnected();
  const posts = useUserConnectedPosts();

  const handlePost = async () => {
    try {
      const newPost = await postUserPost(
        user_connected._id,
        formContentText,
        // token as Token
        localStorage.token
      );
      if (newPost) {
        const updatedPosts: PostInfos = {
          count: 1,
          page: posts ? posts.page : 1,
          posts: [newPost],
        };
        setUserConnectedPosts(updatedPosts);
        setPostForm();
      }
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-fit w-2/5 p-4 rounded-xl border-2 border-brown b-soft-brown fixed bottom-16 right-36 z-10">
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
        onClick={handlePost}
        className="flex justify-center self-center w-64 b-brown text-black font-bold py-2 px-4 rounded-xl"
      >
        publier
      </button>
    </div>
  );
}
