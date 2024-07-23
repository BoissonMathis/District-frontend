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
}