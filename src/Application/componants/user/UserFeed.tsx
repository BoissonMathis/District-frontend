import { useUserConnectedFeed } from "../../../Module/Observable/UserConnectedFeed.observable";
import { PostComponant } from "../post/Post";

export function UserFeed() {
  const feed = useUserConnectedFeed();
  return (
    <div className="flex flex-col gap-16 w-3/5">
      {feed && feed.posts && feed.posts.length > 0 ? (
        feed.posts.map((post) => <PostComponant key={post._id} post={post} />)
      ) : (
        <div>aucun compte suivis</div>
      )}
    </div>
  );
}
