import { Post } from "../../Module/Observable/UserConnectedPosts.observable";

export function PostComponant(postInfo: Post) {
  let user = postInfo.user;
  return (
    <div className="b-brown border-2 rounded-xl">
      <div>
        <span>{user}</span>
      </div>
    </div>
  );
}
