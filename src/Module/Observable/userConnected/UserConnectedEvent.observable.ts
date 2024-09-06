import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Token } from "./UserToken.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { User } from "../../../Infrastructure/User.ts/User.type";

export type Event = {
    _id?: string,
    user: User | string,
    type: string,
    date: string,
    categorie?: string,
    level?: string,
    contentText: string,
    place?: string,
    slots: number,
    candidate: User[],
    candidate_validate: User[],
    completed: boolean
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

export const acceptCandidate = async (event_id: string, candidat_id: string, valid_token: string) => {
    try{
        const response = await AxiosService.addEventValidateCandidate(event_id, candidat_id, valid_token)
        console.log(response)
        console.log("candidat validé")
        if(response.status == 200){
            const response = await AxiosService.deleteEventCandidate(event_id, candidat_id, valid_token)
            console.log(response)
            console.log("candidature rejeté")
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const cancelCandidate = async (event_id: string, candidat_id: string, valid_token: string) => {
    try{
        const response = await AxiosService.deleteEventCandidate(event_id, candidat_id, valid_token)
        console.log(response)
        console.log("candidat rejeté")
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const postCandidate = async (event_id: string, candidat_id: string, valid_token: string) => {
    try{
        const response = await AxiosService.addEventCandidate(event_id, candidat_id, valid_token)
        console.log(response)
        console.log("candidat ajouté")
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const deleteCandidate = async (event_id: string, candidat_id: string, valid_token: string) => {
    try{
        const response = await AxiosService.deleteEventValidateCandidate(event_id, candidat_id, valid_token)
        console.log(response)
        console.log("candidat validé supprimée")
        if(response.status == 200){
            const response = await AxiosService.addEventCandidate(event_id, candidat_id, valid_token)
            console.log(response)
            console.log("candidat ajouté")
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}