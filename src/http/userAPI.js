//import jwt_decode from "jwt_decode";
import host from "./index";

export const getUsers = async () => {
    const {data} = await host.get('api/user')
    return data
}

export const getIdUser = async (id) => {
    const {data} = await host.get(`api/user/${id}`)
    return data
}