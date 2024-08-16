import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Token } from "../userConnected/UserToken.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Event, EventsInfo } from "../userConnected/UserConnectedEvent.observable";

let initialValue: EventsInfo = {count: 0, page: 1, events: []}

let userReadOnlyEvents: EventsInfo = initialValue

export const userReadOnlyEvents$ = new BehaviorSubject(userReadOnlyEvents)

export const setUserReadOnlyEvents = async (newEventsInfo: EventsInfo) => {
    let eventsToAdd: Event[] = [];

    if (newEventsInfo.events && newEventsInfo.events.length > 0) {
        for (let i = 0; i < newEventsInfo.events.length; i++) {
            const event = newEventsInfo.events[i];
            const eventExists = userReadOnlyEvents.events.some((existingEvent) => existingEvent._id === event._id);
            if (!eventExists) {
                eventsToAdd.push(event);
            }
        }

        userReadOnlyEvents = {
            count: newEventsInfo.count,
            page: newEventsInfo.page,
            events: [...eventsToAdd, ...userReadOnlyEvents.events]
        };
    }

    return userReadOnlyEvents$.next(userReadOnlyEvents);
};

export const resetUserReadOnlyEvents = async () => {
    userReadOnlyEvents = initialValue
    return userReadOnlyEvents$.next(userReadOnlyEvents)
}

export const useUserReadOnlyEvents = () => {
    const [userReadOnlyEvents, setUserReadOnlyEvents] = useState<EventsInfo>();

    useEffect(() => {
        
        const subscription = userReadOnlyEvents$.subscribe((updatedUserReadOnlyEvents) => setUserReadOnlyEvents(updatedUserReadOnlyEvents))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userReadOnlyEvents
}

export const getUserReadOnlyEvents = async (user_id: string, valid_token: Token, page: number) => {
    try {
        const response = await AxiosService.getManyUserEvents(user_id, valid_token, page)
        // console.log("Events récupérée avec succès :", response)
        if(response.status == 200 && response.data){
            let newEvents = {count: response.data.count, page: response.data.page, events: response.data.results}
            setUserReadOnlyEvents(newEvents)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

