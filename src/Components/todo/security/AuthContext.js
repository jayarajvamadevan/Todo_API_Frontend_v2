import { createContext, useContext, useState } from "react"
//import { executeBasicAuthenticationService } from "../api/AuthenticationApiService"
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"
import apiClient from "../api/ApiClient"
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider ({children})
{
   const[isAuthenticated,setAuthentication] =useState(false)
   const[username,setUsername] =useState(null)

   const[token,setToken] =useState(null) 

//Basic Authentication
//    async function login(username,password)
//    { 
//     const  baToken = 'Basic '+ window.btoa(username + ":" + password)
//             try{
//                 const response = await executeBasicAuthenticationService(baToken)     
//                 if(response.status === 200) {
//                     setAuthentication(true)
//                     setUsername(username)
//                     setToken(baToken)
//                     apiClient.interceptors.request.use(
//                         (config) =>{
//                             console.log("Intercepting and adding token")
//                             config.headers.Authorization = baToken
//                             return config
//                         }
//                     )
//                     return true
//                 }
//                 else{
//                     logout()
//                     return false
//                 }
//             }catch(error){
//                     logout()
//                     return false
//             }
    
//     }
//Jwt Authentication
    async function login(username,password)
   { 
            try{
                const response = await executeJwtAuthenticationService(username,password)     
                if(response.status === 200) {
                    const jwtToken = 'Bearer ' + response.data.token
                    setAuthentication(true)
                    setUsername(username) 
                    setToken(jwtToken)

                    apiClient.interceptors.request.use(
                        (config) =>{
                            console.log("Intercepting and adding token")
                            config.headers.Authorization = jwtToken
                            return config
                        }
                    )
                    return true
                }
                else{
                    logout()
                    return false
                }
            }catch(error){
                    logout()
                    return false
            }
    
    }
    function logout(){
       setAuthentication(false)
       setToken(null)
       setUsername(null)
    }
    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token }}>
            {children}
        </AuthContext.Provider>
    )
} 