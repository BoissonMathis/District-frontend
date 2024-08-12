import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BehaviorSubject } from "rxjs";
import { setUserConnected } from "./UserConnected.observable";

export type Token = {
    token: string | null
}

let initialValue: Token = { token : null}

let userToken: Token = initialValue

export const userToken$ = new BehaviorSubject(userToken)

export const setUserToken = async (token: Token) => {
    userToken = token
    return userToken$.next(userToken)
}

export const resetUserToken = async () => {
    userToken = initialValue
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

export const useLogOut = () => {
    const navigate = useNavigate()
    setUserToken({token: ''})
    setUserConnected({_id: '', username: '', email: '', status: '', bio: '', profil_image: '', banner_image: '', follows: [], created_at: '', token: ''})
    navigate('/login')
}

// voir http only + cookies
// https://www.codeheroes.fr/2020/06/20/securiser-une-api-rest-3-3-gestion-du-jwt-cote-client/