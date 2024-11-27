import './TodoApp.css'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './ListTodosComponent'
import LoginComponent from './LoginComponent'
import ErrorComponent from './ErrorComponent'
import AuthProvider from './security/AuthContext'
import { useAuth } from './security/AuthContext'
import TodoComponent from './TodoComponent'

function AuthenticatedRoute({children}){

    const authContext =useAuth()

    if(authContext.isAuthenticated){
        return children
    }
    
    return <Navigate to="/"/>
}

function TodoApp() {
    return(
        <div className="TodoApp"> 
            <AuthProvider>
                <BrowserRouter future={{v7_startTransition: true,v7_relativeSplatPath:true}}> 
                    <HeaderComponent/>
                    <div className='center'>
                    <Routes>
                        <Route path='/' element ={<LoginComponent/>}/>
                        <Route path='/login' element ={<LoginComponent/>}/>

                        <Route path='/welcome/:username' element = 
                        {<AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>}/>

                        <Route path='/todos' element = 
                        {<AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>}/>

                        <Route path='/todo/:id' element = 
                        {<AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>}/>

                        <Route path='/logout' element =
                        {<AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>}/>

                        <Route path='*' element = {<ErrorComponent/>}/>
                    </Routes></div>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
export default TodoApp;     