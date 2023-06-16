import { getReaderCss } from "../components/reader/BookViewMin";
import { bookApi } from "../api/api";

const UPLOAD_BOOK_FILE = 100
const GET_BOOK_FILE = 101
const SET_BOOK_VIEW = 102
const SET_FONT_SIZE = 103
const UPDATE_PROGRESS = 104
const SET_THEME = 105

const initialState = {
    bookId: null,
    bookFile: 0,
    bookView: 0,
    fontSize: 12,
    theme: 'light dark',
    overflow: false,
    progress: {
        fraction: 0.0,
        loc: null,
        page: null,
        toc: null
    },
}

function updateDocumentTheme(theme) {
    //ыыыыы
    document.documentElement.style.colorScheme = theme
    if (theme != "light dark") {
        document.documentElement.className = theme
    } else {
        document.documentElement.className = ''
    }
}

const readerReducer = (state = initialState, action) => {
    let newState = {...state};
    newState.progress = {...state.progress}

    switch (action.type) {
        case UPLOAD_BOOK_FILE:
            newState.bookFile = action.file
            newState.bookId = action.guid
            newState.bookView = 0 //TODO: а может надо по умному елемент удалять?
            return newState;
        case GET_BOOK_FILE:
            console.log(state.bookFile)
            return state
        case SET_BOOK_VIEW:
            newState.bookView = action.bookView
            return newState
        case SET_FONT_SIZE:
            newState.fontSize = action.fontSize
            newState.bookView?.renderer.setStyles( 
                getReaderCss(newState.fontSize, newState.theme)
            )
            return newState
        case UPDATE_PROGRESS:
            newState.progress.fraction = action.details.fraction
            newState.progress.loc = action.details.location
            newState.progress.page = action.details.pageItem
            newState.progress.toc = action.details.tocItem
            return newState
        case SET_THEME:
            newState.theme = action.theme
            console.log(action.theme)
            newState.bookView?.renderer.setStyles(
                getReaderCss(newState.fontSize, newState.theme)
            )
            updateDocumentTheme(action.theme)
            return newState
        default:
            return state
    }
}

export function setNewFontSizeActionCreator(fontSize) {
    return {type: SET_FONT_SIZE, fontSize: fontSize}
}

export function uploadBookFileActionCreator(file, guid) {
    return {type: UPLOAD_BOOK_FILE, file: file, guid: guid};
}

export function getBookActionCreator(file) {
    return {type: GET_BOOK_FILE};
}

export function setBookViewActionCreator(bookView) {
    return {type: SET_BOOK_VIEW, bookView: bookView}
}

export function loadBookThunkCreator(guid) {
    return async (dispatch) => {
        const book = await bookApi.loadBook(guid)
        if (book)
            dispatch(uploadBookFileActionCreator(book, guid))
    }
}

function updateProgressActionCreator(details) {
    return {type: UPDATE_PROGRESS, details: details}
}

export function updateProgressThunkCreator(details) {
    return async (dispatch, getState) => {
        const state = getState()
        const fraction = state.readerReducer.progress.fraction
        const bookId = state.readerReducer.bookId
        if (fraction && bookId && fraction !== details.fraction )
            bookApi.sendProgress(bookId, details.fraction)

        dispatch(updateProgressActionCreator(details))
    }
}

export function updateThemeActionCreator(theme) {
    return {type: SET_THEME, theme: theme}
} 

export default readerReducer;
