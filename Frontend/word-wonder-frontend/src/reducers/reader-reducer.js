import { connect } from "react-redux";
import translate, { availableTranslators, changeTranslator } from "../api/translate-api";
import { getReaderCss } from "../components/reader/BookViewMin";

const UPLOAD_BOOK_FILE = 0
const GET_BOOK_FILE = 1
const SET_BOOK_VIEW = 2
const NEW_TEXT_TO_TRANSLATE = 3
const NEW_TRANSLATED_TEXT = 4
const SET_TRANSLATE_API = 5
const SET_SOURCE_LANG = 6
const SET_TARGET_LANG = 7
const SET_FONT_SIZE = 8
const UPDATE_TRANSLATE_POSITION = 9

const initialState = {
    bookFile: 0,
    bookView: 0,
    translation: {
        textToTranslate: '',
        translatedText: '',
        position: {x: 0, y: 0}
    },
    sourceLanguage: 'en', //TODO: убрать
    targetLanguage: 'ru',
    translateApiType: availableTranslators.LibreTranslate,
    fontSize: 12,
    overflow: false
}

function clampPosition(position, maxXPercent, maxYPercent) {
    const maxX = (1 - maxXPercent) * window.innerWidth
    const maxY = (1 - maxYPercent) * window.innerHeight
    position.x = Math.min(position.x, maxX)
    position.y = Math.min(position.y, maxY)
    // const 
    // const 
    // position.x
}

const readerReducer = (state = initialState, action) => {
    let newState = {...state};
    newState.translation = {...state.translation}

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
            newState.translation.textToTranslate = action.text
            newState.translation.translatedText = 0
            newState.translation.position = {
                x: action.event.screenX - window.screenX,
                y: action.event.y
            }
            // clampPosition(newState.translation.clickPosition, 0.4, 0.3)
            return newState
        case NEW_TRANSLATED_TEXT:
            newState.translation.translatedText = action.text
            return newState
        case SET_TRANSLATE_API:
            newState.translateApiType = action.newApi
            changeTranslator(action.newApi)
            return newState
        case SET_SOURCE_LANG:
            newState.sourceLanguage = action.language
            return newState
        case SET_TARGET_LANG:    
            newState.targetLanguage = action.language
            return newState
        case SET_FONT_SIZE:
            newState.fontSize = action.fontSize
            if (newState.bookView)
                newState.bookView.renderer.setStyles?.(
                    getReaderCss(newState.fontSize)
                )
            return newState
        case UPDATE_TRANSLATE_POSITION:
            newState.translation.position = action.position
            return newState
        default:
            return state
    }
}

export function updateTranslatePositionActionCreator(position) {
    return {type: UPDATE_TRANSLATE_POSITION, position: position}
}

export function setNewFontSizeActionCreator(fontSize) {
    return {type: SET_FONT_SIZE, fontSize: fontSize}
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

export function setSourceLanguageActionCreator(lang) {
    return {type: SET_SOURCE_LANG, language: lang}
}

export function setTargetLanguageActionCreator(lang) {
    return {type: SET_TARGET_LANG, language: lang}
}

export function newTextToTranslateThunkCreator(text, event) {
    return async (dispatch, getState) => {
        if (text.length === 0)
            return

        console.log(event)
        dispatch({type: NEW_TEXT_TO_TRANSLATE, text: text, event: event})
        const state = getState().readerReducer
        const translatedText = await translate(text, state.sourceLanguage, state.targetLanguage);
        if (translatedText)
            dispatch({type: NEW_TRANSLATED_TEXT, text: translatedText})
        else
            console.log('ээээ') //TODO: обработка ошибок
    }

}



export default readerReducer;
