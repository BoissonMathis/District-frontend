import { useNavigate } from "react-router-dom";
import { Comment } from "../../../Module/Observable/UserConnectedComments.observable";
import { BrownLine } from "../BrownLine";
import { FaCommentAlt } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";

type CommentProps = {
  comment: Comment;
};

export function CommentComposant(props: CommentProps) {
  const navigate = useNavigate();
  let comment = props.comment;
  let user = comment.user;
  return (
    <div>
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
        className="pl-8 pr-8 pb-4 pt-4 cursor-pointer"
        onClick={() => navigate(`/post/${comment.post._id}`)}
      >
        <span>{comment.contentText}</span>
      </div>
      <div className="flex justify-end gap-8 pr-8 pb-4">
        <div className="flex flex-col items-center">
          <FaCommentAlt />
          <span>{comment.answer ? comment.answer.length : 0}</span>
        </div>
        <div className="flex flex-col items-center">
          <IoFootball />
          <span>{comment.like.length}</span>
        </div>
      </div>
      <BrownLine />
    </div>
  );
}
