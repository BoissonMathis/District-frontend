import { FaCommentAlt } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import { BrownLine } from "../../componants/BrownLine";
import { useParams } from "react-router-dom";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";
import { useEffect, useState } from "react";
import {
  dislike,
  like,
  useUserConnected,
} from "../../../Module/Observable/userConnected/UserConnected.observable";
import { DetailCommentSection } from "../../componants/comment/DetailCommentSection";
import {
  Comment,
  CommentsInfo,
} from "../../../Module/Observable/userConnected/UserConnectedComments.observable";

export function CommentDetail() {
  const { id } = useParams<{ id: string }>();
  const user = useUserConnected();
  const token = useUserToken();
  const [comment, setComment] = useState<Comment | null>(null);
  const [comments, setComments] = useState<CommentsInfo>();
  const [liked, setLiked] = useState<boolean>(false);

  const commentReadOnly = comment && comment.user._id !== user._id;

  const getCommentsToDisplay = async () => {
    if (token && id) {
      try {
        const response = await AxiosService.getManyComments(
          id,
          token,
          1,
          "comment"
        );
        if (response.status === 200) {
          const update = {
            count: response.data.count,
            page: response.data.page,
            comments: [...response.data.results],
          };
          setComments(update);
        }
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    }
  };

  const getCommentToDisplay = async () => {
    if (token && id) {
      try {
        const response = await AxiosService.getOneCommentById(id, token);
        if (response.status === 200) {
          const fetchedComment = response.data;
          setComment(fetchedComment);
          setLiked(fetchedComment.like.includes(user._id));
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  const handleLikeClick = async () => {
    if (comment) {
      try {
        if (liked) {
          await dislike(user._id!, comment._id, "comment", token!);
        } else {
          await like(user._id!, comment._id, "comment", token!);
        }
        await getCommentToDisplay();
      } catch (error) {
        console.error("Error handling like:", error);
      }
    }
  };

  useEffect(() => {
    getCommentToDisplay();
    getCommentsToDisplay();
  }, [token, id]);

  return (
    <div className="w-full">
      <div className="flex self-center w-[70%] p-6 mx-auto">
        {comment ? (
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
            <div className="p-8">
              <span>{comment.contentText}</span>
            </div>
            <div className="flex gap-16 justify-center">
              <div className="flex flex-col items-center">
                <FaCommentAlt />
                {/* <span>{comment.comments ? comment.comments.length : 0}</span> */}
              </div>
              <div
                className={`flex flex-col items-center ${
                  commentReadOnly ? "cursor-pointer" : ""
                } ${liked ? "c-brown" : ""}`}
                onClick={commentReadOnly ? handleLikeClick : undefined}
              >
                <IoFootball />
                {/* <span>{comment.like.length}</span> */}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <BrownLine />
      <DetailCommentSection id={id!} comments={comments!} />
    </div>
  );
}
