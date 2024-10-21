import { useUserConnected } from "../../../../Module/Observable/userConnected/UserConnected.observable";
import { BrownLine } from "../../BrownLine";
import { MdEdit } from "react-icons/md";
import { setUpdateFormUser } from "../../../../Module/Observable/modal/UpdateFormUser.observable";
import { UserProfilSections } from "../UserProfilSections";

export function UserConnectedProfil() {
  let userConnected = useUserConnected();

  if (!userConnected) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <>
      <div>
        <img src={userConnected.banner_image} alt="" className="user-banner" />
      </div>
      <div className="flex justify-center items-center gap-12 relative bottom-6">
        <span className="font-heading">{userConnected.status}</span>
        <div className="flex col items-center gap-4">
          <img
            src={userConnected.profil_image}
            alt=""
            className="user-profil-picture-2xl"
          />
          <span className="font-heading">{userConnected.username}</span>
        </div>
        <span className="font-heading">{userConnected.status}</span>
      </div>
      <div className="flex gap-16 justify-center mb-6">
        <div className="flex col items-center">
          <span className="font-heading">Supporters</span>
          <span>{0}</span>
        </div>
        <div className="flex col items-center">
          <span className="font-heading">Abonnements</span>
          <span>{userConnected.follows.length}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="pl-6 font-heading">{userConnected.bio}</span>
        <MdEdit
          className="mr-16 mb-4 h-6 w-6 cursor-pointer"
          onClick={() => setUpdateFormUser()}
        />
      </div>
      <BrownLine />
      <div>
        <UserProfilSections userConnected={true} />
      </div>
    </>
  );
}
