import { authApi } from "../Api/api"

const CHANGE_FIELDS="CHANGE_FIELDS"

let initialState = {
    login:"",
    password:""
}

const loginReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case(CHANGE_FIELDS):
            newState.login = action.login===null ? newState.login : action.login
            newState.password = action.password===null ? newState.password : action.password
            return newState
        default:
            return newState
    }
}

export function changeFieldsActionCreator(login, password){
    return {type: CHANGE_FIELDS, login:login, password:password}
}

export function loginThunkCretor(login, password){
    return (dispatch) =>{
       var result = authApi.login(login, password)
        
    }
}
export default loginReducer