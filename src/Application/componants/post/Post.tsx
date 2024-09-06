import {
  deleteOneUserPost,
  Post,
} from "../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import { FaCommentAlt } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { BrownLine } from "../BrownLine";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  cancelrepost,
  dislike,
  like,
  repost,
} from "../../../Module/Observable/userConnected/UserConnected.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { CommentModal } from "../comment/CommentModal";
import { CommentsInfo } from "../../../Module/Observable/userConnected/UserConnectedComments.observable";
import { FaTrashCan } from "react-icons/fa6";

type PostProps = {
  post: Post;
};

export function PostComponent(props: PostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [postReadOnly, setPostReadOnly] = useState<boolean>(false);
  const [reposted, setReposted] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [commented, setCommented] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentsInfo>();
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.token;

  const getComments = async () => {
    if (token && post && post._id) {
      try {
        const response = await AxiosService.getManyComments(
          post._id,
          token,
          1,
          "post"
        );
        console.log("Récupération des commentaires du post", response);
        if (response.status === 200) {
          const update = {
            count: response.data.count,
            page: response.data.page,
            comments: [...response.data.results],
          };
          setComments(update);
          comments?.comments?.some((comment) => comment.user._id === userId) &&
            setCommented(true);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  const handleRepostClick = async () => {
    if (reposted) {
      await cancelrepost(userId!, post!._id, token!);
    } else {
      await repost(userId!, post!._id, token!);
    }
    setReposted((prevReposted) => !prevReposted);
  };

  const handleLikeClick = async () => {
    if (liked) {
      await dislike(userId!, post!._id, "post", token!);
    } else {
      await like(userId!, post!._id, "post", token!);
    }
    setLiked((prevLiked) => !prevLiked);
  };

  useEffect(() => {
    if (localStorage.token && localStorage.userId) {
      setUserId(localStorage.userId);
      AxiosService.getOnePostById(props.post._id, token!).then((res) => {
        if (res.status === 200) {
          setPost(res.data);
          setUser(res.data.user);
          setLiked(res.data.like.includes(localStorage.userId));
          setReposted(res.data.repost.includes(localStorage.userId));
          getComments();
        }
      });
    }
    console.log("a cause de props.post._id, token, liked, reposted");
  }, [props.post._id, token, liked, reposted]);

  useEffect(() => {
    if (post && post.user && post.user._id !== userId!) {
      setPostReadOnly(true);
    }
    console.log("a cause de post || userId");
  }, [post, userId]);

  if (!post || !user) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 min-w-full b-breige">
      <div className="flex justify-between items-center">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => navigate(`/profil/${post!.user._id}`)}
        >
          <img
            src={user!.profil_image}
            alt=""
            className="user-profil-picture-xs"
          />
          <span>
            {user!.username} - {user!.status}
          </span>
        </div>
        {!postReadOnly && (
          <FaTrashCan
            className="cursor-pointer"
            onClick={() => {
              post.user._id == localStorage.userId &&
                deleteOneUserPost(post._id, token);
            }}
          />
        )}
      </div>

      <div
        className="pl-8 pr-8 cursor-pointer"
        onClick={() => navigate(`/post/${post!._id}`)}
      >
        <span>{post!.contentText}</span>
      </div>
      <div className="flex gap-16 justify-center">
        <div
          className={`flex flex-col items-center cursor-pointer ${
            postReadOnly && commented ? " c-brown " : ""
          }`}
          onClick={() => setCommentModal(!commentModal)}
        >
          <FaCommentAlt />
          <span>{comments && comments.count ? comments.count : 0}</span>
        </div>
        <div
          className={`flex flex-col items-center ${
            postReadOnly && " cursor-pointer "
          }${postReadOnly && liked ? " c-brown " : ""}`}
          onClick={postReadOnly ? handleLikeClick : undefined}
        >
          <IoFootball />
          <span>{post!.like.length}</span>
        </div>
        <div
          className={`flex flex-col items-center ${
            postReadOnly && " cursor-pointer "
          } ${postReadOnly && reposted ? " c-brown " : ""}`}
          onClick={postReadOnly ? handleRepostClick : undefined}
        >
          <BiRepost />
          <span>{post!.repost.length}</span>
        </div>
      </div>
      {commentModal && (
        <CommentModal
          user_id={userId!}
          post_id={post._id}
          onSuccess={() => setCommentModal(false)}
        />
      )}
      <BrownLine />
    </div>
  );
}
