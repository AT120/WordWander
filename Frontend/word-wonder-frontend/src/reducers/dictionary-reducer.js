import { dictApi } from "../api/api";

const GET_DICTIONARY="GET_DICTIONARY";
const ADD_TRANSLATION="ADD_TRANSLATION";
const DELETE_TRANSLATION="DELETE_TRANSLATION";
const CHANGE_FAVORITE_STATUS="CHANGE_FAVORITE_STATUS"


let initialState={
    translations:[],

}

const dictionaryReducer = (state=initialState, action)=>{
    let newState={...state};
    switch(action.type){
        case GET_DICTIONARY:
            newState.translations=action.translations;
            return newState;
        case DELETE_TRANSLATION:
            newState.translations=action.translations;
            return newState;
        case CHANGE_FAVORITE_STATUS:
            newState.translations=action.translations;
            return newState;
        default:
            return newState;
    }
}

export function getDictionaryActionCreator(translations){
    return {type:GET_DICTIONARY, translations : translations}
}

export function deleteTranslationActionCreator(translations){
    return{type:DELETE_TRANSLATION,translations : translations}
}

export function changeFavouriteStatusActionCreator(translations){
    return{type:CHANGE_FAVORITE_STATUS,translations : translations}
}

export function getDictionaryThunkCreater(){
    return (dispatch)=>{
        dictApi.getDictionary().then(data=>{
            dispatch(getDictionaryActionCreator(data))
        })
    }
}

export function deleteTranslationThunkCreator(translationId){
    return async (dispatch)=>{
        await dictApi.deleteTranslation(translationId);
        dictApi.getDictionary().then(data=>{
            dispatch(deleteTranslationActionCreator(data))
        })
    }
}


export function changeFavouriteStatusThunkCreator(translationId){
    return async (dispatch)=>{
        await dictApi.changeFavouriteStatus(translationId);
        dictApi.getDictionary().then(data=>{
            dispatch(changeFavouriteStatusActionCreator(data))
        })
    }
}



/*
export function deleteTranslationActionCreator(translationId){

}*/

export default dictionaryReducer;