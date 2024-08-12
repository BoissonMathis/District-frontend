import { BehaviorSubject } from "rxjs";
import { User } from "../../Infrastructure/User.ts/User.type";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { resetUserToken, setUserToken, Token, userToken$ } from "./UserToken.observable";
import { useEffect, useState } from "react";
import { setError } from "./Errors.observable";
import { setUpdateFormUser } from "./modal/UpdateFormUser.observable";
import { getUserConnectedPosts, setUserConnectedPosts } from "./UserConnectedPosts.observable";
import { getUserConnectedComments } from "./UserConnectedComments.observable";
import { getUserConnectedEvents } from "./UserConnectedEvent.observable";

let initialValue: User = {
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

let userConnected: User = initialValue;

export const userConnected$ = new BehaviorSubject(userConnected)

export const setUserConnected = async (user: User) => {
    userConnected = user
    return userConnected$.next(userConnected)
}

export const resetUserConnected = async () => {
    userConnected = initialValue
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

export const postLoginUser = async (username: string, password: string, remember_me: boolean) => {
    try {
        const response = await AxiosService.postLogin(username, password)
        if(response.status == 200 && response.data && response.data.token && response.data._id){
            setUserToken(response.data.token)
            setUserConnected(response.data)
            getUserConnectedPosts(response.data._id, response.data.token, 1)
            getUserConnectedComments(response.data._id, response.data.token, 1)
            getUserConnectedEvents(response.data._id, response.data.token, 1)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
        }
    }catch(e: any){
        console.log('ERROR:', e)
        setError(e.response.data.msg)
    }
}

export const postLogoutUser = async (user_id: string) => {
    try {
        const response = await AxiosService.postLogout(user_id)
        if(response.status == 200){
            // localStorage.removeItem("token");
            // localStorage.removeItem("userId");
            localStorage.clear()
            resetUserConnected()
            resetUserToken()
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

export const putUpdateUser = async (user_id: string, token: Token, update: object) => {
    try {
        const response = await AxiosService.updateUser(user_id, token, update)
        if(response.status == 200){
            setUserConnected(response.data)
            setUpdateFormUser()
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const authUser = async (user_id: string, token: Token) => {
    try {
        const response = await AxiosService.getUserById(user_id, token)
        if(response.status == 200){
            setUserConnected(response.data)
            setUserToken(response.data.token)
            getUserConnectedPosts(response.data._id, response.data.token, 1)
            getUserConnectedComments(response.data._id, response.data.token, 1)
            getUserConnectedEvents(response.data._id, response.data.token, 1)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}