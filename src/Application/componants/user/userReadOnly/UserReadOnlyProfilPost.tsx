import { useEffect, useState } from "react";
import { Post } from "../../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import { PostComponent } from "../../post/Post";
import {
  getUserReadOnlyPosts,
  resetUserReadOnlyPosts,
  useUserReadOnlyPosts,
} from "../../../../Module/Observable/userReadOnly/UserReadOnlyPosts.observable";
import { useUserReadOnly } from "../../../../Module/Observable/userReadOnly/UserReadOnly.observable";
import { useUserToken } from "../../../../Module/Observable/userConnected/UserToken.observable";

export function UserReadOnlyProfilPosts() {
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const UserReadOnlyPosts = useUserReadOnlyPosts();
  const userReadOnly = useUserReadOnly();
  const token = useUserToken();

  useEffect(() => {
    if (userReadOnly && token) {
      getUserReadOnlyPosts(userReadOnly._id, token!, 1);
    } else {
      resetUserReadOnlyPosts();
    }
  }, [userReadOnly, token]);

  useEffect(() => {
    UserReadOnlyPosts
      ? setDisplayPosts(UserReadOnlyPosts?.posts)
      : setDisplayPosts([]);
  }, [UserReadOnlyPosts]);

  useEffect(() => {
    return () => {
      resetUserReadOnlyPosts();
    };
  }, []);

  return (
    <>
      {displayPosts && displayPosts.length > 0 ? (
        <div className="flex flex-col gap-4 self-center min-w-[50%]">
          {displayPosts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center pb-8">
          <span>Aucun post</span>
        </div>
      )}
    </>
  );
}
