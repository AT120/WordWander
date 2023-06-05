import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBooksActionCreator, loadBooksThunkCreator } from "../../reducers/book-list-reducer";
import BookItem from "./bookItem";
function Books(){
    const state = useSelector(state=>state.booksPage);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadBooksThunkCreator(state.page))
    },[dispatch]);
    return(
        <div>
            <h3>YourBooks</h3>
            <div className ='card-deck'>
                {
                    state.books.map((value)=>{
                        return <BookItem title={value.title} description={value.description} id={value.id} key={value.id} page={state.page}/>
                    })
                }
            </div>
        </div>
    );
}
export default Books;