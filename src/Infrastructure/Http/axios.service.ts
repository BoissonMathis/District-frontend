import { Event } from '../../Module/Observable/userConnected/UserConnectedEvent.observable'
import { Token } from '../../Module/Observable/userConnected/UserToken.observable'
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

    static postLogout = async (user_id: string, valid_token: Token) => {
        try {
            const response = await http.post(`/logout/${user_id}`, { headers: {"Authorization" : `Bearer ${valid_token.token}`} })
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

    static getUserById = async (userId: string, valid_token: Token) => {
        // console.log(valid_token)
        try {
            const response = await http.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${valid_token.token}`} })
            return response
        } catch (error) {
            console.log("ERROR => ", error)
            throw error
        }
    }

    static getUsersByFilter = async (valid_token: string, page: number, limit: number, search: string) => {
        try {
            const response = await http.get(`/users_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {page: page, pageSize: limit, q: search}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
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
            const response = await http.post("/post", { user: user_id, contentText: contentText}, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    //post
    static getManyUserPosts = async (user_id: string, valid_token: Token, page: number) => {
        try{
            const response = await http.get(`/posts_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {q: user_id, page: page, pageSize: 5, field: 'user', populate: true} })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static getOnePostById = async (post_id: string, valid_token: Token) => {
        try{
            const response = await http.get(`/post/${post_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true}  })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static deleteOnePostById = async (post_id: string, valid_token: Token) => {
        try{
            const response = await http.delete(`/post/${post_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true}  })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    //comments
    static getOneCommentById = async (comment_id: string, valid_token: Token) => {
        try{
            const response = await http.get(`/comment/${comment_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true} })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static getManyUserComments = async (user_id: string, valid_token: Token, page: number) => {
        try{
            const response = await http.get(`/comments_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {q: user_id, page: page, pageSize: 5, field: 'user', populate: true} })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static getManyComments = async (id: string, valid_token: Token, page: number, field: string) => {
        try{
            const response = await http.get(`/comments_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {q: id, page: page, pageSize: 5, field: field, populate: true} })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static postOneComment = async (user_id: string, post_id: string, valid_token: Token, contentText: string) => {
        try{
            const response = await http.post("/comment", {user: user_id, post: post_id, contentText: contentText}, { headers: {"Authorization" : `Bearer ${valid_token}`}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    //events
    static getManyUserEvents = async (user_id: string, valid_token: Token, page: number) => {
        try {
            const response = await http.get(`/events_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {user: user_id, page: page, pageSize: 5, populate: true} })
            // console.log('Appel récupération events :', response)
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static getManyEvents = async (valid_token: Token, page: number, search: any) => {
        try {
            const response = await http.get(`/events_by_filters`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {page: page, pageSize: 5, type: search.type, level: search.level, categorie: search.categorie, user: search.user, populate: true} })
            // console.log('Appel récupération events :', response)
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static getOneEventById = async (event_id: string, valid_token: Token) => {
        try{
            const response = await http.get(`/event/${event_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true}  })
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw error
        }
    }

    static postUserEvent = async (event: Event, valid_token: Token) => {
        // console.log('Event envoyé :', event)
        try{
            const response = await http.post("/event", { ...event }, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    static putUserEvent = async (event_id: string, update: Event, valid_token: Token) => {
        // console.log('Event envoyé :', event)
        try{
            const response = await http.put(`/event/${event_id}`, { ...update }, { headers: {"Authorization" : `Bearer ${valid_token}`} })
            console.log(response)
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    //feed
    static getUserConnectedFeed = async (user_id: string, valid_token: Token) => {
        try{
            const response = await http.get(`/feed/${user_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: {populate: true}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    //follow
    static followUser = async (user_id: string, user_follow_id: string, valid_token: Token) => {
        try{
            const response = await http.put(`/follow/${user_id}`, null, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: { follow_id: user_follow_id}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    static unfollowUser = async (user_id: string, user_unfollow_id: string, valid_token: Token) => {
        try{
            const response = await http.delete(`/unfollow/${user_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: { unfollow_id: user_unfollow_id}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    static like = async (user_id: string, item_id: string, type: string, valid_token: Token) => {
        try{
            const response = await http.put(`/like/${user_id}`, null, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: { item_id: item_id, type: type }})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    static dislike = async (user_id: string, item_id: string, type: string, valid_token: Token) => {
        try{
            const response = await http.delete(`/dislike/${user_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: { item_id: item_id, type: type }})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    static repost = async (user_id: string, post_id: string, valid_token: Token) => {
        try{
            const response = await http.put(`/repost/${user_id}`, null, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: { post_id: post_id}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }

    static cancelRepost = async (user_id: string, post_id: string, valid_token: Token) => {
        try{
            const response = await http.delete(`/cancelrepost/${user_id}`, { headers: {"Authorization" : `Bearer ${valid_token}`}, params: { post_id: post_id}})
            return response
        }catch(error){
            console.log("ERROR =>", error)
            throw(error)
        }
    }
}