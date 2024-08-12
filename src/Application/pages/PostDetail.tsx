import { FaCommentAlt } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { BrownLine } from "../componants/BrownLine";
import { useParams } from "react-router-dom";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
import { useEffect, useState } from "react";
import { Post } from "../../Module/Observable/UserConnectedPosts.observable";

export function PostDetail() {
  const [post, setPost] = useState<Post | null>(null);
  const token = useUserToken();
  const { id } = useParams<{ id: string }>();

  const getPostToDisplay = async () => {
    if (token && id) {
      try {
        const response = await AxiosService.getOnePostById(id, token);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  useEffect(() => {
    getPostToDisplay();
  }, [token, id]);

  return (
    <div className="w-full">
      <div className="flex self-center w-[70%] p-6 mx-auto">
        {post ? (
          <div className="w-full">
            <div className="flex gap-4 items-center">
              <img
                src={post.user.profil_image}
                alt=""
                className="user-profil-picture-xs"
              />
              <span>
                {post.user.username} - {post.user.status}
              </span>
            </div>
            <div className="p-8">
              <span>{post.contentText}</span>
            </div>
            <div className="flex gap-16 justify-center">
              <div className="flex flex-col items-center">
                <FaCommentAlt />
                <span>{post.comments ? post.comments.length : 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <IoFootball />
                <span>{post.like.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <BiRepost />
                <span>{post.repost.length}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <BrownLine />
      <div className="flex justify-center">
        {post && post.comments && post.comments.length > 0 ? (
          <p>{post.comments.length}</p>
        ) : (
          <span className="pt-8">Aucun commentaire</span>
        )}
      </div>
    </div>
  );
}
