import host from "./index";

/**************************************************************
 * Создание новой связи между event_id (событием} и tag_id (тегом)
 **************************************************************/
export const addEventToTag = async (eid, tid) => {
    const {data} = await host.post(`api/eventTag`, {"event_id": eid, "tag_id": tid})
    return data
}

/**************************************************************
 * Получение всех связей
 **************************************************************/
export const getEventToTags = async () => {
    const {data} = await host.get(`api/eventTag`)
    return data
}

/**************************************************************
 * Получение связи по id
 **************************************************************/
export const getIdEventToTag = async (id) => {
    const {data} = await host.get(`api/eventTag/${id}`)
    return data
}

/**************************************************************
 * Получение связи по event_id (события) и tag_id (тега)
 **************************************************************/
export const getIdEventToIdTag = async (eid, tid) => {
    const {data} = await host.get(`api/eventTag/IdId`, {"event_id": eid, "tag_id": tid})
    return data
}

/**************************************************************
 * Получение поля URL картинки по event_id (событию)
 **************************************************************/
export const getPictureByEventId = async (eid) => {
    const {data} = await host.get(`api/eventTag/picture/${eid}`)
    return data
}

/**************************************************************
 * Получение teg_id (тега) по event_id (события)
 **************************************************************/
export const getTagIdByEventId = async (eid) => {
    const {data} = await host.get(`api/eventTag/tagId/${eid}`)
    return data
}

/**************************************************************
 * Получение все события по teg_id (тега)
 **************************************************************/
export const getEventByTagId = async (tid) => {
    const {data} = await host.get(`api/eventTag/eventByTag/${tid}`)
    return data
}


/**************************************************************
 * Удаление связи по id
 **************************************************************/
export const deleteIdEventToTag = async (id) => {
    const {data} = await host.delete(`api/eventTag/${id}`)
    return data
}