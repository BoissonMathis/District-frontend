import { ImCross } from "react-icons/im";
import { setUpdateFormEvent } from "../../../Module/Observable/modal/UpdateFormEvent.observable";
import { useState } from "react";
import { useUserConnected } from "../../../Module/Observable/userConnected/UserConnected.observable";
import {
  Event,
  useUserConnectedEvents,
} from "../../../Module/Observable/userConnected/UserConnectedEvent.observable";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import {
  Token,
  useUserToken,
} from "../../../Module/Observable/userConnected/UserToken.observable";

type EventUpdateProps = {
  event: Event;
};

export function UpdateEventForm(props: EventUpdateProps) {
  const event = props.event;
  const user = event.user as User;
  const token = useUserToken();
  const [eventType, setEventType] = useState<string>(event.type);
  const [eventDate, setEventDate] = useState<string>(event.date);
  const [eventCategorie, setEventCategorie] = useState<string>(
    event.categorie ? event.categorie : ""
  );
  const [eventLevel, setEventLevel] = useState<string>(
    event.level ? event.level : ""
  );
  const [eventInfos, setEventInfos] = useState<string>(event.contentText);
  const [eventPlace, setEventPlace] = useState<string>(
    event.place ? event.place : ""
  );

  const handleUpdate = async () => {
    const update: Event = {
      user: user._id,
      type: eventType,
      date: eventDate,
      categorie: eventCategorie,
      level: eventLevel,
      contentText: eventInfos,
      place: eventPlace,
    };
    try {
      const response = await AxiosService.putUserEvent(
        event._id as string,
        update,
        token as Token
      );
      if (response.status == 200) {
        setUpdateFormEvent();
      }
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center b-gray h-full relative z-20">
      <div className="flex flex-col gap-4 pt-4 items-center border-2 border-brown b-beige w-3/5 h-4/5 h-16 rounded-xl relative">
        <ImCross
          className="cursor-pointer absolute top-4 right-4 z-30"
          onClick={() => setUpdateFormEvent()}
        />
        <div id="orga" className="self-center">
          <span>Organisateur : {user.username}</span>
        </div>
        <div className="flex space-x-24 w-4/5 h-3/5 self-center">
          <div id="left-side" className="flex flex-col pt-4 gap-6">
            <div id="type">
              <label htmlFor="new-event-type">Type : </label>
              <select
                id="new-event-type"
                value={eventType}
                className="w-auto border-2 rounded-xl border-soft-brown pl-1 pb-1"
                onChange={(e) => setEventType(e.currentTarget.value)}
              >
                <option value="match amical">match amical</option>
                <option value="plateau">plateau</option>
                <option value="tournoi">tournoi</option>
              </select>
            </div>
            <div id="date">
              <label htmlFor="new-event-date">Date : </label>
              <input
                type="date"
                id="new-event-date"
                value={eventDate}
                className="b-soft-brown rounded-2xl pl-4 border-2 border-brown"
                onChange={(e) => setEventDate(e.currentTarget.value)}
              />
            </div>
            <div id="categorie">
              <label htmlFor="new-event-categorie">Catégorie : </label>
              <select
                id="new-event-categorie"
                value={eventCategorie}
                className="w-auto border-2 rounded-xl border-soft-brown pl-1 pb-1"
                onChange={(e) => setEventCategorie(e.currentTarget.value)}
              >
                <option value="U6 - U7">U6 - U7</option>
                <option value="U10 - U11">U10 - U11</option>
                <option value="U14 - U15">U14 - U15</option>
                <option value="senior">Sénior</option>
              </select>
            </div>
            <div id="level">
              <label htmlFor="new-event-level">Niveau : </label>
              <select
                id="new-event-level"
                value={eventLevel}
                className="w-auto border-2 rounded-xl border-soft-brown pl-1 pb-1"
                onChange={(e) => setEventLevel(e.currentTarget.value)}
              >
                <option value="D4">D4</option>
                <option value="D2">D2</option>
                <option value="R3">R3</option>
                <option value="R1">R1</option>
                <option value="N3">N3</option>
              </select>
            </div>
          </div>
          <div id="right-side" className="w-2/4 h-full flex flex-col gap-4">
            <div id="infos" className="h-full w-full">
              <label htmlFor="new-event-infos">
                Informations complémentaires :
              </label>
              <textarea
                id="new-event-infos"
                value={eventInfos}
                className="h-3/4 w-full b-soft-brown rounded-xl p-4 border-2 border-brown resize-none overflow-y-auto"
                onChange={(e) => setEventInfos(e.currentTarget.value)}
              />
            </div>
            <div id="place">
              <label htmlFor="place">Lieu : </label>
              <input
                type="text"
                id="new-event-place"
                value={eventPlace}
                className="b-soft-brown rounded-2xl pl-4 border-2 border-brown"
                onChange={(e) => setEventPlace(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
        <button className="auth-btn self-center" onClick={() => handleUpdate()}>
          Modifier l'événement
        </button>
      </div>
    </div>
  );
}
