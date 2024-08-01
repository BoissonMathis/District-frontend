import { FaPenNib } from "react-icons/fa6";
import { setPostForm } from "../../../Module/Observable/modal/PostForm.observable";

export function PostNewPostButton() {
  return (
    <div
      onClick={() => setPostForm()}
      className="flex justify-center items-center h-16 w-16 border-2 border-black rounded-full b-brown cursor-pointer absolute bottom-16 right-36 z-10"
    >
      <FaPenNib className="h-6 w-6" />
    </div>
  );
}
