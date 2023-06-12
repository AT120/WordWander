import { bookApi } from "../api/api";

const LOAD_BOOKS = "LOAD_BOOKS";
const ADD_BOOK = "ADD_BOOK";
const EDIT_BOOK = "EDIT_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_SORT_BY = "SET_SORT_BY";
const SET_NEW_BOOK_PARAMS = "SET_NEW_BOOK_PARAMS";
const CHANGE_MODAL_STATE = "CHANGE_MODAL_STATE";
const START_LOADING = "START_LOADING";
const SHOW_ERROR_MESSAGE="SHOW_ERROR_MESSAGE"
let initialState = {
    books : [],
    numberOfPages: 0,
    page : 1,
    searchTerm:"",
    searchName:"",
    sortBy: null,
    showModal:false,
    editBook:{
        name:"",
        description:""
    },
    addBook:{
        title:"",
        description:"",
        file:null,
        loading:false,
        error:false
    }
}
const bookListReducer = (state=initialState, action)=>{
    let newState = {...state};
    let newAddBookState = {...state.addBook}
    switch(action.type){
        case(LOAD_BOOKS):
            newState.page = action.page
            newState.books = action.books
            newState.numberOfPages = action.numberOfPages
            newState.searchName = action.searchName
            newState.sortBy = action.sortBy
            return newState
        case (SET_NEW_BOOK_PARAMS):
            newState.addBook.title = action.title===null ? newAddBookState.title : action.title
            newState.addBook.description = action.description===null ? newAddBookState.description : action.description
            newState.addBook.file = action.file===null ? newAddBookState.file : action.file
            return newState
        case(SET_SEARCH_TERM):
            newState.searchTerm = action.value
            return newState
        case(START_LOADING):
            newState.addBook.loading=true
            return newState
        case (CHANGE_MODAL_STATE):
            newState.showModal=!(newState.showModal)
            newState.addBook.error=false
            return newState
        case(DELETE_BOOK):
            newState.books = action.books
            newState.numberOfPages=action.numberOfPages
            if(newState.page>action.numberOfPages){
                newState.page=action.numberOfPages
            }
            return newState
        case(ADD_BOOK):
            newState.books = action.books
            newState.numberOfPages = action.numberOfPages
            newState.showModal=false
            newState.addBook.loading=false
            newState.addBook.description=""
            newState.addBook.title=""
            newState.addBook.file=null
            newState.numberOfPages=action.numberOfPages
            return newState
        case(EDIT_BOOK):
            newState.books = action.books
            return newState
        case(SHOW_ERROR_MESSAGE):
            newState.addBook.error=true;
            newState.addBook.loading=false;
            return newState;
        default:
            return newState
    }
}

export function loadBooksActionCreator(books, page, sortBy, searchName=""){
    return {type: LOAD_BOOKS, books : books.books, page : page, numberOfPages: books.numberOfPages, searchName:searchName, sortBy:sortBy}
}

export function loadBooksThunkCreator(page, name=null, sortBy=null){
    return (dispatch) =>{
        bookApi.getBooks(Math.max(page, 1), name, sortBy).then(data=>{
            dispatch(loadBooksActionCreator(data, page, sortBy, name))
        })
    }
}
export function changeModalStateActionCreator(){
    return {type: CHANGE_MODAL_STATE}
}
export function deleteBookActionCreator(data){
    return  {type: DELETE_BOOK, books : data.books, numberOfPages:data.numberOfPages}
}

export function setSortByActionCreator(sortBy){
    return {type: SET_SORT_BY, sortBy:sortBy}
}
export function setSearchTermActionCreator(value){
    return {type: SET_SEARCH_TERM, value:value}
}

export function setAddBookParamsActionCreator(title=null, description=null, file=null){
    return {type: SET_NEW_BOOK_PARAMS, title:title, description:description, file:file}
}

export function addBookActionCreator(data){
    return  {type: ADD_BOOK, books : data.books, numberOfPages:data.numberOfPages}
}
export function deleteBookThunkCreator(id, page, name=null, sortBy=null){
    
    return async (dispatch) =>{
        await bookApi.deleteBook(id);
        bookApi.getBooks(page, name, sortBy).then(data=>{
            dispatch(deleteBookActionCreator(data))
        })
    }
}

export function postBookThunkCreator(title, description, file, page){
    return async (dispatch) =>{
    var statusCode = await bookApi.postBook(title, description, file);
    if(statusCode===200){
    bookApi.getBooks(page).then(data=>{
        dispatch(addBookActionCreator(data))
    })
    }
    else{

        dispatch(errorToPostBookActionCreator())
    }
}
}

export function errorToPostBookActionCreator(){
    return {type:SHOW_ERROR_MESSAGE}
}
export function startLoadingActionCreator(){
    return {type: START_LOADING}
}
export default bookListReducer;