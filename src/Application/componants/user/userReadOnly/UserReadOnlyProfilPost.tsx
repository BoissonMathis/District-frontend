import { useEffect, useState } from "react";
import { Post } from "../../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import { PostComponent } from "../../post/Post";
import {
  resetUserReadOnlyPosts,
  useUserReadOnlyPosts,
} from "../../../../Module/Observable/userReadOnly/UserReadOnlyPosts.observable";

export function UserReadOnlyProfilPosts() {
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const UserReadOnlyPosts = useUserReadOnlyPosts();

  useEffect(() => {
    UserReadOnlyPosts
      ? setDisplayPosts(UserReadOnlyPosts?.posts)
      : setDisplayPosts([]);
    return () => {
      resetUserReadOnlyPosts();
    };
  }, [UserReadOnlyPosts]);

  return (
    <>
      {displayPosts && displayPosts.length > 0 ? (
        <div className="flex flex-col gap-4 self-center min-w-[50%]">
          {displayPosts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex self-center pb-8">
          <span>Aucun post</span>
        </div>
      )}
    </>
  );
}
