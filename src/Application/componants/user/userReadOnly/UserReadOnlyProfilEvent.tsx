import { useEffect, useState } from "react";
import { Event } from "../../../../Module/Observable/userConnected/UserConnectedEvent.observable";
import { EventComponant } from "../../event/Event";
import {
  resetUserReadOnlyEvents,
  useUserReadOnlyEvents,
} from "../../../../Module/Observable/userReadOnly/UserReadOnlyEvents.observable";

export function UserReadOnlyProfilEvents() {
  const [displayEvents, setDisplayEvents] = useState<Event[]>([]);
  const userReadOnlyEvents = useUserReadOnlyEvents();

  useEffect(() => {
    userReadOnlyEvents
      ? setDisplayEvents(userReadOnlyEvents?.events)
      : setDisplayEvents([]);
    return () => {
      resetUserReadOnlyEvents();
    };
  }, [userReadOnlyEvents]);

  return (
    <>
      {displayEvents && displayEvents.length > 0 ? (
        <div className="flex flex-col gap-6 pb-8 self-center items-center">
          {displayEvents.map((event) => (
            <EventComponant key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex self-center pb-8">
          <span>Aucun événement</span>
        </div>
      )}
    </>
  );
}
