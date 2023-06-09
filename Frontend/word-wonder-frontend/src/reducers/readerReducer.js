import { connect } from "react-redux";

const UPLOAD_BOOK_FILE = 0
const GET_BOOK_FILE = 1
const SET_BOOK_VIEW = 2

const initialState = {
    bookFile: 0,
    bookView: 0
}

const readerReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case UPLOAD_BOOK_FILE:
            newState.bookFile = action.file
            newState.bookView = 0 //TODO: а может надо по умному елемент удалять?
            console.log(action.file)
            return newState;
        case GET_BOOK_FILE:
            console.log(state.bookFile)
            return state
        case SET_BOOK_VIEW:
            newState.bookView = action.bookView
            return newState
        default:
            return state;
    }
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

export default readerReducer;
