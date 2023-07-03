import host from "./index";

export const addUserToTag = async (uid, tid) => {
    const {data} = await host.post(`api/userTag`, {"user_id": uid, "tag_id": tid})
    return data
}


export const getUserToTags = async () => {
    const {data} = await host.get(`api/userTag`)
    return data
}
export const getIdUserToTag = async (id) => {
    const {data} = await host.get(`api/userTag/id/${id}`)
    return data
}
export const getTagToIdUser = async (user_id) => {
    const {data} = await host.get(`api/userTag/userId/${user_id}`)
    return data
}
export const getIdUserToIdTag = async (uid, eid) => {
    const {data} = await host.post(`api/userTag/IdId`,{"user_id": uid, "event_id": eid})
    return data
}


export const deleteIdUserToTag = async (id) => {
    const {data} = await host.delete(`api/userTag/${id}`)
    return data
}