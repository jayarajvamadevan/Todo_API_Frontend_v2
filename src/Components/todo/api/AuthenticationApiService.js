import apiClient from "./ApiClient"
export const executeBasicAuthenticationService 
    = (token) => apiClient.get(`/api/v1/basicauth`,{
        headers: {
            Authorization: token
        }
    })
    export const executeJwtAuthenticationService 
    = (username,password) => 
         apiClient.post(`/api/v2/authenticate`,{username,password})