import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

export type Token = {
    token: string | null
  }

let userToken: Token = { token : null}

export const userToken$ = new BehaviorSubject(userToken)

export const setUserToken = async (token: Token) => {
    userToken = token
    return userToken$.next(userToken)
}

export const useUserToken = () => {
    const [userToken, setUserToken] = useState<Token>();

    useEffect(() => {
        
        const subscription = userToken$.subscribe((token) => setUserToken(token))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userToken
}

// voir http only + cookies
// https://www.codeheroes.fr/2020/06/20/securiser-une-api-rest-3-3-gestion-du-jwt-cote-client/