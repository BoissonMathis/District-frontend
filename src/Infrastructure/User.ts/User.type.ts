export type User = {
    _id: string,
    username: string,
    email: string,
    status: string,
    bio: string,
    profil_image: string,
    banner_image: string,
    follows: string[],
    created_at: string,
    token: string
}