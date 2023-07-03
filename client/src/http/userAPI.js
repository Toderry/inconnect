//import jwt_decode from "jwt_decode";
import host from "./index";

/**************************************************************
 * Создание нового пользователя
 **************************************************************/
export const addUser = async (id) => {
    const {data} = await host.post(`api/user`, {id})
    return data
}

/**************************************************************
 * Получение всех пользователей
 **************************************************************/
export const getUsers = async () => {
    const {data} = await host.get(`api/user`)
    return data
}

/**************************************************************
 * Получение пользователя по id
 **************************************************************/
export const getIdUser = async (id) => {
    const {data} = await host.get(`api/user/${id}`)
    return data
}


/**************************************************************
 * Обновление пользователя по id
 **************************************************************/
export const putIdUser = async (id) => {
    const {data} = await host.put(`api/user/${id}`)
    return data
}


/**************************************************************
 * Удаление пользователя по id
 **************************************************************/
export const deleteIdUser = async (id) => {
    const {data} = await host.delete(`api/user/${id}`)
    return data
}