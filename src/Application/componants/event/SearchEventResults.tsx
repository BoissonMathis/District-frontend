import { useEventSearchResults } from "../../../Module/Observable/event/EventSearchResults.observable";
import { EventComponant } from "./Event";

export function SearchEventResults() {
  const eventSearchResults = useEventSearchResults();

  return (
    <>
      {eventSearchResults && eventSearchResults.count > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-6">
          {eventSearchResults.results.map((event) => (
            <EventComponant key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full mt-6">
          <span>Aucun résultat correspondant à votre recherche</span>
        </div>
      )}
    </>
  );
}
