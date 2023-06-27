import host from "./index";


export const addEventToTag = async (eid, tid) => {
    const {data} = await host.post(`api/eventTag`, {"event_id": eid, "tag_id":tid})
    return data
}
export const getEventToTags = async () => {
    const {data} = await host.get(`api/eventTag`)
    return data
}

export const getIdEventToTag = async (id) => {
    const {data} = await host.get(`api/eventTag/${id}`)
    return data
}
export const getIdEventToIdTag = async (eid, tid) => {
    const {data} = await host.get(`api/eventTag/IdId`, {"event_id": eid, "tag_id":tid})
    return data
}

export const deleteIdEventToTag = async (id) => {
    const {data} = await host.delete(`api/eventTag/${id}`)
    return data
}