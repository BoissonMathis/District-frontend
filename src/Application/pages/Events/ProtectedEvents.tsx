import Auth from "../../../Module/auth";
import Events from "./Events";

export const ProtectedEvents = Auth(Events);
