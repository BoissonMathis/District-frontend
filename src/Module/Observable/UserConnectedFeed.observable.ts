import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Token } from "./UserToken.observable";
import { AxiosService } from "../../Infrastructure/Http/axios.service";
import { Post } from "./UserConnectedPosts.observable";

export type Feed = {
    count: number,
    posts: Post[]
}


let initialValue: Feed = {count: 0, posts: []}

let userConnectedFeed: Feed = initialValue

export const userConnectedFeed$ = new BehaviorSubject(userConnectedFeed)

export const setUserConnectedFeed = async (newFeed: Feed) => {
    let postsToAdd: Post[] = [];

    if (newFeed.posts && newFeed.posts.length > 0) {

        for (let i = 0; i < newFeed.posts.length; i++) {
            const post = newFeed.posts[i];
            const postExists = userConnectedFeed.posts.some((existingPost) => existingPost._id === post._id);
            if (!postExists) {
                postsToAdd.push(post);
            }
        }

        userConnectedFeed = {
            count: userConnectedFeed.count+postsToAdd.length,
            posts: [...postsToAdd, ...userConnectedFeed.posts]
        };
    }

    return userConnectedFeed$.next(userConnectedFeed);
};

export const resetUserConnectedFeed = async () => {
    userConnectedFeed = initialValue
    return userConnectedFeed$.next(userConnectedFeed)
}

export const useUserConnectedFeed = () => {
    const [userConnectedFeed, setUserConnectedFeed] = useState<Feed>();

    useEffect(() => {
        
        const subscription = userConnectedFeed$.subscribe((updatedUserConnectedFeed) => setUserConnectedFeed(updatedUserConnectedFeed))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnectedFeed
}

export const getUserConnectedFeed = async (user_id: string, valid_token: Token) => {
    try {
        const response = await AxiosService.getUserConnectedFeed(user_id, valid_token)
        if(response.status == 200 && response.data){
            console.log('récupération du feed - S', response)
            let newPosts = {count: response.data.count, posts: response.data.posts}
            setUserConnectedFeed(newPosts)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}