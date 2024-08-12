import { useState } from "react";
import { useUserConnected } from "../../../../Module/Observable/UserConnected.observable";
import { BrownLine } from "../../BrownLine";
import { MdEdit } from "react-icons/md";
import { setUpdateFormUser } from "../../../../Module/Observable/modal/UpdateFormUser.observable";
import { UserProfilSections } from "./UserProfilSections";

export function UserProfil() {
  const user = useUserConnected();

  return (
    <>
      <div>
        <img src={user.banner_image} alt="" className="user-banner" />
      </div>
      <div className="flex justify-center items-center gap-12 relative bottom-6">
        <span>{user.status}</span>
        <div className="flex col items-center gap-4">
          <img
            src={user.profil_image}
            alt=""
            className="user-profil-picture-2xl"
          />
          <span>{user.username}</span>
        </div>
        <span>{user.status}</span>
      </div>
      <div className="flex gap-16 justify-center mb-6">
        <div className="flex col items-center">
          <span>Supporters</span>
          <span>{0}</span>
        </div>
        <div className="flex col items-center">
          <span>Abonnements</span>
          <span>{user.follows.length}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="pl-6">{user.bio}</span>
        <MdEdit
          className="mr-16 mb-4 h-6 w-6 cursor-pointer"
          onClick={() => setUpdateFormUser()}
        />
      </div>
      <BrownLine />
      <div>
        <UserProfilSections />
      </div>
    </>
  );
}
