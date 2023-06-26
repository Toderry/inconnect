import host from "./index";

export const addTag = async (id) => {
    const {data} = await host.post(`api/tag`, {id})
    return data
}
export const getTags = async () => {
    const {data} = await host.get(`api/tag`)
    return data
}

export const getIdTag = async (id) => {
    const {data} = await host.get(`api/tag/${id}`)
    return data
}

export const putIdTag = async (id) => {
    const {data} = await host.put(`api/tag/${id}`)
    return data
}
export const deleteIdTag = async (id) => {
    const {data} = await host.delete(`api/tag/${id}`)
    return data
}