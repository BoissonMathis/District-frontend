import { useState } from "react";
import { UserProfilPosts } from "./UserProfilPosts";

export function UserProfilSections() {
  const [currentSection, setCurrentSection] = useState<string>("posts");
  return (
    <div className="flex flex-col">
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
      {currentSection == "posts" && <UserProfilPosts />}
    </div>
  );
}
