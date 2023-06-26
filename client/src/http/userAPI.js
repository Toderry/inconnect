//import jwt_decode from "jwt_decode";
import host from "./index";

export const addUser = async (id) => {
    const {data} = await host.post(`api/user`, {id})
    return data
}

export const getUsers = async () => {
    const {data} = await host.get(`api/user`)
    return data
}

export const getIdUser = async (id) => {
    const {data} = await host.get(`api/user/${id}`)
    return data
}

export const putIdUser = async (id) => {
    const {data} = await host.put(`api/user/${id}`)
    return data
}

export const deleteIdUser = async (id) => {
    const {data} = await host.delete(`api/user/${id}`)
    return data
}