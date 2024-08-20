import { useEffect, useState } from "react";
import { BrownLine } from "../../BrownLine";
import { UserProfilSections } from "../UserProfilSections";
import {
  getUserReadOnly,
  useUserReadOnly,
} from "../../../../Module/Observable/userReadOnly/UserReadOnly.observable";
import {
  unfollow,
  follow,
  useUserConnected,
} from "../../../../Module/Observable/userConnected/UserConnected.observable";
// import { User } from "../../../../Infrastructure/User.ts/User.type";

type UserReadOnlyProps = {
  userReadOnlyId: string;
};

export function UserReadOnlyProfil(props: UserReadOnlyProps) {
  const [followed, setFollowed] = useState<boolean>(false);
  let userReadOnlyId = props.userReadOnlyId;
  let userConnectedToken = localStorage.token;
  let userReadOnly = useUserReadOnly();
  let userConnected = useUserConnected();

  useEffect(() => {
    if (userConnectedToken && userReadOnlyId) {
      getUserReadOnly(userReadOnlyId, { token: userConnectedToken });
    }
  }, []);

  useEffect(() => {
    console.log(userConnected.follows);
    if (userConnected.follows.includes(userReadOnlyId)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [userConnected]);

  if (userReadOnly._id == "") {
    return <div>Chargement en cours...</div>;
  }

  return (
    <>
      <div>
        <img src={userReadOnly.banner_image} alt="" className="user-banner" />
      </div>
      <div className="flex justify-center items-center gap-12 relative bottom-6">
        <span>{userReadOnly.status}</span>
        <div className="flex col items-center gap-4">
          <img
            src={userReadOnly.profil_image}
            alt=""
            className="user-profil-picture-2xl"
          />
          <span>{userReadOnly.username}</span>
        </div>
        <span>{userReadOnly.status}</span>
      </div>
      <div className="flex gap-16 justify-center mb-6">
        <div className="flex col items-center">
          <span>Supporters</span>
          <span>{0}</span>
        </div>
        <div className="flex col items-center">
          <span>Abonnements</span>
          <span>{userReadOnly.follows.length}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="pl-6">{userReadOnly.bio}</span>
        <button
          onClick={
            followed
              ? () =>
                  unfollow(
                    userConnected._id,
                    userReadOnly._id,
                    userConnectedToken
                  )
              : () =>
                  follow(
                    userConnected._id,
                    userReadOnly._id,
                    userConnectedToken
                  )
          }
          className={`user-profil-button m-6 ${
            followed ? "b-brown" : "b-soft-brown"
          }`}
        >
          {followed ? "suivi(e)" : "suivre"}
        </button>
      </div>
      <BrownLine />
      <div>
        <UserProfilSections userConnected={false} />
      </div>
    </>
  );
}
