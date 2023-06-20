import { authApi } from "../api/api"
import { push } from "react-router-redux";
import { useHistory } from "react-router-dom";

const CHANGE_FIELDS="CHANGE_FIELDS";
const SET_LOG_IN="SET_LOG_IN"
const SET_ERROR ="SET_ERROR"
const CHANGE_CHECKBOX="CHANGE_CHECKBOX";
let initialState = {
    login:"",
    password:"",
    checkbox:false,
    logedIn:false,
    error:null
}

const registrationReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case(CHANGE_FIELDS):
            newState.login = action.login===null ? newState.login : action.login
            newState.password = action.password===null ? newState.password : action.password
            newState.error = action.login===null ? newState.error : null
            return newState
        case (SET_LOG_IN):
            newState.logedIn=action.status
            return newState
        case(SET_ERROR):
            newState.error=action.error
            return newState
        case (CHANGE_CHECKBOX):
            newState.checkbox=!newState.checkbox
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
export function setErrorActionCreator(error){
    return {type:SET_ERROR, error:error}
}
export function changeCheckboxActionCreator(){
    return {type: CHANGE_CHECKBOX}
}
export function registerThunkCretor(login, password, role){
    return (dispatch) =>{
        authApi.register(login, password, role).then(response=>{
            if(response.status===200){
                dispatch(setLogedInActionCreator(true))
            }
                else{
                dispatch(setErrorActionCreator(response.detail))
            }
        })

    }
}
export default registrationReducer 