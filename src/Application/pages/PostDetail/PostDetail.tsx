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
  useUserConnected,
} from "../../../Module/Observable/userConnected/UserConnected.observable";
import { PostDetailComment } from "./PostDetailComment";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const user = useUserConnected();
  const token = useUserToken();
  const [post, setPost] = useState<Post | null>(null);
  const [reposted, setReposted] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  const postReadOnly = post && post.user._id !== user._id;

  const getPostToDisplay = async () => {
    if (token && id) {
      try {
        const response = await AxiosService.getOnePostById(id, token);
        if (response.status === 200) {
          const fetchedPost = response.data;
          setPost(fetchedPost);
          setLiked(fetchedPost.like.includes(user._id));
          setReposted(fetchedPost.repost.includes(user._id));
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  const handleRepostClick = async () => {
    if (post) {
      try {
        if (reposted) {
          await cancelrepost(user._id!, post._id, token!);
        } else {
          await repost(user._id!, post._id, token!);
        }
        await getPostToDisplay();
      } catch (error) {
        console.error("Error handling repost:", error);
      }
    }
  };

  const handleLikeClick = async () => {
    if (post) {
      try {
        if (liked) {
          await dislike(user._id!, post._id, token!);
        } else {
          await like(user._id!, post._id, token!);
        }
        await getPostToDisplay();
      } catch (error) {
        console.error("Error handling like:", error);
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
              <div
                className={`flex flex-col items-center ${
                  postReadOnly ? "cursor-pointer" : ""
                } ${liked ? "c-brown" : ""}`}
                onClick={postReadOnly ? handleLikeClick : undefined}
              >
                <IoFootball />
                <span>{post.like.length}</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  postReadOnly ? "cursor-pointer" : ""
                } ${reposted ? "c-brown" : ""}`}
                onClick={postReadOnly ? handleRepostClick : undefined}
              >
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
      <PostDetailComment post_id={id!} />
    </div>
  );
}
