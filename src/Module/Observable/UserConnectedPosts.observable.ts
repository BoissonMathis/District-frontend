import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { Token } from "./UserToken.observable";

export type Post = {
    _id: string,
    user: string,
    contentText: string,
    like: string[],
    repost: string[],
    comment: string[],
    created_by: string,
    created_at: string
}

export type PostInfos = {
    count: number,
    page: number,
    posts: Post[]
}

let userConnectedPosts: PostInfos = {count: 0, page: 1, posts: []}

export const userConnectedPosts$ = new BehaviorSubject(userConnectedPosts)

export const setUserConnectedPosts = async (newPosts: PostInfos) => {
    userConnectedPosts = {
        count: newPosts.count, 
        page: newPosts.page, 
        posts: [...userConnectedPosts.posts, ...newPosts.posts]
    }
    return userConnectedPosts$.next(userConnectedPosts)
}

export const useUserConnectedPosts = () => {
    const [userConnectedPosts, setUserConnectedPosts] = useState<PostInfos>();

    useEffect(() => {
        const subscription = userConnectedPosts$.subscribe((updatedUserConnectedPosts) => setUserConnectedPosts(updatedUserConnectedPosts))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnectedPosts
}

export const getUserConnectedPosts = async (user_id: string, valid_token: Token, page: number) => {
    try {
        const response = await AxiosService.getManyUserPosts(user_id, valid_token, page)
        console.log(response)
        if(response.status == 200 && response.data){
            let userConnectedPostsUpdate = {count: response.data.count, page: response.config.params.page, posts: [...userConnectedPosts.posts, ...response.data.results]}
            setUserConnectedPosts(userConnectedPostsUpdate)
            console.log('Posts a jour:', userConnectedPosts$.getValue())
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}