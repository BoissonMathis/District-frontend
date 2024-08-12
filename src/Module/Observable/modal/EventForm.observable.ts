import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Token } from "../UserToken.observable";
import { Event } from "../UserConnectedEvent.observable";

let evenForm: boolean = false

export const evenForm$ = new BehaviorSubject(evenForm)

export const setEventForm = async () => {
    evenForm = !evenForm
    return evenForm$.next(evenForm)
}

export const useEventFormStatus = () => {
    const [upToDateEventFormStatus, setUpdateEventFormStatus] = useState<boolean>(false);

    useEffect(() => {
        const subscription = evenForm$.subscribe((newEventFormStatus) => setUpdateEventFormStatus(newEventFormStatus))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return upToDateEventFormStatus
}

export const postUserEvent = async (event: Event, token: Token) => {
    try {
        const response = await AxiosService.postUserEvent(event, token);
        console.log(response)
        if (response.status === 201 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to post');
        }
    } catch (error) {
        console.error('Error posting user event:', error);
        throw error;
    }
};

