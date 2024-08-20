import Auth from "../../../Module/auth";
import { PostDetail } from "./PostDetail";

export const ProtectedPostDetail = Auth(PostDetail);
