import { useEffect, useState } from "react";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import {
  Comment,
  CommentsInfo,
} from "../../../Module/Observable/userConnected/UserConnectedComments.observable";
import { BrownLine } from "../BrownLine";
import { FaCommentAlt } from "react-icons/fa";
import {
  dislike,
  like,
  useUserConnected,
} from "../../../Module/Observable/userConnected/UserConnected.observable";
import { IoFootball } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type PostDetailCommentProps = {
  id: string;
  comments: CommentsInfo;
};

export function DetailCommentSection(props: PostDetailCommentProps) {
  const commentToDisplay = props.comments;
  console.log("comment to display", commentToDisplay);
  const token = useUserToken();
  const id = props.id;
  const user = useUserConnected();
  const navigate = useNavigate();

  // const handleLikeClick = async (comment: Comment) => {
  //   try {
  //     if (comment.like.includes(user._id)) {
  //       await dislike(user._id!, post._id, token!);
  //     } else {
  //       await like(user._id!, post._id, token!);
  //     }
  //     await getPostToDisplay();
  //   } catch (error) {
  //     console.error("Error handling like:", error);
  //   }
  // };

  return (
    <div>
      {commentToDisplay &&
      commentToDisplay.comments &&
      commentToDisplay?.comments.length > 0 ? (
        commentToDisplay?.comments.map(
          (comment) =>
            !comment.answer && (
              <div
                key={comment._id}
                className="flex self-center justify-center w-[50%] p-6 mx-auto"
              >
                <div className="w-full">
                  <div className="flex gap-4 items-center">
                    <img
                      src={comment.user.profil_image}
                      alt=""
                      className="user-profil-picture-xs"
                    />
                    <span>
                      {comment.user.username} - {comment.user.status}
                    </span>
                  </div>
                  <div
                    className="p-6"
                    onClick={() => navigate(`/post/comment/${comment._id}`)}
                  >
                    {comment.contentText}
                  </div>
                  <div className="flex gap-16 justify-center">
                    <div className="flex flex-col items-center">
                      <FaCommentAlt />
                      <span>{comment.answer ? comment.answer.length : 0}</span>
                    </div>
                    <div
                      className={`flex flex-col items-center`}
                      //   ${
                      //   comment._id == user._id && " cursor-pointer"
                      // }${comment._id == user._id && liked ? " c-brown" : ""}
                      // onClick={comment._id == user._id ? handleLikeClick : undefined}
                    >
                      <IoFootball />
                      <span>{comment.like.length}</span>
                    </div>
                  </div>
                </div>
                <BrownLine />
              </div>
            )
        )
      ) : (
        <span className="flex justify-center pt-8">Aucun commentaire</span>
      )}
    </div>
  );
}
