import { getReaderCss } from "../components/reader/BookLoader";
import { bookApi, dictApi } from "../api/api";
import { setNewTranslateApiActionCreator, setSourceLanguageActionCreator, setTargetLanguageActionCreator } from "./translate-reducer";
import { loadBook } from "../foliate-js/reader-import";

const CLEAN_UP = 100
const GET_BOOK_FILE = 101
const SET_BOOK = 102
const SET_FONT_SIZE = 103
const UPDATE_PROGRESS = 104
const SET_THEME = 105
const SET_BOOK_VIEW = 106
const LOAD_DICTIONARY = 107
const ADD_TO_DICTIONARY = 108
const REMOVE_FROM_DICTIONARY = 109

const initialState = {
    dictionary: new Map(),
    bookId: null,
    bookView: 0,
    book: 0,
    fontSize: 12,
    theme: 'light dark',
    overflow: false,
    progress: {
        fraction: 0.0,
        loc: null,
        page: null,
        toc: null,
        shouldBeUpdated: false
    },
}


const readerReducer = (state = initialState, action) => {
    let newState = { ...state };
    newState.progress = { ...state.progress }

    switch (action.type) {
        case CLEAN_UP:
            newState.bookId = 0
            newState.bookView = 0
            newState.book = 0
            return newState
        case GET_BOOK_FILE:
            console.log(state.bookFile)
            return state
        case SET_BOOK_VIEW:
            newState.bookView = action.bookView
            return newState
        case SET_BOOK:
            newState.book = action.book
            newState.bookId = action.guid
            return newState
        case SET_FONT_SIZE:
            newState.fontSize = action.fontSize
            return newState
        case UPDATE_PROGRESS:
            newState.progress.fraction = action.details.fraction
            newState.progress.loc = action.details.location
            newState.progress.page = action.details.pageItem
            newState.progress.toc = action.details.tocItem
            newState.progress.shouldBeUpdated = action.details.shouldBeUpdated
            return newState
        case SET_THEME:
            newState.theme = action.theme
            return newState
        case LOAD_DICTIONARY:
            newState.dictionary = new Map(action.dictionary);
            return newState
        case ADD_TO_DICTIONARY:
            newState.dictionary = new Map(newState.dictionary);
            newState.dictionary.set(action.word.toLowerCase(), [action.translation, action.id])
            return newState;
        case REMOVE_FROM_DICTIONARY:
            newState.dictionary = new Map(newState.dictionary);
            newState.dictionary.delete(action.word.toLowerCase())
            return newState
        //TODO:
        default:
            return state
    }
}

export function setNewFontSizeActionCreator(fontSize) {
    return { type: SET_FONT_SIZE, fontSize: fontSize }
}

export function getBookActionCreator(file) {
    return { type: GET_BOOK_FILE };
}

export function setBookActionCreator(book, guid) {
    return { type: SET_BOOK, book: book, guid: guid }
}

export function setBookViewActionCreator(bookView) {
    return { type: SET_BOOK_VIEW, bookView: bookView }
}

export function cleanupActionCreator() {
    return { type: CLEAN_UP }
}

export function addToDictionaryActionCreator(id, word, translation) {
    return {
        type: ADD_TO_DICTIONARY,
        word: word,
        translation: translation,
        id: id
    }
}

export function deleteFromDictionaryActionCreator(word) {
    return { type: REMOVE_FROM_DICTIONARY, word: word }
}

function loadDictionaryActionCreator(dictionary) {
    return { type: LOAD_DICTIONARY, dictionary: dictionary }
}

function loadReaderParametersThunkCreator(guid) {
    return async (dispatch) => {
        const params = await bookApi.loadReaderParameters(guid)
        if (!params)
            return

        if (params.targetLanguage)
            dispatch(setTargetLanguageActionCreator(params.targetLanguage))
        if (params.sourceLanguage)
            dispatch(setSourceLanguageActionCreator(params.sourceLanguage))

        dispatch(setNewFontSizeActionCreator(params.fontSize))
        dispatch(setNewTranslateApiActionCreator(params.translationApi))
        dispatch(updateProgressActionCreator({ fraction: params.readingProgress / 100, shouldBeUpdated: true }))
        switch (params.colorTheme) {
            case 0:
                dispatch(updateThemeActionCreator('light dark'))
                break;
            case 1:
                dispatch(updateThemeActionCreator('dark'))
                break;
            case 2:
                dispatch(updateThemeActionCreator('light'))
                break;
        }
    }
}

function loadBookDictionaryThunkCreator(guid) {
    return async (dispatch) => {
        const result = await dictApi.loadBookDictionary(guid)
        if (!result) {
            //TODO: show error
        }
        else
            dispatch(loadDictionaryActionCreator(
                result.dictionary.map((val) => [
                    val['originalString'].toLowerCase(),
                    [val['translatedString'], val['id']]
                ])
            ))
    }
}

export function loadBookThunkCreator(guid) {
    return async (dispatch) => {
        dispatch(loadReaderParametersThunkCreator(guid))
        dispatch(loadBookDictionaryThunkCreator(guid))
        const bookFile = await bookApi.loadBook(guid)

        if (bookFile) {
            const book = await loadBook(bookFile)
            dispatch(setBookActionCreator(book, guid))
        }

    }
}

export function updateProgressActionCreator(details) {
    return { type: UPDATE_PROGRESS, details: details }
}

export function sendReaderParametersThunkCreator() {
    return async (dispatch, getState) => {
        const state = getState()
        const bookId = state.readerReducer.bookId

        const theme = state.readerReducer.theme
        let themeToApi = 0;
        if (theme === 'dark')
            themeToApi = 1
        else if (theme === 'light')
            themeToApi = 2

        const params = {
            sourceLanguage: state.translateReducer.sourceLanguage,
            targetLanguage: state.translateReducer.targetLanguage,
            translationApi: state.translateReducer.translateApiType,
            colorTheme: themeToApi,
            fontSize: state.readerReducer.fontSize
        }

        await bookApi.sendReaderParameters(bookId, params)
    }
}

export function updateProgressThunkCreator(details) {
    return async (dispatch, getState) => {
        const state = getState()
        const fraction = state.readerReducer.progress.fraction
        const bookId = state.readerReducer.bookId
        if (fraction && bookId && details.fraction && fraction !== details.fraction)
            bookApi.sendProgress(bookId, details.fraction)

        dispatch(updateProgressActionCreator(details))
    }
}

export function addWordToDictThunkCreator(word, translation) {
    return async (dispatch, getState) => {
        const state = getState()
        const result = await dictApi.saveTranslation({
            bookId: state.readerReducer.bookId,
            defaultLanguage: state.translateReducer.sourceLanguage,
            translatedLanguage: state.translateReducer.targetLanguage,
            defaultSequence: word,
            translatedSequence: translation
        })
        if (!result) {
            //TODO: show error
        } else {
            dispatch(addToDictionaryActionCreator(result, word, translation))
        }
    }
}

export function deleteWordFromDictThunkCreator(id, word) {
    return async (dispatch, getState) => {
        const result = await dictApi.deleteTranslation(id)
        if (!result) {
            //TODO: show error
        } else {
            dispatch(deleteFromDictionaryActionCreator(word))
        }
    }
}

export function updateThemeActionCreator(theme) {
    return { type: SET_THEME, theme: theme }
}


export default readerReducer;
