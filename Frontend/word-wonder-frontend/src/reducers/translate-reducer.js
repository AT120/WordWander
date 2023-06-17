import translate, { availableTranslators, changeTranslator } from "../api/translate-api";
import { bookApi } from "../api/api";


const NEW_TEXT_TO_TRANSLATE = 0
const NEW_TRANSLATED_TEXT = 1
const SET_TRANSLATE_API = 2
const SET_SOURCE_LANG = 3
const SET_TARGET_LANG = 4
const UPDATE_TRANSLATE_POSITION = 5

const initialState = {
    translation: {
        textToTranslate: '',
        translatedText: '',
        position: { x: 0, y: 0 }
    },
    sourceLanguage: 'en', //TODO: убрать
    targetLanguage: 'ru',
    translateApiType: availableTranslators.LibreTranslate,
}


const translateReducer = (state = initialState, action) => {
    let newState = { ...state };
    newState.translation = { ...state.translation }

    switch (action.type) {
        case NEW_TEXT_TO_TRANSLATE:
            newState.translation.textToTranslate = action.text
            newState.translation.translatedText = 0
            newState.translation.position = {
                x: action.event.screenX - window.screenX,
                y: action.event.y
            }
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
        case UPDATE_TRANSLATE_POSITION:
            newState.translation.position = action.position
            return newState
        default:
            return state
    }
}

export function updateTranslatePositionActionCreator(position) {
    return { type: UPDATE_TRANSLATE_POSITION, position: position }
}

export function setNewTranslateApiActionCreator(api) {
    return { type: SET_TRANSLATE_API, newApi: api }
}

export function setSourceLanguageActionCreator(lang) {
    return { type: SET_SOURCE_LANG, language: lang }
}

export function setTargetLanguageActionCreator(lang) {
    return { type: SET_TARGET_LANG, language: lang }
}

export function setSourceLanguageThunkCreator(lang) {
    return (dispatch, getState) => {
        const bookId = getState().readerReducer.bookId
        if (bookId)
            bookApi.setBookLanguage(bookId, lang, null)
        dispatch(setSourceLanguageActionCreator(lang))
    }
}

export function setTargetLanguageThunkCreator(lang) {
    return (dispatch, getState) => {
        const bookId = getState().readerReducer.bookId
        if (bookId)
            bookApi.setBookLanguage(bookId, null, lang)
        dispatch(setTargetLanguageActionCreator(lang))
    }
}

export function newTextToTranslateThunkCreator(text, event) {
    return async (dispatch, getState) => {
        if (text.length === 0)
            return

        dispatch({ type: NEW_TEXT_TO_TRANSLATE, text: text, event: event })
        const state = getState().translateReducer
        const translatedText = await translate(text, state.sourceLanguage, state.targetLanguage);
        if (translatedText)
            dispatch({ type: NEW_TRANSLATED_TEXT, text: translatedText })
        else
            console.log('ээээ') //TODO: обработка ошибок
    }
}


export default translateReducer;
