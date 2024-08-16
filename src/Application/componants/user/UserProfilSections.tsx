import { useState } from "react";
import { UserConnectedProfilPosts } from "./userConnected/UserConnectedProfilPosts";
import { UserConnectedProfilComments } from "./userConnected/UserConnectedProfilComments";
import { UserConnectedProfilEvents } from "./userConnected/UserConnectedProfilEvent";
import { UserReadOnlyProfilPosts } from "./userReadOnly/UserReadOnlyProfilPost";
import { UserReadOnlyProfilComments } from "./userReadOnly/UserReadOnlyProfilComment";
import { UserReadOnlyProfilEvents } from "./userReadOnly/UserReadOnlyProfilEvent";

type userConnected = {
  userConnected: boolean;
};

export function UserProfilSections(props: userConnected) {
  const userConnected = props.userConnected;
  const [currentSection, setCurrentSection] = useState<string>("posts");
  return (
    <div className="flex flex-col">
      <div className="flex gap-32 justify-center pt-6 pb-8">
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
      {userConnected && currentSection == "posts" && (
        <UserConnectedProfilPosts />
      )}
      {userConnected && currentSection == "comments" && (
        <UserConnectedProfilComments />
      )}
      {userConnected && currentSection == "events" && (
        <UserConnectedProfilEvents />
      )}
      {!userConnected && currentSection == "posts" && (
        <UserReadOnlyProfilPosts />
      )}
      {!userConnected && currentSection == "comments" && (
        <UserReadOnlyProfilComments />
      )}
      {!userConnected && currentSection == "events" && (
        <UserReadOnlyProfilEvents />
      )}
    </div>
  );
}
