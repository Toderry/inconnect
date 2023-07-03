import host from "./index";

/**************************************************************
 * Создание нового события
 **************************************************************/
export const addEvent = async (id) => {
    const {data} = await host.post('api/event', {id})
    return data
}

/**************************************************************
 * Получение всех событий
 **************************************************************/
export const getEvents = async () => {
    const {data} = await host.get('api/event')
    return data
}

/**************************************************************
 * Получение события по id
 **************************************************************/
export const getIdEvent = async (id) => {
    const {data} = await host.get(`api/event/id/${id}`)
    return data
}


/**************************************************************
 * Обновление данных события по id
 **************************************************************/
export const putIdEvent = async (id) => {
    const {data} = await host.put(`api/event/id/${id}`)
    return data
}


/**************************************************************
 * Удаление события по id
 **************************************************************/
export const deleteIdEvent = async (id) => {
    const {data} = await host.delete(`api/event/id/${id}`)
    return data
}