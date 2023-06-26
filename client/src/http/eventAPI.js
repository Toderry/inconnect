import host from "./index";

export const addEvent = async (id) => {
    const {data} = await host.post('api/event', {id})
    return data
}
export const getEvents = async () => {
    const {data} = await host.get('api/event')
    return data
}

export const getIdEvent = async (id) => {
    const {data} = await host.get(`api/event/id/${id}`)
    return data
}

export const putIdEvent = async (id) => {
    const {data} = await host.put(`api/event/id/${id}`)
    return data
}

export const deleteIdEvent = async (id) => {
    const {data} = await host.delete(`api/event/id/${id}`)
    return data
}