import { getReaderCss } from "../components/reader/BookLoader";
import { bookApi } from "../api/api";
import { setNewTranslateApiActionCreator, setSourceLanguageActionCreator, setTargetLanguageActionCreator } from "./translate-reducer";
import { loadBook } from "../foliate-js/reader-import";

const GET_BOOK_FILE = 101
const SET_BOOK = 102
const SET_FONT_SIZE = 103
const UPDATE_PROGRESS = 104
const SET_THEME = 105
const SET_BOOK_VIEW = 106

const initialState = {
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

export function loadBookThunkCreator(guid) {
    return async (dispatch) => {
        const params = await bookApi.loadReaderParameters(guid)
        const bookFile = await bookApi.loadBook(guid) //TODO: race condition

        if (params) {
            
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

export function updateThemeActionCreator(theme) {
    return { type: SET_THEME, theme: theme }
}


export default readerReducer;
