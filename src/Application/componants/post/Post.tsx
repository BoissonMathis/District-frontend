import { Post } from "../../../Module/Observable/UserConnectedPosts.observable";
import { FaCommentAlt } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { BrownLine } from "../BrownLine";
import { useNavigate } from "react-router-dom";

type PostProps = {
  post: Post;
};

export function PostComponant(props: PostProps) {
  const navigate = useNavigate();
  let postInfo = props.post;
  let user = postInfo.user;

  return (
    <div className="flex flex-col gap-4 min-w-full b-breige ">
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
      <div
        className="pl-8 pr-8 cursor-pointer"
        onClick={() => navigate(`/post/${postInfo._id}`)}
      >
        <span>{postInfo.contentText}</span>
      </div>
      <div className="flex gap-16 justify-center">
        <div className="flex flex-col items-center">
          <FaCommentAlt />
          <span>{postInfo.comments ? postInfo.comments.length : 0}</span>
        </div>
        <div className="flex flex-col items-center">
          <IoFootball />
          <span>{postInfo.like.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <BiRepost />
          <span>{postInfo.repost.length}</span>
        </div>
      </div>
      <BrownLine />
    </div>
  );
}
