import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  loadBooksThunkCreator, setLocationStateActionCreator } from "../../reducers/book-list-reducer";
import BookItem from "./bookItem";
import { useLocation } from "react-router-dom";
function Books(){
    const location = useLocation()
    const state = useSelector(state=>state.booksPage);
    const dispatch = useDispatch();

    
    useEffect(()=>{
        dispatch(loadBooksThunkCreator(state.page, state.searchTerm, state.sortBy))
    },[dispatch, state.page]);
    return(
        <div>
            <div className ='card-deck'>

                {                    
                    state.books!=null && state.books.map((value)=>{
                        return  <BookItem currentPercent={value.currentPercent} error={state.deleteErrorIn!=value.id? null : state.deleteError}  name={value.name} description={value.description} id={value.id} key={value.id} page={state.page} sortBy={state.sortBy} searchName={state.searchName}/>
                    })
                }
            </div>            
     
        </div>
    );
}
export default Books;