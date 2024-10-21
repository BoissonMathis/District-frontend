import { useEffect, useState } from "react";
import {
  getEventSearchResults,
  setEventSearchResults,
} from "../../../Module/Observable/event/EventSearchResults.observable";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";

export function SearchEventForm() {
  const [eventType, setEventType] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventCategorie, setEventCategorie] = useState<string>("");
  const [eventLevel, setEventLevel] = useState<string>("");
  const token = useUserToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = {
      type: eventType,
      date: eventDate,
      categorie: eventCategorie,
      level: eventLevel,
    };
    const page = 1;

    try {
      const response = await getEventSearchResults(search, token!, page);
      console.log(response);
      if (response && response.status == 200) {
        setEventSearchResults(response.data);
      }
    } catch (e: any) {
      console.log("ERROR:", e);
    }
  };

  useEffect(() => {
    console.log("LAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    getEventSearchResults(
      {
        type: eventType,
        date: eventDate,
        categorie: eventCategorie,
        level: eventLevel,
      },
      localStorage.token,
      1
    );
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h2 className="text-2xl mt-6">Trouver un événement</h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-8">
        <div id="type">
          <label htmlFor="new-event-type">Type : </label>
          <select
            id="new-event-type"
            value={eventType}
            className="w-auto border-2 rounded-xl border-soft-brown pl-1 pb-1"
            onChange={(e) => setEventType(e.currentTarget.value)}
          >
            <option value="">-</option>
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
            className="rounded-2xl pl-4 border-2 border-soft-brown"
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
            <option value="">-</option>
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
            <option value="">-</option>
            <option value="D4">D4</option>
            <option value="D2">D2</option>
            <option value="R3">R3</option>
            <option value="R1">R1</option>
            <option value="N3">N3</option>
          </select>
        </div>
        <button type="submit" className="auth-btn self-center">
          Rechercher événement
        </button>
      </form>
    </div>
  );
}
