import { BehaviorSubject } from "rxjs";
import { User } from "../../Infrastructure/User.ts/User.type";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { setUserToken } from "./UserToken.observable";
import { useEffect, useState } from "react";
import { handleError } from "./Errors.observable";

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

export const postNewUser = async (email: string, username: string, password: string, confirmPassword: string, status: string, checked: boolean) => {
    if(password == confirmPassword && checked){
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
    }else{
        if(checked)
            console.log('Le mot de passe et sa confirmation ne correspondent pas')
        else
            console.log("veuillez accepter les conditions d'utilisations")
    }
    
}

export const setUserConnected = async (user: User) => {
    userConnected = user
    return userConnected$.next(userConnected)
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
