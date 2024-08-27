import Auth from "../../../Module/auth";
import { CommentDetail } from "./CommentDetail";

export const ProtectedCommentDetail = Auth(CommentDetail);
