import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

type Comment = {
    id_: string,
    contentText: string
}

let userConnectedComments: Comment[] = []

export const userConnectedComments$ = new BehaviorSubject(userConnectedComments)

export const setUserConnectedComments = async (newComments: Comment[]) => {
    userConnectedComments = [...newComments, ...userConnectedComments]
    return userConnectedComments$.next(userConnectedComments)
}

export const useUserConnectedComments = () => {
    const [userConnectedComments, setUserConnectedComments] = useState<Comment[]>([]);

    useEffect(() => {
        
        const subscription = userConnectedComments$.subscribe((updatedUserConnectedComments) => setUserConnectedComments(updatedUserConnectedComments))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnectedComments
}