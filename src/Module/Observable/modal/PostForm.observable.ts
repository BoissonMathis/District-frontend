import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Token } from "../userConnected/UserToken.observable";

let postForm: boolean = false

export const postForm$ = new BehaviorSubject(postForm)

export const setPostForm = async () => {
    postForm = !postForm
    console.log(postForm)
    return postForm$.next(postForm)
}

export const usePostFormStatus = () => {
    const [updatePostForm, setUpdatePostForm] = useState<boolean>(false);

    useEffect(() => {
        const subscription = postForm$.subscribe((newPostFormStatus) => setUpdatePostForm(newPostFormStatus))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return updatePostForm
}

export const postUserPost = async (user_id: string, contentText: string, token: Token, file?: File | null) => {
    try {
        const response = await AxiosService.postUserPost(user_id, contentText, token, file);
        console.log(response)
        if (response.status === 201 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to post');
        }
    } catch (error) {
        console.error('Error posting user post:', error);
        throw error;
    }
};
