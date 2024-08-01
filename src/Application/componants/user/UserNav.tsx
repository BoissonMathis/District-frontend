import { IoFootball } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  setCurrentPage,
  useCurrentPage,
} from "../../../Module/Observable/CurrentPage.observable";

export function UserNav() {
  const currentPage = useCurrentPage();
  const navigate = useNavigate();

  return (
    <div className="flex flex col p-4 gap-4 border-r border-r-3 border-black h-auto w-fit">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          navigate("/"), setCurrentPage("/");
        }}
      >
        <IoHomeSharp />
        <span>accueil</span>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          navigate("/events"), setCurrentPage("events");
        }}
      >
        <IoFootball />
        <span>événements</span>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          navigate("/settings"), setCurrentPage("settings");
        }}
      >
        <IoMdSettings />
        <span>settings</span>
      </div>
    </div>
  );
}
