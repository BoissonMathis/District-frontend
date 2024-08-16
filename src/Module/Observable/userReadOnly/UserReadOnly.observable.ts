import { BehaviorSubject } from "rxjs";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { useEffect, useState } from "react";
import { setError } from "../Errors.observable";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { Token } from "../userConnected/UserToken.observable";

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

let userReadOnly: User = initialValue;

export const userReadOnly$ = new BehaviorSubject(userReadOnly)

export const setUserReadOnly = async (user: User) => {
    console.log('ICIIIIIIII', user)
    userReadOnly = user
    return userReadOnly$.next(userReadOnly)
}

export const resetUserReadOnly = async () => {
    userReadOnly = initialValue
    return userReadOnly$.next(userReadOnly)
}

export const useUserReadOnly = () => {
    const [userReadOnly, setUserReadOnly] = useState<User>({
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
        const subscription = userReadOnly$.subscribe((user) => setUserReadOnly(user))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return userReadOnly
}

export const getUserReadOnly = async (user_id: string, token: Token) => {
    try {
        const response = await AxiosService.getUserById(user_id, token)
        if(response.status == 200 && response.data ){
            setUserReadOnly(response.data)
        }
    }catch(e: any){
        console.log('ERROR:', e)
        setError(e.response.data.msg)
    }
}