import Auth from "../../../Module/auth";
import { EventDetail } from "./EventDetail";

export const ProtectedEventDetail = Auth(EventDetail);
