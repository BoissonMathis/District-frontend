import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Token } from "./UserToken.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { Post } from "./UserConnectedPosts.observable";

export type Comment = {
    _id: string,
    user: User,
    post: Post,
    answer?: string,
    contentText: string,
    like: string[],
    created_at: string
}

export type CommentsInfo = {
    count: number,
    page: number,
    comments: Comment[]
}

let initialValue: CommentsInfo = {count: 0, page: 1, comments: []}

let userConnectedComments: CommentsInfo = initialValue

export const userConnectedComments$ = new BehaviorSubject(userConnectedComments)

export const setUserConnectedComments = async (newCommentsInfo: CommentsInfo) => {
    let commentsToAdd: Comment[] = [];

    if (newCommentsInfo.comments && newCommentsInfo.comments.length > 0) {
        for (let i = 0; i < newCommentsInfo.comments.length; i++) {
            const comment = newCommentsInfo.comments[i];
            const commentExists = userConnectedComments.comments.some((existingComment) => existingComment._id === comment._id);
            if (!commentExists) {
                commentsToAdd.push(comment);
            }
        }

        userConnectedComments = {
            count: newCommentsInfo.count,
            page: newCommentsInfo.page,
            comments: [...commentsToAdd, ...userConnectedComments.comments]
        };
    }

    return userConnectedComments$.next(userConnectedComments);
};

export const resetUserConnectedComments = async () => {
    userConnectedComments = initialValue
    return userConnectedComments$.next(userConnectedComments)
}

export const useUserConnectedComments = () => {
    const [userConnectedComments, setUserConnectedComments] = useState<CommentsInfo>();

    useEffect(() => {
        
        const subscription = userConnectedComments$.subscribe((updatedUserConnectedComments) => setUserConnectedComments(updatedUserConnectedComments))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userConnectedComments
}

export const getUserConnectedComments = async (user_id: string, valid_token: Token, page: number) => {
    try {
        const response = await AxiosService.getManyUserComments(user_id, valid_token, page)
        // console.log("Comments récupérée avec succès :", response)
        if(response.status == 200 && response.data){
            let newComments = {count: response.data.count, page: response.data.page, comments: response.data.results}
            setUserConnectedComments(newComments)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}