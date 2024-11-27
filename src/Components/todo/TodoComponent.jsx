 import { useNavigate, useParams } from "react-router-dom"
import { creatTodosApi, retrieveTodosApi,updateTodosForUsername_idApi,retrieveAllTodosForUsernameApi } from "./api/TodoApiService"
import { useEffect, useState } from "react"
import { useAuth } from "./security/AuthContext"
import { Formik,Form,Field, ErrorMessage } from "formik"
import moment from "moment"
 function TodoComponent()
 {
    const {id} = useParams()

    const[description,setDescription]=useState('')
    const[dueDate,setDueDate]=useState('')


    const authContext = useAuth()
    const navigate =useNavigate()

    const username=authContext.username

    useEffect(
        ()=>retrieveTodos(),[id]
    ) 
    
    function retrieveTodos(){
        if(id != -1){
            retrieveTodosApi(username,id)
            .then(response => {
                setDescription(response.data.description)
                setDueDate(response.data.dueDate)
            })
            .catch(error => console.log(error))
        }
    }
    function onSubmit(values){
        console.log(values)
        const todo ={
            id:id,
            username: username,
            description: values.description, 
            dueDate: values.dueDate,
            completed: false
        }
        console.log(todo)

        if(id === -1){
            creatTodosApi(username,todo)
            .then(response => {
            navigate('/todos')
            })
            .catch(error => console.log(error))
        }else{
            updateTodosForUsername_idApi(username,id,todo)
            .then(response => {
            console.log(response)
            navigate('/todos')
            })
        .catch(error => console.log(error))
        }
    }
    
    function validate(values){
        let errors = {
            // description:'Enter a Valid description',
            // dueDate:'Enter a valied dueDate'
        }
        let today = moment().startOf('day');
        if(values.description.length<5){
             errors.description ="Enter at least 5 charecters"
        }
        if(values.dueDate == null || values.dueDate === '' || !moment(values.dueDate).isValid() || !moment(values.dueDate).isAfter(today)) {
            errors.dueDate = 'Enter a due date'
        }
         console.log(values)
        return errors
    }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description,dueDate}} 
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                /> 
                                <ErrorMessage
                                    name="dueDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type ="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Due Date</label>
                                    <Field type ="date" className="form-control" name="dueDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
 }
 export default TodoComponent  