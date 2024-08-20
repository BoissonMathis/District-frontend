import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";

let updateFormEvent: boolean = false

export const updateFormEvent$ = new BehaviorSubject(updateFormEvent)

export const setUpdateFormEvent = async () => {
    updateFormEvent = !updateFormEvent
    return updateFormEvent$.next(updateFormEvent)
}

export const useUpdateFormEvent = () => {
    const [updateFormEvent, setUpdateFormEvent] = useState<boolean>(false);

    useEffect(() => {
        const subscription = updateFormEvent$.subscribe((newUpdateFormEvent) => setUpdateFormEvent(newUpdateFormEvent))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return updateFormEvent
}
