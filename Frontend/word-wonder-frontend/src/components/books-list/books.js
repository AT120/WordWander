import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  loadBooksThunkCreator } from "../../reducers/book-list-reducer";
import BookItem from "./bookItem";
function Books(){
    const state = useSelector(state=>state.booksPage);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadBooksThunkCreator(state.page, state.searchTerm, state.sortBy))
    },[dispatch, state.page]);
    return(
        <div>
            <div className ='card-deck'>
                {
                    state.books.map((value)=>{
                        return  <BookItem name={value.name} description={value.description} id={value.id} key={value.id} page={state.page}/>
                    })
                }
            </div>            
     
        </div>
    );
}
export default Books;