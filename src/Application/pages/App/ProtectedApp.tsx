import Auth from "../../../Module/auth";
import { App } from "./App";

export const ProtectedApp = Auth(App);
