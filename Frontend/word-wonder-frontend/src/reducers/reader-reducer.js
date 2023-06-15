import { getReaderCss } from "../components/reader/BookViewMin";
import { bookApi } from "../api/api";

const UPLOAD_BOOK_FILE = 100
const GET_BOOK_FILE = 101
const SET_BOOK_VIEW = 102
const SET_FONT_SIZE = 103

const initialState = {
    bookFile: 0,
    bookView: 0,
    fontSize: 12,
    overflow: false
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
        case SET_FONT_SIZE:
            newState.fontSize = action.fontSize
            if (newState.bookView)
                newState.bookView.renderer.setStyles?.(
                    getReaderCss(newState.fontSize)
                )
            return newState
        default:
            return state
    }
}

export function setNewFontSizeActionCreator(fontSize) {
    return {type: SET_FONT_SIZE, fontSize: fontSize}
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

export function loadBookThunkCreator(guid) {
    return async (dispatch) => {
        const book = await bookApi.loadBook(guid)
        if (book)
            dispatch(uploadBookFileActionCreator(book))
    }
}


export default readerReducer;
