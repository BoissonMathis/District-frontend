import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Token } from "../userConnected/UserToken.observable";
import { Event } from "../userConnected/UserConnectedEvent.observable";

export type EventSearchResults = {
    count: number,
    results: Event[]
}

let initialValue: EventSearchResults = {
    count: 0,
    results: []
}

let eventSearchResults = initialValue;

export const eventSearchResults$ = new BehaviorSubject(eventSearchResults)

export const setEventSearchResults = async (searchResults: EventSearchResults) => {
    eventSearchResults = searchResults
    return eventSearchResults$.next(eventSearchResults)
}

export const resetEventSearchResults = async () => {
    eventSearchResults = initialValue
    return eventSearchResults$.next(eventSearchResults)
}

export const useEventSearchResults = () => {
    const [userConnected, setEventSearchResults] = useState<EventSearchResults>({
        count: 0,
        results: []
    });

    useEffect(() => {
        const subscription = eventSearchResults$.subscribe((searchResults) => setEventSearchResults(searchResults))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnected
}

export const getEventSearchResults = async (search: any, token: Token, page: number) => {
    try {
        const response = await AxiosService.getManyEvents(token, page, search)
        return response
    }catch(e: any){
        console.log('ERROR:', e)
    }
}