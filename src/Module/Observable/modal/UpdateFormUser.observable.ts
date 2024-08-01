import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";

let updateFormUser: boolean = false

export const updateFormUser$ = new BehaviorSubject(updateFormUser)

export const setUpdateFormUser = async () => {
    updateFormUser = !updateFormUser
    return updateFormUser$.next(updateFormUser)
}

export const useUpdateFormUser = () => {
    const [updateFormUser, setUpdateFormUser] = useState<boolean>(false);

    useEffect(() => {
        const subscription = updateFormUser$.subscribe((newUpdateFormUser) => setUpdateFormUser(newUpdateFormUser))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return updateFormUser
}
