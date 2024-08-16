import { useNavigate } from "react-router-dom";
import {
  postLogoutUser,
  useUserConnected,
} from "../../../Module/Observable/userConnected/UserConnected.observable";
import { BrownLine } from "../BrownLine";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  setCurrentPage,
  useCurrentPage,
} from "../../../Module/Observable/CurrentPage.observable";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";

export function UserHeader() {
  const userConnected = useUserConnected();
  const currentPage = useCurrentPage();
  const token = useUserToken();
  const navigate = useNavigate();

  return (
    <div>
      {currentPage !== "/" && (
        <FaArrowLeftLong
          className="absolute left-24 top-8 w-24 h-8 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
      )}
      <div className="flex gap-6 items-center justify-center pt-6 pb-6">
        <div>
          <img
            src={userConnected.profil_image}
            alt="Photo de profil de l'utilisateur"
            className="user-profil-picture-xl cursor-pointer"
            onClick={() => {
              navigate(`/profil/${userConnected._id}`),
                setCurrentPage("profil");
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Recherche..."
            className="search-bar"
          />
        </div>
        <div className="flex gap-8 absolute right-16">
          <IoNotificationsSharp className="h-8 w-8 cursor-pointer" />
          <RiLogoutCircleRLine
            className="h-8 w-8 cursor-pointer"
            onClick={() => {
              postLogoutUser(userConnected._id, token!);
              // navigate("/login");
            }}
          />
        </div>
      </div>
      <BrownLine />
    </div>
  );
}
