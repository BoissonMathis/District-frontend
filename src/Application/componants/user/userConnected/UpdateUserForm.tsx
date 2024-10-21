import { ImCross } from "react-icons/im";
import { AiFillPicture } from "react-icons/ai";
import { setUpdateFormUser } from "../../../../Module/Observable/modal/UpdateFormUser.observable";
import {
  putUpdateUser,
  uploadBannerImage,
  uploadProfileImage,
  useUserConnected,
} from "../../../../Module/Observable/userConnected/UserConnected.observable";
import { useEffect, useState } from "react";
import {
  Token,
  useUserToken,
} from "../../../../Module/Observable/userConnected/UserToken.observable";

export function UpdateUserForm() {
  const user = useUserConnected();
  const token = useUserToken();
  const [username, setUsername] = useState<string>(user.username);
  const [bio, setBio] = useState<string>(user.bio);
  const [profilPicture, setProfilePicture] = useState<File | null>(null);
  const [bannerPicture, setBannerPicture] = useState<File | null>(null);

  const [profilPicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(user.profil_image);
  const [bannerPicturePreview, setBannerPicturePreview] = useState<
    string | null
  >(user.banner_image);

  useEffect(() => {
    setUsername(user.username);
    setBio(user.bio);
  }, [user]);

  useEffect(() => {
    if (profilPicture) {
      setProfilePicturePreview(URL.createObjectURL(profilPicture));
    }
  }, [profilPicture]);

  useEffect(() => {
    if (bannerPicture) {
      setBannerPicturePreview(URL.createObjectURL(bannerPicture));
    }
  }, [bannerPicture]);

  const handleUpdateUser = () => {
    putUpdateUser(user._id, token as Token, {
      username: username,
      bio: bio,
    });
    profilPicture && uploadProfileImage(user._id, profilPicture);
    bannerPicture && uploadBannerImage(user._id, bannerPicture);
  };

  return (
    <div className="flex flex-col justify-center items-center b-gray h-full relative z-20">
      <div className="flex flex-col gap-6 pt-4 items-center border-2 border-brown b-beige w-3/5 h-4/5 h-16 rounded-xl relative">
        <ImCross
          className="cursor-pointer absolute top-4 right-4 z-30"
          onClick={() => setUpdateFormUser()}
        />
        <div className="flex w-full justify-center relative">
          <img
            src={bannerPicturePreview || user.banner_image}
            alt="Banner"
            className="w-[85%] h-32 object-cover rounded-xl opacity-50 border-2 border-brown"
          />
          <label htmlFor="input-banner-picture">
            <AiFillPicture className="w-16 h-16 absolute top-[25%] left-[46.5%] cursor-pointer" />
          </label>
          <input
            type="file"
            id="input-banner-picture"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                setBannerPicture(file);
              }
            }}
          />
        </div>
        <div className="flex justify-center relative">
          <img
            src={profilPicturePreview || user.profil_image}
            alt="Profile"
            className="user-profil-picture-xl opacity-50"
          />
          <div className="absolute top-1/3 right-2/3">
            <label htmlFor="input-profil-picture">
              <AiFillPicture className="w-6 h-6 absolute left-[48.6%] top-[30%] cursor-pointer" />
            </label>
            <input
              type="file"
              id="input-profil-picture"
              className="hidden"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  setProfilePicture(file);
                }
              }}
            />
          </div>
        </div>
        <input
          type="text"
          value={username}
          className="h-8 w-3/5 b-soft-brown rounded-xl pl-4 border-2 border-brown"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <textarea
          value={bio}
          className="h-32 w-3/5 b-soft-brown rounded-xl p-4 border-2 border-brown resize-none overflow-y-auto"
          placeholder="Entrez votre texte ici..."
          onChange={(e) => setBio(e.currentTarget.value)}
        />
        <button className="auth-btn mb-6" onClick={handleUpdateUser}>
          Valider
        </button>
      </div>
    </div>
  );
}
