import { authApi } from "../api/api"
import { push } from "react-router-redux";
import { useHistory } from "react-router-dom";

const CHANGE_FIELDS="CHANGE_FIELDS";
const SET_LOG_IN="SET_LOG_IN"
let initialState = {
    login:"",
    password:"",
    logedIn:false
}

const registrationReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case(CHANGE_FIELDS):
            newState.login = action.login===null ? newState.login : action.login
            newState.password = action.password===null ? newState.password : action.password
            return newState
        case (SET_LOG_IN):
            newState.logedIn=action.status
            return newState
        default:
            return newState
    }
}

export function changeFieldsActionCreator(login, password){
    return {type: CHANGE_FIELDS, login:login, password:password}
}
export function setLogedInActionCreator(status){
  return  {type:SET_LOG_IN, status:status}
}
export function registerThunkCretor(login, password){
    return (dispatch) =>{
        authApi.register(login, password).then(response=>{
            if(response.status===200){
                dispatch(setLogedInActionCreator(true))
            }
                else{
                 console.log(response)
            }
        })

    }
}
export default registrationReducer 