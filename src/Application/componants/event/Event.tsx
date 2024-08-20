import { useNavigate } from "react-router-dom";
import { Event } from "../../../Module/Observable/userConnected/UserConnectedEvent.observable";
import { User } from "../../../Infrastructure/User.ts/User.type";

type EventProps = {
  event: Event;
};

export function EventComponant(props: EventProps) {
  const navigate = useNavigate();
  let eventInfo = props.event;
  let user = eventInfo.user as User;

  return (
    <>
      {props.event ? (
        <div
          className="flex flex-col items-center min-w-3/5 gap-4 p-6 b-soft-brown border-2 border-brown rounded-2xl"
          onClick={() => navigate(`/evenement/${eventInfo._id}`)}
        >
          <div className="flex gap-12">
            <div className="flex flex-col">
              <span>Type : {eventInfo.type}</span>
              <span>Date : {eventInfo.date}</span>
              <span>Catégorie : {eventInfo.categorie}</span>
              <span>Niveau : {eventInfo.level}</span>
            </div>
            <div className="flex gap-4 items-center">
              <img
                src={user.profil_image}
                alt=""
                className="user-profil-picture-xs"
              />
              <span>
                {user.username} - {user.status}
              </span>
            </div>
          </div>

          <button className="user-profil-button b-brown w-fit">
            En savoir plus
          </button>
        </div>
      ) : (
        <div className="">
          <span>Erreur lors de la récupération du post</span>
        </div>
      )}
    </>
  );
}
