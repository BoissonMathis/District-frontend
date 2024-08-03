import { useUserConnectedPosts } from "../../../Module/Observable/UserConnectedPosts.observable";

export function UserProfilPosts() {
  const UserConectedPosts = useUserConnectedPosts();

  return (
    <div className="flex flex-col gap-4 self-center">
      {UserConectedPosts?.posts && UserConectedPosts?.posts.length > 0 ? (
        UserConectedPosts?.posts.map((post) => <span>{post.contentText}</span>)
      ) : (
        <span>Vous n'avez encore rien posté</span>
      )}
    </div>
  );
}
