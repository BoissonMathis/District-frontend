import { BehaviorSubject } from "rxjs";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { resetUserToken, setUserToken, Token } from "./UserToken.observable";
import { useEffect, useState } from "react";
import { setError } from "../Errors.observable";
import { setUpdateFormUser } from "../modal/UpdateFormUser.observable";
import { getUserConnectedPosts, resetUserConnectedPosts } from "./UserConnectedPosts.observable";
import { getUserConnectedComments, resetUserConnectedComments } from "./UserConnectedComments.observable";
import { getUserConnectedEvents, resetUserConnectedEvents } from "./UserConnectedEvent.observable";
import { getUserConnectedFeed } from "./UserConnectedFeed.observable";

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
            getUserConnectedFeed(response.data._id, response.data.token)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
            localStorage.setItem('remember_me', remember_me.toString())
        }
    }catch(e: any){
        console.log('ERROR:', e)
        setError(e.response.data.msg)
    }
}

export const postLogoutUser = async (user_id: string, token_valid: Token) => {
    console.log("postLogoutUser déclenché")
    try {
        const response = await AxiosService.postLogout(user_id, token_valid)
        if(response.status == 200){
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            resetUserConnectedComments()
            resetUserConnectedEvents()
            resetUserConnectedPosts()
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

export const follow = async (user_id: string, user_follow_id: string, token: Token) => {
    try {
        const response = await AxiosService.followUser(user_id, user_follow_id, token)
        console.log(response)
        if(response.status == 200){
            setUserConnected(response.data)
            getUserConnectedFeed(user_id, token)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const unfollow = async (user_id: string, user_unfollow_id: string, token: Token) => {
    try {
        const response = await AxiosService.unfollowUser(user_id, user_unfollow_id, token)
        console.log(response)
        if(response.status == 200){
            setUserConnected(response.data)
            getUserConnectedFeed(user_id, token)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const like = async (user_id: string, post_like_id: string, token: Token) => {
    try {
        const response = await AxiosService.like(user_id, post_like_id, token)
        console.log(response)
        // if(response.status == 200){
        //     setUserConnected(response.data)
        //     getUserConnectedFeed(user_id, token)
        // }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const dislike = async (user_id: string, post_dislike_id: string, token: Token) => {
    try {
        const response = await AxiosService.dislike(user_id, post_dislike_id, token)
        console.log(response)
        // if(response.status == 200){
        //     setUserConnected(response.data)
        //     getUserConnectedFeed(user_id, token)
        // }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const repost = async (user_id: string, post_repost_id: string, token: Token) => {
    try {
        const response = await AxiosService.repost(user_id, post_repost_id, token)
        console.log(response)
        // if(response.status == 200){
        //     setUserConnected(response.data)
        //     getUserConnectedFeed(user_id, token)
        // }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}

export const cancelrepost = async (user_id: string, post_cancel_repost_id: string, token: Token) => {
    try {
        const response = await AxiosService.cancelRepost(user_id, post_cancel_repost_id, token)
        console.log(response)
        // if(response.status == 200){
        //     setUserConnected(response.data)
        //     getUserConnectedFeed(user_id, token)
        // }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}