import { useState } from "react";
import { useUserConnected } from "../../Module/Observable/UserConnected.observable";
import { BrownLine } from "./BrownLine";
import { MdEdit } from "react-icons/md";

export function UserProfil() {
  const [currentSection, setCurrentSection] = useState<string>("posts");
  const user = useUserConnected();

  return (
    <div>
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
        <MdEdit className="mr-16 mb-4 h-6 w-6 cursor-pointer" />
      </div>
      <BrownLine />
      <div className="flex gap-32 justify-center pt-6">
        <button
          value={"posts"}
          onClick={(e) => setCurrentSection(e.currentTarget.value)}
          className={`user-profil-button ${
            currentSection == "posts" ? "b-brown" : "b-soft-brown"
          }`}
        >
          publications
        </button>
        <button
          value={"comments"}
          onClick={(e) => setCurrentSection(e.currentTarget.value)}
          className={`user-profil-button ${
            currentSection == "comments" ? "b-brown" : "b-soft-brown"
          }`}
        >
          commentaires
        </button>
        <button
          value={"events"}
          onClick={(e) => setCurrentSection(e.currentTarget.value)}
          className={`user-profil-button ${
            currentSection == "events" ? "b-brown" : "b-soft-brown"
          }`}
        >
          événements
        </button>
      </div>
    </div>
  );
}
