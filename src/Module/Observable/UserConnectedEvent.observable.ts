import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Token } from "./UserToken.observable";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { User } from "../../Infrastructure/User.ts/User.type";
import { Post } from "./UserConnectedPosts.observable";

export type Event = {
    _id?: string,
    user: User | string,
    type: string,
    date: string,
    categorie?: string,
    level?: string,
    contentText: string,
    place?: string
}

export type EventsInfo = {
    count: number,
    page: number,
    events: Event[]
}

let initialValue: EventsInfo = {count: 0, page: 1, events: []}

let userConnectedEvents: EventsInfo = initialValue

export const userConnectedEvents$ = new BehaviorSubject(userConnectedEvents)

export const setUserConnectedEvents = async (newEventsInfo: EventsInfo) => {
    let eventsToAdd: Event[] = [];

    if (newEventsInfo.events && newEventsInfo.events.length > 0) {
        for (let i = 0; i < newEventsInfo.events.length; i++) {
            const event = newEventsInfo.events[i];
            const eventExists = userConnectedEvents.events.some((existingEvent) => existingEvent._id === event._id);
            if (!eventExists) {
                eventsToAdd.push(event);
            }
        }

        userConnectedEvents = {
            count: newEventsInfo.count,
            page: newEventsInfo.page,
            events: [...eventsToAdd, ...userConnectedEvents.events]
        };
    }

    return userConnectedEvents$.next(userConnectedEvents);
};

export const resetUserConnectedEvents = async () => {
    userConnectedEvents = initialValue
    return userConnectedEvents$.next(userConnectedEvents)
}

export const useUserConnectedEvents = () => {
    const [userConnectedEvents, setUserConnectedEvents] = useState<EventsInfo>();

    useEffect(() => {
        
        const subscription = userConnectedEvents$.subscribe((updatedUserConnectedEvents) => setUserConnectedEvents(updatedUserConnectedEvents))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnectedEvents
}

export const getUserConnectedEvents = async (user_id: string, valid_token: Token, page: number) => {
    try {
        const response = await AxiosService.getManyUserEvents(user_id, valid_token, page)
        // console.log("Events récupérée avec succès :", response)
        if(response.status == 200 && response.data){
            let newEvents = {count: response.data.count, page: response.data.page, events: response.data.results}
            setUserConnectedEvents(newEvents)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

