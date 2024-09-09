import { ImCross } from "react-icons/im";
import { AiFillPicture } from "react-icons/ai";
import { useUserConnected } from "../../../Module/Observable/userConnected/UserConnected.observable";
import { useState } from "react";
import {
  setUserConnectedPosts,
  useUserConnectedPosts,
  PostInfos,
} from "../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import {
  postUserPost,
  setPostForm,
} from "../../../Module/Observable/modal/PostForm.observable";

export function PostNewPostForm() {
  const [formContentText, setFormContentText] = useState<string>("");
  const [formContentImage, setFormContentImage] = useState<File | null>(null);
  const user_connected = useUserConnected();
  const posts = useUserConnectedPosts();

  const handlePost = async () => {
    try {
      const newPost = await postUserPost(
        user_connected._id,
        formContentText,
        localStorage.token,
        formContentImage
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
            src={user_connected.profil_image}
            alt=""
            className="user-profil-picture-xs"
          />
          <span>
            {user_connected.username} - {user_connected.status}
          </span>
        </div>
        <ImCross onClick={() => setPostForm()} className="cursor-pointer" />
      </div>
      <input
        type="text"
        className="h-24 b-beige rounded-xl pb-16 pl-4 border-2 border-brown resize-none overflow-y-auto"
        placeholder="De quoi voulez-vous parler ?"
        onChange={(e) => setFormContentText(e.currentTarget.value)}
      />
      <div className="flex gap-8 items-center justify-center">
        <div className="flex flex-col items-center">
          <label
            htmlFor="input-contentImage"
            className="flex flex-col items-center cursor-pointer"
          >
            <AiFillPicture />
            <span>Ajouter une image</span>
          </label>
          <input
            type="file"
            id="input-contentImage"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                setFormContentImage(file);
              }
            }}
          />
        </div>
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
