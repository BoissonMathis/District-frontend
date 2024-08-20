import Auth from "../../../Module/auth";
import UserProfil from "./UserProfil";

export const ProtectedUserProfil = Auth(UserProfil);
