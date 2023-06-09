import { bookApi } from "../api/api";

const LOAD_BOOKS = "LOAD_BOOKS";
const ADD_BOOK = "ADD_BOOK";
const EDIT_BOOK = "EDIT_BOOK";
const DELETE_BOOK = "DELETE_BOOK";

let initialState = {
    books : [],
    page : 1,
    editBook:{
        title:"",
        description:""
    }
}
const bookListReducer = (state=initialState, action)=>{
    let newState = {...state};
    switch(action.type){
        case(LOAD_BOOKS):
            newState.page = action.page
            newState.books = action.books
            console.log(action.books)
            return newState
        case(DELETE_BOOK):
            newState.books = action.books
            console.log(action.books)
            return newState
        case(ADD_BOOK):
            newState.books = action.books
            return newState
        case(EDIT_BOOK):
            newState.books = action.books
            return newState
        default:
            return newState
    }
}

export function loadBooksActionCreator(books, page){
    return {type: LOAD_BOOKS, books : books, page : page}
}

export function loadBooksThunkCreator(page){
    return (dispatch) =>{
        bookApi.getBooks(page).then(data=>{
            dispatch(loadBooksActionCreator(data, page))
        })
    }
}

export function deleteBookActionCreator(books){
    return  {type: DELETE_BOOK, books : books}
}

export function deleteBookThunkCreator(id, page){
    
    return async (dispatch) =>{
        await bookApi.deleteBook(id);
        bookApi.getBooks(page).then(data=>{
            dispatch(deleteBookActionCreator(data))
        })
    }
}

export default bookListReducer;