import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";

let searchModal: boolean = false

export const searchModal$ = new BehaviorSubject(searchModal)

export const setSearchModal = async () => {
    searchModal = !searchModal
    return searchModal$.next(searchModal)
}

export const useSearchModalStatus = () => {
    const [upToDateSearchModalStatus, setUpdateSearchModalStatus] = useState<boolean>(false);

    useEffect(() => {
        const subscription = searchModal$.subscribe((newSearchModalStatus) => setUpdateSearchModalStatus(newSearchModalStatus))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return upToDateSearchModalStatus
}