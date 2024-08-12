import { useEffect, useState } from "react";
import {
  Comment,
  useUserConnectedComments,
} from "../../../../Module/Observable/UserConnectedComments.observable";
import { CommentComposant } from "../../comment/Comment";
// import { PostComponant } from "../../post/Post";

export function UserProfilComments() {
  const [displayComments, setDisplayComments] = useState<Comment[]>([]);
  const UserConnectedComments = useUserConnectedComments();

  useEffect(() => {
    UserConnectedComments
      ? setDisplayComments(UserConnectedComments?.comments)
      : setDisplayComments([]);
    console.log(displayComments);
    console.log(UserConnectedComments);
  }, [UserConnectedComments]);

  return (
    <div className="flex flex-col gap-4 self-center min-w-[50%]">
      {displayComments && displayComments.length > 0 ? (
        displayComments.map((comment) => (
          <CommentComposant key={comment._id} comment={comment} />
        ))
      ) : (
        <span className="flex self-center p-6">
          Vous n'avez encore rien posté
        </span>
      )}
    </div>
  );
}
