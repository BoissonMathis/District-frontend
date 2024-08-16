import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Token } from "../userConnected/UserToken.observable";
import { Post, PostInfos } from "../userConnected/UserConnectedPosts.observable";

let initialValue: PostInfos = {count: 0, page: 1, posts: []}

let userReadOnlyPosts: PostInfos = initialValue

export const userReadOnlyPosts$ = new BehaviorSubject(userReadOnlyPosts)

export const setUserReadOnlyPosts = async (newPosts: PostInfos) => {
    let postsToAdd: Post[] = []
    newPosts.posts.forEach((post) => {
        const postExists = userReadOnlyPosts.posts.some((existingPost) => existingPost._id === post._id);
        if (!postExists) {
          postsToAdd.push(post);
        }
      });
    userReadOnlyPosts = {
        count: newPosts.count, 
        page: newPosts.page, 
        posts: [...userReadOnlyPosts.posts, ...postsToAdd]
    }
    return userReadOnlyPosts$.next(userReadOnlyPosts)
}

export const resetUserReadOnlyPosts = async () => {
    userReadOnlyPosts = initialValue
    return userReadOnlyPosts$.next(userReadOnlyPosts)
}

export const useUserReadOnlyPosts = () => {
    const [userReadOnlyPosts, setUserReadOnlyPosts] = useState<PostInfos>();

    useEffect(() => {
        const subscription = userReadOnlyPosts$.subscribe((updatedUserReadOnlyPosts) => setUserReadOnlyPosts(updatedUserReadOnlyPosts))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userReadOnlyPosts
}

export const getUserReadOnlyPosts = async (user_id: string, valid_token: Token, page: number) => {
    try {
        const response = await AxiosService.getManyUserPosts(user_id, valid_token, page)
        if(response.status == 200 && response.data){
            let userReadOnlyPostsUpdate = {count: response.data.count, page: response.config.params.page, posts: [...userReadOnlyPosts.posts, ...response.data.results]}
            setUserReadOnlyPosts(userReadOnlyPostsUpdate)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}