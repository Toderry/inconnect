import host from "./index";


export const addUserToEvent = async (uid, eid) => {
    const {data} = await host.post(`api/userEvent`, {"user_id": uid, "event_id": eid})
    return data
}
export const getUserToEvents = async () => {
    const {data} = await host.get(`api/userEvent`)
    return data
}

export const getIdUserToEvent = async (id) => {
    const {data} = await host.get(`api/userEvent/id/${id}`)
    return data
}

export const getIdUserToIdEvent = async (uid, eid) => {
    const {data} = await host.post(`api/userEvent/IdId`,{"user_id": uid, "event_id": eid})
    return data
}

export const deleteIdUserToEvent = async (id) => {
    const {data} = await host.delete(`api/userEvent/${id}`)
    return data
}