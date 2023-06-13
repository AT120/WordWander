import { connect } from "react-redux";
import translate, { availableTranslators, changeTranslator } from "../api/translate-api";

const UPLOAD_BOOK_FILE = 0
const GET_BOOK_FILE = 1
const SET_BOOK_VIEW = 2
const NEW_TEXT_TO_TRANSLATE = 3
const NEW_TRANSLATED_TEXT = 4
const SET_TRANSLATE_API = 5

const initialState = {
    bookFile: 0,
    bookView: 0,
    textToTranslate: '',
    translatedText: '',
    sourceLanguage: 'en', //TODO: убрать
    targetLanguage: 'ru',
    translateApiType: availableTranslators.LibreTranslate
}

const readerReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case UPLOAD_BOOK_FILE:
            newState.bookFile = action.file
            newState.bookView = 0 //TODO: а может надо по умному елемент удалять?
            return newState;
        case GET_BOOK_FILE:
            console.log(state.bookFile)
            return state
        case SET_BOOK_VIEW:
            newState.bookView = action.bookView
            return newState
        case NEW_TEXT_TO_TRANSLATE:
            newState.textToTranslate = action.text
            newState.translatedText = 0
            return newState
        case NEW_TRANSLATED_TEXT:
            newState.translatedText = action.text
            return newState
        case SET_TRANSLATE_API:
            newState.translateApiType = action.newApi
            changeTranslator(action.newApi)
            return newState
        default:
            return state;
    }
}

export function setNewTranslateApiActionCretor(api) {
    return {type: SET_TRANSLATE_API, newApi: api}
}

export function uploadBookFileActionCreator(file) {
    return {type: UPLOAD_BOOK_FILE, file: file};
}

export function getBookActionCreator(file) {
    return {type: GET_BOOK_FILE};
}

export function setBookViewActionCreator(bookView) {
    return {type: SET_BOOK_VIEW, bookView: bookView}
}

export function newTextToTranslateThunkCreator(text) {
    return async (dispatch, getState) => {
        if (text.length === 0)
            return

        dispatch({type: NEW_TEXT_TO_TRANSLATE, text: text})
        const state = getState().readerReducer
        const translatedText = await translate(text, state.sourceLanguage, state.targetLanguage);
        if (translatedText)
            dispatch({type: NEW_TRANSLATED_TEXT, text: translatedText})
        else
            console.log('ээээ') //TODO: обработка ошибок
    }

}



export default readerReducer;
