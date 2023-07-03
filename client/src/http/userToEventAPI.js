import host from "./index";

/**************************************************************
 * Создание новой связи между user_id (пользоватля) и event_id (события)
 **************************************************************/
export const addUserToEvent = async (uid, eid) => {
    const {data} = await host.post(`api/userEvent`, {"user_id": uid, "event_id": eid})
    return data
}


/**************************************************************
 * Получение всех связей
 **************************************************************/
export const getUserToEvents = async () => {
    const {data} = await host.get(`api/userEvent`)
    return data
}

/**************************************************************
 * Получение связи по id
 **************************************************************/
export const getIdUserToEvent = async (id) => {
    const {data} = await host.get(`api/userEvent/id/${id}`)
    return data
}

/**************************************************************
 * Получение всех связей пользователя по user_id
 **************************************************************/
export const getEventToIdUser = async (user_id) => {
    const {data} = await host.get(`api/userEvent/userId/${user_id}`)
    return data
}

/**************************************************************
 * Получение связи по user_id (пользователя) и event_id (события)
 **************************************************************/
export const getIdUserToIdEvent = async (uid, eid) => {
    const {data} = await host.post(`api/userEvent/IdId`,{"user_id": uid, "event_id": eid})
    return data
}


/**************************************************************
 * Удаление связи по id
 **************************************************************/
export const deleteIdUserToEvent = async (id) => {
    const {data} = await host.delete(`api/userEvent/${id}`)
    return data
}