import { useEventSearchResults } from "../../../Module/Observable/event/EventSearchResults.observable";
import { EventComponant } from "./Event";

export function SearchEventResults() {
  const eventSearchResults = useEventSearchResults();
  return (
    <div>
      {eventSearchResults && eventSearchResults.count > 0 ? (
        eventSearchResults.results.map((event) => (
          <EventComponant key={event._id} event={event} />
        ))
      ) : (
        <span>Aucun résultat correspondant à votre recherche</span>
      )}
    </div>
  );
}
