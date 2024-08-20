import { FaCommentAlt } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { BrownLine } from "../../componants/BrownLine";
import { useParams } from "react-router-dom";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";
import { useEffect, useState } from "react";
import { Post } from "../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import {
  cancelrepost,
  dislike,
  like,
  repost,
} from "../../../Module/Observable/userConnected/UserConnected.observable";

export function PostDetail() {
  const [post, setPost] = useState<Post | null>(null);
  const [userId, setUserId] = useState();
  const [postReadOnly, setPostReadOnly] = useState<boolean>(false);
  const [reposted, setReposted] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
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

  const handleRepostClick = () => {
    if (reposted) {
      cancelrepost(userId!, post!._id, token!);
    } else {
      repost(userId!, post!._id, token!);
    }
    setReposted(!reposted);
  };

  const handleLikeClick = () => {
    if (liked) {
      dislike(userId!, post!._id, token!);
    } else {
      like(userId!, post!._id, token!);
    }
    setLiked(!liked);
  };

  useEffect(() => {
    if (post && post.user._id !== userId!) {
      setPostReadOnly(true);
      post.like.includes(userId!!!) && setLiked(true);
      post.repost.includes(userId!!!) && setReposted(true);
    }
  }, [post]);

  useEffect(() => {
    getPostToDisplay();
    setUserId(localStorage.userId);
  }, [token, id, localStorage]);

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
              <div
                className={`flex flex-col items-center${
                  postReadOnly && " cursor-pointer"
                }${postReadOnly && liked ? " c-brown" : ""}`}
                onClick={postReadOnly ? handleLikeClick : undefined}
              >
                <IoFootball />
                <span>{liked ? post.like.length + 1 : post.like.length}</span>
              </div>
              <div
                className={`flex flex-col items-center${
                  postReadOnly && " cursor-pointer"
                }${postReadOnly && reposted ? " c-brown" : ""}`}
                onClick={postReadOnly ? handleRepostClick : undefined}
              >
                <BiRepost />
                <span>
                  {reposted ? post.repost.length + 1 : post.repost.length}
                </span>
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
