import { bookApi } from "../Api/api";

const LOAD_BOOKS = "LOAD_BOOKS";
const ADD_BOOK = "ADD_BOOK";
const EDIT_BOOK = "EDIT_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_SORT_BY = "SET_SORT_BY"
let initialState = {
    books : [],
    numberOfPages: 0,
    page : 1,
    searchTerm:"",
    searchName:"",
    sortBy: null,
    editBook:{
        name:"",
        description:""
    }
}
const bookListReducer = (state=initialState, action)=>{
    let newState = {...state};
    switch(action.type){
        case(LOAD_BOOKS):
            newState.page = action.page
            newState.books = action.books
            newState.numberOfPages = action.numberOfPages
            newState.searchName = action.searchName
            newState.sortBy = action.sortBy
            console.log(action)
            return newState
        case(SET_SEARCH_TERM):
            newState.searchTerm = action.value
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

export function loadBooksActionCreator(books, page, sortBy, searchName="",){
    return {type: LOAD_BOOKS, books : books.books, page : page, numberOfPages: books.numberOfPages, searchName:searchName, sortBy:sortBy}
}

export function loadBooksThunkCreator(page, name=null, sortBy=null){
    return (dispatch) =>{
        bookApi.getBooks(page, name, sortBy).then(data=>{
            dispatch(loadBooksActionCreator(data, page, sortBy, name))
        })
    }
}

export function deleteBookActionCreator(books){
    return  {type: DELETE_BOOK, books : books}
}

export function setSortByActionCreator(sortBy){
    return {type: SET_SORT_BY, sortBy:sortBy}
}
export function setSearchTermActionCreator(value){
    return {type: SET_SEARCH_TERM, value:value}
}
export function deleteBookThunkCreator(id, page){
    
    return async (dispatch) =>{
        await bookApi.deleteBook(id);
        bookApi.getBooks(page).then(data=>{
            dispatch(deleteBookActionCreator(data.books))
        })
    }
}

export default bookListReducer;