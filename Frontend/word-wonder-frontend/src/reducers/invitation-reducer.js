import { act } from "react-dom/test-utils";
import { bookApi, invitationsApi } from "../api/api";

const LOAD_INVITATIONS = "LOAD_INVITATIONS";
let initialState = {
    invitations:[]
}
const invitationsReducer = (state=initialState, action)=>{
    let newState = {...state};
    switch(action.type){
        case (LOAD_INVITATIONS):
            newState.invitations=action.invitations
            return newState
        default:
            return newState
    }
}

export function loadInvitationsActionCreator(invitations){
    return {type:LOAD_INVITATIONS, invitations:invitations}
}

export function loadInvitationsThunkCreator(){
  return (dispatch)  => {invitationsApi.getInvitations().then(result=>dispatch(loadInvitationsActionCreator(result.data)))
  }
}


export function acceptInviteThunkCreator(id, accept){
    return async (dispatch)  => {
       await invitationsApi.acceptInvite(id,accept).then(result=>dispatch(loadInvitationsActionCreator(result.data)));
       invitationsApi.getInvitations().then(result=>dispatch(loadInvitationsActionCreator(result.data)))
    }
}
export default invitationsReducer