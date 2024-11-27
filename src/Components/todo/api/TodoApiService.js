import apiClient from "./ApiClient"

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/api/v2/users/${username}/todos`)

export const retrieveTodosApi
    = (username,id) => apiClient.get(`/api/v2/users/${username}/todos/${id}`)

export const creatTodosApi
    = (username,todo) => apiClient.post(`/api/v2/users/${username}/todos`,todo)
    
export const updateTodosForUsername_idApi
    = (username,id,todo) => apiClient.put(`/api/v2/users/${username}/todos/${id}`,todo)
   
export const deleteTodosForUsername_idApi
    = (username,id) => apiClient.delete(`/api/v2/users/${username}/todos/${id}`)
    
