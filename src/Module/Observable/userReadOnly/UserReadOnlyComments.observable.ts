import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Token } from "../userConnected/UserToken.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Comment, CommentsInfo } from "../userConnected/UserConnectedComments.observable";

let initialValue: CommentsInfo = {count: 0, page: 1, comments: []}

let userReadOnlyComments: CommentsInfo = initialValue

export const userReadOnlyComments$ = new BehaviorSubject(userReadOnlyComments)

export const setUserReadOnlyComments = async (newCommentsInfo: CommentsInfo) => {
    let commentsToAdd: Comment[] = [];

    if (newCommentsInfo.comments && newCommentsInfo.comments.length > 0) {
        for (let i = 0; i < newCommentsInfo.comments.length; i++) {
            const comment = newCommentsInfo.comments[i];
            const commentExists = userReadOnlyComments.comments.some((existingComment) => existingComment._id === comment._id);
            if (!commentExists) {
                commentsToAdd.push(comment);
            }
        }

        userReadOnlyComments = {
            count: newCommentsInfo.count,
            page: newCommentsInfo.page,
            comments: [...commentsToAdd, ...userReadOnlyComments.comments]
        };
    }

    return userReadOnlyComments$.next(userReadOnlyComments);
};

export const resetUserReadOnlyComments = async () => {
    userReadOnlyComments = initialValue
    return userReadOnlyComments$.next(userReadOnlyComments)
}

export const useUserReadOnlyComments = () => {
    const [userReadOnlyComments, setUserReadOnlyComments] = useState<CommentsInfo>();

    useEffect(() => {
        
        const subscription = userReadOnlyComments$.subscribe((updatedUserReadOnlyComments) => setUserReadOnlyComments(updatedUserReadOnlyComments))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userReadOnlyComments
}

export const getUserReadOnlyComments = async (user_id: string, valid_token: Token, page: number) => {
    console.log('OUAISSSSSSSSSSSSSSSSSSSSSSS', valid_token)
    try {
        const response = await AxiosService.getManyUserComments(user_id, valid_token, page)
        // console.log("Comments récupérée avec succès :", response)
        if(response.status == 200 && response.data){
            console.log('récupération des commentaires ok')
            let newComments = {count: response.data.count, page: response.data.page, comments: response.data.results}
            setUserReadOnlyComments(newComments)
        }
    }catch(e: any){
        console.log('ERROR:', e)
    }
}