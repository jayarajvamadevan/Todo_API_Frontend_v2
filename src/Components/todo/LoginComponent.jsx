import {useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext';
function LoginComponent() 
{
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[showErrorMessage,setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }
    function handlePasswordChange(event){
        setPassword(event.target.value);
    }
    async function handleSubmit(){
        if( await authContext.login(username,password)) {
            console.log("Success")
            navigate(`/welcome/${username}`)
        }
        else{
            console.log("Failed")
            setErrorMessage(true)
        }
     }
    return(  
        <div className="Login">
        <h1>Time to Login!</h1>
            {showErrorMessage && <div className="errorMessage">Authentiction Failed ! Check Credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>  
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name="password" value={password} onChange={handlePasswordChange}/>  
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login </button>
                </div>

            </div>
        </div>
    )
}
export default LoginComponent