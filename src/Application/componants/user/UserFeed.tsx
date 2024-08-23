import { useUserConnectedFeed } from "../../../Module/Observable/userConnected/UserConnectedFeed.observable";
import { PostComponent } from "../post/Post";

export function UserFeed() {
  const feed = useUserConnectedFeed();
  return (
    <div className="flex flex-col gap-16 w-3/5">
      {feed && feed.posts && feed.posts.length > 0 ? (
        feed.posts.map((post) => <PostComponent key={post._id} post={post} />)
      ) : (
        <div className="flex justify-center">aucun compte suivis</div>
      )}
    </div>
  );
}
