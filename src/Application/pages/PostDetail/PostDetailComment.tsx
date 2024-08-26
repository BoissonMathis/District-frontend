import { useEffect, useState } from "react";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { CommentsInfo } from "../../../Module/Observable/userConnected/UserConnectedComments.observable";
import { BrownLine } from "../../componants/BrownLine";
import { FaCommentAlt } from "react-icons/fa";
import { useUserConnected } from "../../../Module/Observable/userConnected/UserConnected.observable";
import { IoFootball } from "react-icons/io5";

type PostDetailCommentProps = {
  post_id: string;
};

export function PostDetailComment(props: PostDetailCommentProps) {
  const [commentToDisplay, setCommentToDisplay] = useState<CommentsInfo>();
  const token = useUserToken();
  const post_id = props.post_id;
  const user = useUserConnected();

  const getCommentToDisplay = async () => {
    if (token && post_id) {
      try {
        const response = await AxiosService.getManyPostComments(
          post_id,
          token,
          1
        );
        if (response.status === 200) {
          const update = {
            count: response.data.count,
            page: response.data.page,
            comments: [...response.data.results],
          };
          setCommentToDisplay(update);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  useEffect(() => {
    if (token && post_id) {
      getCommentToDisplay();
      console.log(commentToDisplay);
    }
  }, [token, post_id]);

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
                className="flex self-center w-[60%] p-6 mx-auto"
              >
                <div>
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
                  <div className="p-6">{comment.contentText}</div>
                  <div>
                    <div className="flex flex-col items-center">
                      <FaCommentAlt />
                      <span>{comment.answer ? comment.answer.length : 0}</span>
                    </div>
                    <div
                    // className={`flex flex-col items-center${
                    //   comment._id == user._id && " cursor-pointer"
                    // }${comment._id == user._id && liked ? " c-brown" : ""}`}
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
        <span className="pt-8">Aucun commentaire</span>
      )}
    </div>
  );
}
