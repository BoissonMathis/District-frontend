import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

type Error = {
    message: string,
    status: number
}

let error: Error = {message: '', status: 0}
export const errors$ = new BehaviorSubject(error)

export const setError = async (err: Error) => {
    error = err
    return errors$.next(error)
}

export const useError = () => {
    const [err, setErr] = useState<Error>();

    useEffect(() => {
        const subscription = errors$.subscribe((error) => setErr(error))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return err
}

export const handleError = (error: number) => {
    let newError = {message: '', status: 0}
    if (error) {
        if(error == 500){
            newError.message = 'Tous les champs doivent etre complétée'
            newError.status = 500
            setError(newError)
        }else if(error == 401){
            newError.message = "paire nom d'utilisateur/mot de passe incorrecte"
            newError.status = 401
            setError(newError)
        }else{
            console.log(error)
        }
    }else{
        newError.message = "Une erreur inconnue est survenue"
        newError.status = 666
        setError(newError)
    }
}