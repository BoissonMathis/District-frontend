import { Token } from '../../Module/Observable/UserToken.observable'
import { http } from './axios.instance'

export class AxiosService {
    static postLogin = async (username: string, password: string) => {
        try {
            const response = await http.post('/login', { username: username, password: password})
            return response
        } catch (error) {
            console.log("ERROR => ", error)
            throw error
        }
    }

    static postNewUser = async (email: string, username: string, password: string, status: string) => {
        try {
            const response = await http.post('/user', { email: email, username: username, password: password, status: status})
            return response
        } catch (error) {
            console.log("ERROR => ", error)
            throw error
        }
    }

    static updateUser = async (user_id: string, valid_token: Token, updateBody: object) => {
        try {
            const response = await http.put(`/user/${user_id}`, updateBody, { headers: {"Authorization" : `Bearer ${valid_token}`} })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    // static getUserPosts = async () => {
    //     try{
    //         const response = await http.get(`/post/${user_id}`, updateBody, { headers: {"Authorization" : `Bearer ${valid_token}`} })
    //         return response
    //     }catch(error){
    //         console.log("ERROR =>", error)
    //         throw error
    //     }
    // }
}