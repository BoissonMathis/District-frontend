import { useEffect, useState } from "react";
import { Comment } from "../../../../Module/Observable/userConnected/UserConnectedComments.observable";
import { CommentComposant } from "../../comment/Comment";
import {
  resetUserReadOnlyComments,
  useUserReadOnlyComments,
} from "../../../../Module/Observable/userReadOnly/UserReadOnlyComments.observable";

export function UserReadOnlyProfilComments() {
  const [displayComments, setDisplayComments] = useState<Comment[]>([]);
  const UserReadOnlyComments = useUserReadOnlyComments();

  useEffect(() => {
    UserReadOnlyComments
      ? setDisplayComments(UserReadOnlyComments?.comments)
      : setDisplayComments([]);
    return () => {
      resetUserReadOnlyComments();
    };
  }, [UserReadOnlyComments]);

  return (
    <>
      {displayComments && displayComments.length > 0 ? (
        <div className="flex flex-col gap-4 self-center min-w-[50%]">
          {displayComments.map((comment) => (
            <CommentComposant key={comment._id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="flex self-center pb-8">
          <span>Aucun commentaire</span>
        </div>
      )}
    </>
  );
}
