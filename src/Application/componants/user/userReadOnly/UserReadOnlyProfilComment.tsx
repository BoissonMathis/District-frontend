import { useEffect, useState } from "react";
import { Comment } from "../../../../Module/Observable/userConnected/UserConnectedComments.observable";
import { CommentComposant } from "../../comment/Comment";
import {
  getUserReadOnlyComments,
  resetUserReadOnlyComments,
  useUserReadOnlyComments,
} from "../../../../Module/Observable/userReadOnly/UserReadOnlyComments.observable";
import { useUserReadOnly } from "../../../../Module/Observable/userReadOnly/UserReadOnly.observable";
import { useUserToken } from "../../../../Module/Observable/userConnected/UserToken.observable";

export function UserReadOnlyProfilComments() {
  const [displayComments, setDisplayComments] = useState<Comment[]>([]);
  const UserReadOnlyComments = useUserReadOnlyComments();
  const userReadOnly = useUserReadOnly();
  const token = useUserToken();

  useEffect(() => {
    if (userReadOnly && token) {
      getUserReadOnlyComments(userReadOnly._id, token!, 1);
    } else {
      resetUserReadOnlyComments();
    }
  }, [userReadOnly, token]);

  useEffect(() => {
    UserReadOnlyComments
      ? setDisplayComments(UserReadOnlyComments?.comments)
      : setDisplayComments([]);
  }, [UserReadOnlyComments]);

  useEffect(() => {
    return () => {
      resetUserReadOnlyComments();
    };
  }, []);

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
