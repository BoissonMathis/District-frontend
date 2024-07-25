import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

let error: string = ''
export const errors$ = new BehaviorSubject(error)

export const setError = async (err: string) => {
    error = err
    return errors$.next(error)
}

export const useError = () => {
    const [err, setErr] = useState<string>('');

    useEffect(() => {
        const subscription = errors$.subscribe((error) => setErr(error))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return err
}