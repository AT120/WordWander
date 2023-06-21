import { authApi } from "../api/api"
import { push } from "react-router-redux";
import { useHistory } from "react-router-dom";

const CHANGE_FIELDS="CHANGE_FIELDS";
const SET_LOG_IN="SET_LOG_IN"
const SET_STATE="SET_STATE"
const SET_ERROR ="SET_ERROR"
let initialState = {
    login:"",
    password:"",
    logedIn:false,
    error:null
}

const loginReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case(CHANGE_FIELDS):
            newState.login = action.login===null ? newState.login : action.login
            newState.password = action.password===null ? newState.password : action.password
            newState.error=null
            return newState
        case (SET_LOG_IN):
            newState.logedIn=action.status
            return newState
        case (SET_STATE):
            newState=action.state
            return newState
        case(SET_ERROR):
            newState.error=action.error
            return newState
        default:
            return newState
    }
}
export function stateFromLocationActionCreator(state){
    return {type: SET_STATE, state:state}
}
export function changeFieldsActionCreator(login, password){
    return {type: CHANGE_FIELDS, login:login, password:password}
}
export function setErrorActionCreator(error){
    return {type:SET_ERROR, error:error}
}
export function setLogedInActionCreator(status){
  return  {type:SET_LOG_IN, status:status}
}
export function loginThunkCretor(login, password){
    return async (dispatch) =>{
       await authApi.login(login, password).then(response=>{
            if(response.status===200){
                dispatch(setLogedInActionCreator(true))
            }
                else{
                 dispatch(setErrorActionCreator(response.detail))
            }
        })

    }
}
export default loginReducer