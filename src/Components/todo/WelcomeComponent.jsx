import {useParams, Link } from 'react-router-dom'
import { useState } from 'react'

//import { retrieveHelloWorldBean } from './api/HelloWorldApiService'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
function WelcomeComponent()
{ 
    const {username} =useParams()
    const [message,setMessage]=useState(null)
    

    function callHelloWorld(){
        console.log('called')
        // retrieveHelloWorldBean()
        //     .then((response) => successResponse(response))
        //     .catch((error) => errorResponse(error))
        //     .finally(() => console.log('cleanup')) 
        retrieveHelloWorldPathVariable(username)
            .then((response) => successResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'))
        }
    function successResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }
    function errorResponse(error){
        console.log(error)
    }
    return(
        <div className="Welcome"> 
        <h1>Welcome {username}</h1>
        <div>
            Manage your todos - <Link to = "/todos">Go Here</Link>
        </div>
        <div>
            <button className='btn btn-success m-5' onClick={callHelloWorld}>Call Hello World</button> 
        </div>
        <div className = "text-info">{message}</div>
        </div>
    )
}
export default WelcomeComponent 