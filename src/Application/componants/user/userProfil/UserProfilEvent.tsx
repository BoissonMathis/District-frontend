import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { setEventForm } from "../../../../Module/Observable/modal/EventForm.observable";
import {
  Event,
  useUserConnectedEvents,
} from "../../../../Module/Observable/UserConnectedEvent.observable";
import { EventComponant } from "../../event/Event";

export function UserProfilEvents() {
  const [displayEvents, setDisplayEvents] = useState<Event[]>([]);
  const UserConnectedEvents = useUserConnectedEvents();

  useEffect(() => {
    UserConnectedEvents
      ? setDisplayEvents(UserConnectedEvents?.events)
      : setDisplayEvents([]);
  }, [UserConnectedEvents]);

  return (
    <div className="flex flex-col gap-6 pb-8 self-center items-center">
      <div
        className="flex flex-col p-6 items-center cursor-pointer"
        onClick={() => setEventForm()}
      >
        <FaCirclePlus className="h-8 w-8" />
        <span>Créer un événement</span>
      </div>
      {displayEvents && displayEvents.length > 0 ? (
        displayEvents.map((event) => (
          <EventComponant key={event._id} event={event} />
        ))
      ) : (
        <span className="p-4">Vous n'avez pas encore créée d'événements</span>
      )}
    </div>
  );
}
