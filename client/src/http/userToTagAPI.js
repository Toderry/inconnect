import host from "./index";

/**************************************************************
 * Создание новой связи между user_id (пользоватля) и tag_id (тега)
 **************************************************************/
export const addUserToTag = async (uid, tid) => {
    const {data} = await host.post(`api/userTag`, {"user_id": uid, "tag_id": tid})
    return data
}


/**************************************************************
 * Получение всех связей
 **************************************************************/
export const getUserToTags = async () => {
    const {data} = await host.get(`api/userTag`)
    return data
}

/**************************************************************
 * Получение связи по id
 **************************************************************/
export const getIdUserToTag = async (id) => {
    const {data} = await host.get(`api/userTag/id/${id}`)
    return data
}

/**************************************************************
 * Получение всех связей пользователя по user_id
 **************************************************************/
export const getTagToIdUser = async (user_id) => {
    const {data} = await host.get(`api/userTag/userId/${user_id}`)
    return data
}

/**************************************************************
 * Получение связи по user_id (пользователя) и tag_id (тега)
 **************************************************************/
export const getIdUserToIdTag = async (uid, eid) => {
    const {data} = await host.post(`api/userTag/IdId`,{"user_id": uid, "tag_id": eid})
    return data
}


/**************************************************************
 * Удаление связи по id
 **************************************************************/
export const deleteIdUserToTag = async (id) => {
    const {data} = await host.delete(`api/userTag/${id}`)
    return data
}