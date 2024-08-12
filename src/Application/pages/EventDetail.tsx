import { BrownLine } from "../componants/BrownLine";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { useUserToken } from "../../Module/Observable/UserToken.observable";
import { useEffect, useState } from "react";
import { Event } from "../../Module/Observable/UserConnectedEvent.observable";
import { User } from "../../Infrastructure/User.ts/User.type";

export function EventDetail() {
  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const token = useUserToken();
  const { id } = useParams<{ id: string }>();

  const getEventToDisplay = async () => {
    if (token && id) {
      try {
        const response = await AxiosService.getOneEventById(id, token);
        console.log(response);
        console.log(response.data.user);
        if (response.status === 200) {
          setEvent(response.data);
          setUser(response.data.user);
          //   console.log(user);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  useEffect(() => {
    getEventToDisplay();
  }, [token, id]);

  return (
    <div className="flex flex-col align-center w-full mt-6">
      {user && event ? (
        <div className="flex flex-col self-center w-[70%] p-6 mx-auto">
          <div>
            <MdEdit
              className="mr-16 mb-4 h-6 w-6 cursor-pointer"
              // onClick={() => setUpdateFormUser()}
            />
          </div>
          <div className="flex gap-12 w-[100%] space-x-[30%] justify-center">
            <div className="flex flex-col gap-4">
              <span>Organisateur : {user.username}</span>
              <span>type : {event.type}</span>
              <span>date : {event.date}</span>
              <span>catégorie : {event.categorie}</span>
              <span>niveau : {event.level}</span>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <img
                src={user.profil_image}
                alt=""
                className="user-profil-picture-xl"
              />
              <span>
                {user.username} - {user.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-6 gap-4">
            <span>informations complémentaire : </span>
            <p className="pl-4">{event.contentText}</p>
          </div>
          <div className="flex mt-6 gap-4">
            <span>lieu : </span>
            <span>{event.place}</span>
          </div>
        </div>
      ) : (
        <span>Loading ...</span>
      )}
    </div>
  );
}
