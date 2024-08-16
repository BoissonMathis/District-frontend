import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";
import { Post } from "./userConnected/UserConnectedPosts.observable";

let initialValue: Post[] = []

let userConnectedFeed: Post[] = initialValue;

export const userConnectedFeed$ = new BehaviorSubject(userConnectedFeed)

export const setUserConnectedFeed = async (newFeed: Post[]) => {
    let postsToAdd: Post[] = []
    newFeed.forEach((post) => {
        const postExists = userConnectedFeed.some((existingPost) => existingPost._id === post._id);
        if (!postExists) {
          postsToAdd.push(post);
        }
      });
    userConnectedFeed = [...userConnectedFeed, ...postsToAdd]

    return userConnectedFeed$.next(userConnectedFeed)
}

export const resetUserConnectedFeed = async () => {
    userConnectedFeed = initialValue
    return userConnectedFeed$.next(userConnectedFeed)
}

export const useUserConnectedFeed = () => {
    const [userConnectedFeed, setUserConnectedFeed] = useState<Post[]>([]);

    useEffect(() => {
        const subscription = userConnectedFeed$.subscribe((user) => setUserConnectedFeed(user))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnectedFeed
}