import { useState } from "react";
import {
  postUserEvent,
  setEventForm,
} from "../../../../Module/Observable/modal/EventForm.observable";
import { ImCross } from "react-icons/im";
import { useUserConnected } from "../../../../Module/Observable/UserConnected.observable";
import {
  Event,
  EventsInfo,
  setUserConnectedEvents,
  useUserConnectedEvents,
} from "../../../../Module/Observable/UserConnectedEvent.observable";

export function CreateEventForm() {
  const [eventType, setEventType] = useState<string>("match amical");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventCategorie, setEventCategorie] = useState<string>("U6 - U7");
  const [eventLevel, setEventLevel] = useState<string>("D4");
  const [eventInfos, setEventInfos] = useState<string>("");
  const [eventPlace, setEventPlace] = useState<string>("");
  const user = useUserConnected();
  const events = useUserConnectedEvents();

  const handlePost = async () => {
    const eventToPost: Event = {
      user: user._id,
      type: eventType,
      date: eventDate,
      categorie: eventCategorie,
      level: eventLevel,
      contentText: eventInfos,
      place: eventPlace,
    };
    try {
      const newEvent = await postUserEvent(
        eventToPost,
        // token as Token
        localStorage.token
      );
      if (newEvent) {
        const updatedEvents: EventsInfo = {
          count: 1,
          page: events ? events.page : 1,
          events: [newEvent],
        };
        setUserConnectedEvents(updatedEvents);
        setEventForm();
      }
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  return (
    <div className="flex justify-center items-center b-gray h-full relative z-20">
      <div className="flex flex-col gap-6 pt-4 border-2 border-brown b-beige w-3/5 h-4/5 rounded-xl relative">
        <ImCross
          className="cursor-pointer absolute top-4 right-4 z-30"
          onClick={() => setEventForm()}
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
        <button className="auth-btn self-center" onClick={handlePost}>
          Créer l'événement
        </button>
      </div>
    </div>
  );
}
