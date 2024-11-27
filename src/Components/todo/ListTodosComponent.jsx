import { useEffect, useState } from "react"
import { retrieveAllTodosForUsernameApi,deleteTodosForUsername_idApi} from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"


function ListTodosComponent(){

    const authContext = useAuth ()
    const username=authContext.username

    const navigate =useNavigate()

    const today =new Date()
    const dueDate = new Date(today.getFullYear()+12,today.getMonth(),today.getDay())
   

    const[todos,setTodos] =useState([])
    const[message,setMessage] =useState(null)

    useEffect (() => refreshTodos(),[])

    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
            .then((response) => 
                {console.log(response)
                setTodos(response.data)})
            .catch(error => console.log(error))
    }
    function deleteTodo(id){
        console.log('clicked '+ id)
        deleteTodosForUsername_idApi(username,id)
        .then(
            () => { 
                setMessage(`Delete of Todo with id = ${id} successful`)
                refreshTodos()})
        .catch(error => console.log(error))
    }
     function updateTodo(id){
        console.log('clicked '+ id)
        navigate(`/todo/${id}`)
     }
     function addNewTodo(){
        navigate(`/todo/-1`)
     }
    return(
        <div className="container">
        <h1>Things to Do!</h1>
        {message && <div className="alert alert-warning">{message}</div>}
        <div>
                <table className='table'>
                    <thead> 
                        <tr>
                            <th>Id </th>
                            <th>Username</th>
                            <th>Descrition</th>
                            <th>DueDate</th>
                            <th>Done?</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map
                                (todo=>(
                                    <tr key={todo.id}>
                                        <td>{todo.id }</td>
                                        <td>{todo.username}</td>
                                        <td>{todo.description}</td>
                                        {/* <td>{todo.dueDate.toDateString()}</td>  */}
                                        <td>{todo.dueDate.toString()}</td>
                                        <td>{todo.completed.toString()}</td>
                                        <td><button className="btn btn-warning" 
                                            onClick={() =>deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" 
                                            onClick={() =>updateTodo(todo.id)}>Update</button></td>
                                    </tr>))
                        }
                    </tbody>
                </table> 
            </div>
                <div className="btn btn-success m-3" onClick={addNewTodo}>Add new Todo</div>
        </div>
    )
}
export  default ListTodosComponent