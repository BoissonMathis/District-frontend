import { BehaviorSubject } from "rxjs";
import { User } from "../../Infrastructure/User.ts/User.type";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { setUserToken, userToken$ } from "./UserToken.observable";
import { useEffect, useState } from "react";
import { setError } from "./Errors.observable";

let userConnected: User = {
    _id: '',
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

export const postLoginUser = async (username: string, password: string, remember_me: boolean) => {
    try {
        const response = await AxiosService.postLogin(username, password)
        if(response.status == 200 && response.data && response.data.token){
            setUserToken(response.data.token)
            setUserConnected(response.data)
            if(remember_me == true){
                try {
                    await AxiosService.updateUser(userConnected$.getValue()._id, userToken$.getValue(), {token: userToken$.getValue()})
                }catch(e: any){
                    console.log('ERROR:', e)
                    setError(e.response.data.msg)
                }
            }
        }
    }catch(e: any){
        console.log('ERROR:', e)
        setError(e.response.data.msg)
    }
}

export const postNewUser = async (email: string, username: string, password: string, confirmPassword: string, status: string, checked: boolean) => {
    if(password == confirmPassword && checked){
        try {
            const response = await AxiosService.postNewUser(email, username, password, status)
            console.log(response)
            if(response.status == 201){
                postLoginUser(username, password, false)
            }
        }catch(e: any){
            console.log('ERROR:', e)
            setError(e.response.data.msg)
        }
    }else{
        if(password !== confirmPassword)
            setError("Le mot de passe et sa confirmation ne correspondent pas")
        else
            setError("veuillez accepter les conditions d'utilisations")
    } 
}

export const setUserConnected = async (user: User) => {
    userConnected = user
    return userConnected$.next(userConnected)
}

export const useUserConnected = () => {
    const [userConnected, setUserConnected] = useState<User>({
        _id: '',
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
