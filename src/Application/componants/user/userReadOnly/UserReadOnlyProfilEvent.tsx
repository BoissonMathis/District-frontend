import { useEffect, useState } from "react";
import { Event } from "../../../../Module/Observable/userConnected/UserConnectedEvent.observable";
import { EventComponant } from "../../event/Event";
import {
  getUserReadOnlyEvents,
  resetUserReadOnlyEvents,
  setUserReadOnlyEvents,
  useUserReadOnlyEvents,
} from "../../../../Module/Observable/userReadOnly/UserReadOnlyEvents.observable";
import { useUserReadOnly } from "../../../../Module/Observable/userReadOnly/UserReadOnly.observable";
import { useUserToken } from "../../../../Module/Observable/userConnected/UserToken.observable";

export function UserReadOnlyProfilEvents() {
  const [displayEvents, setDisplayEvents] = useState<Event[]>([]);
  const userReadOnlyEvents = useUserReadOnlyEvents();
  const userReadOnly = useUserReadOnly();
  const token = useUserToken();

  useEffect(() => {
    if (userReadOnly && token) {
      getUserReadOnlyEvents(userReadOnly._id, token!, 1);
    } else {
      resetUserReadOnlyEvents();
    }
  }, [userReadOnly, token]);

  useEffect(() => {
    userReadOnlyEvents
      ? setDisplayEvents(userReadOnlyEvents?.events)
      : setDisplayEvents([]);
  }, [userReadOnlyEvents]);

  useEffect(() => {
    return () => {
      resetUserReadOnlyEvents();
    };
  }, []);

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
