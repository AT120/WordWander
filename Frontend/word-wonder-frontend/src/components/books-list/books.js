import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  loadBooksThunkCreator, setLocationStateActionCreator } from "../../reducers/book-list-reducer";
import Cookies from 'js-cookie';
import BookItem from "./bookItem";
import { useLocation } from "react-router-dom";
function Books(){
    const location = useLocation()
    const state = useSelector(state=>state.booksPage);
    const dispatch = useDispatch();

    
    useEffect(()=>{
        console.log(state.page, state.searchTerm, state.sortBy)
        dispatch(loadBooksThunkCreator(state.page, state.searchTerm, state.sortBy))
    },[dispatch, state.page]);
    return(
        <div>
            <div className ='card-deck'>

                {                    
                    state.books!=null && state.books.map((value)=>{
                        return  <BookItem currentPercent={value.currentPercent}  name={value.name} description={value.description} id={value.id} key={value.id} page={state.page} sortBy={state.sortBy} searchName={state.searchName}/>
                    })
                }
            </div>            
     
        </div>
    );
}
export default Books;