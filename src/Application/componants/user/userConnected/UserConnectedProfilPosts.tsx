import { useEffect, useState } from "react";
import {
  Post,
  useUserConnectedPosts,
} from "../../../../Module/Observable/userConnected/UserConnectedPosts.observable";
import { PostComponent } from "../../post/Post";

export function UserConnectedProfilPosts() {
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const UserConnectedPosts = useUserConnectedPosts();

  useEffect(() => {
    UserConnectedPosts
      ? setDisplayPosts(UserConnectedPosts?.posts)
      : setDisplayPosts([]);
  }, [UserConnectedPosts]);

  return (
    <div className="flex flex-col gap-4 self-center min-w-[50%]">
      {displayPosts && displayPosts.length > 0 ? (
        displayPosts.map((post) => <PostComponent key={post._id} post={post} />)
      ) : (
        <span className="flex justify-center">
          Vous n'avez encore rien posté
        </span>
      )}
    </div>
  );
}
