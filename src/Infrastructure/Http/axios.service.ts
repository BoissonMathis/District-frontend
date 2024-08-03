import { Token } from '../../Module/Observable/UserToken.observable'
import { http } from './axios.instance'

export class AxiosService {

    //User
    static postLogin = async (username: string, password: string) => {
        try {
            const response = await http.post('/login', { username: username, password: password})
            return response
        } catch (error) {
            console.log("ERROR => ", error)
            throw error
        }
    }

    static postLogout = async (user_id: string) => {
        try {
            const response = await http.post('/logout/'+user_id)
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

    static postUserPost = async (user_id: string, contentText: string, valid_token: Token) => {
        try{
            const response = await http.post("/post", { user: user_id, contentText: contentText}, { headers: {"Authorization" : `Bearer ${valid_token}`}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    //post
    static getManyUserPosts = async (user_id: string, valid_token: Token, page: number) => {
        try{
            const response = await http.get(`/posts_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {q: user_id, page: page, pageSize: 5, field: 'user'} })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

}