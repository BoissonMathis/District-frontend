import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Token } from "../UserToken.observable";

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
        const subscription = postForm$.subscribe((newPostForm) => setUpdatePostForm(newPostForm))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return updatePostForm
}

export const postUserPost = async (user_id: string, contentText: string, valid_token: Token) => {
    try {
        const response = await AxiosService.postUserPost(user_id, contentText, valid_token)
        if(response.status == 201){
            console.log(response.data)
        }
    }catch(error: any){
        console.log('ERROR:', error)
    }
}
