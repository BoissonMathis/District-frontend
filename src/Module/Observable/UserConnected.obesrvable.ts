import { BehaviorSubject } from "rxjs";
import { User } from "../../Infrastructure/User.ts/User.type";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { setUserToken, userToken$ } from "./UserToken.observable";
import { useEffect, useState } from "react";

let userConnected: User = {
    username: '',
    email: '',
    status: '',
    bio: '',
    profil_image: '',
    banner_image: '',
    follows: [],
    created_at: '',
    token: ''
}

export const userConnected$ = new BehaviorSubject(userConnected)

export const postLoginUser = async (username: string, password: string) => {
    try {
        const response = await AxiosService.postLogin(username, password)
        // console.log(response)
        // console.log(response.status)
        if(response.status == 200 && response.data && response.data.token){
            setUserToken(response.data.token)
            setUserConnected(response.data)
        }
    }catch(e: any){
        // console.log('ERROR:', e)
        // console.log(e.response.status)
        handleError(e.response.status)
    }
}

export const postNewUser = async (email: string, username: string, password: string, status: string) => {
    console.log({email: email, username: username, password: password, status: status})
    try {
        const response = await AxiosService.postNewUser(email, username, password, status)
        console.log(response)
        if(response.status == 201){
            postLoginUser(username, password)
        }
    }catch(e: any){
        console.log('ERROR:', e)
        console.log(e.response.status)
        handleError(e.response.status)
    }
}

export const setUserConnected = async (user: User) => {
    userConnected = user
    return userConnected$.next(userConnected)
}

const handleError = (error: number) => {
    if (error) {
        if(error == 500){
            console.log('Tous les champs doivent etre complétée')
        }else if(error == 401){
            console.log("paire nom d'utilisateur/mot de passe incorrecte")
        }else{
            console.log(error)
        }
    }else{
        console.log('une erreur inconnue est survenu')
    }
}

export const useUserConnected = () => {
    const [userConnected, setUserConnected] = useState<User>({
        username: '',
        email: '',
        status: '',
        bio: '',
        profil_image: '',
        banner_image: '',
        follows: [],
        created_at: '',
        token: ''
    });

    useEffect(() => {
        const subscription = userConnected$.subscribe((user) => setUserConnected(user))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnected
}
