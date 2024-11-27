import apiClient from "./ApiClient"
export const retrieveHelloWorldBean 
    = () => apiClient.get('/api/v1/hello-world-bean')

export const retrieveHelloWorldPathVariable 
    = (username) => apiClient.get(`/api/v1/hello-world-path/${username}`)


 