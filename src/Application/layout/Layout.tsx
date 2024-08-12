import Auth from "../../Module/auth";
import { Outlet } from "react-router-dom";
import { UserHeader } from "../componants/user/UserHeader";
import { UserNav } from "../componants/user/UserNav";
import { PostNewPostButton } from "../componants/newPost/PostNewPostButton";
import { usePostFormStatus } from "../../Module/Observable/modal/PostForm.observable";
import { PostNewPostForm } from "../componants/newPost/PostNewPostForm";

const Layout = () => {
  const postNewPostStatus = usePostFormStatus();
  //ajouter useeffect pour checker token dans local storage + récupérer post/comments si besoin ?

  return (
    <div className="flex flex-col min-h-screen b-beige">
      <UserHeader />
      <main className="flex flex-1 b-beige">
        <UserNav />
        {postNewPostStatus ? <PostNewPostForm /> : <PostNewPostButton />}
        <Outlet />
      </main>
    </div>
  );
};

export default Auth(Layout);
