import { Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { loadBooksThunkCreator } from "../../reducers/book-list-reducer";
function PaginationBar(){
    const state = useSelector(state=>state.booksPage);
    const dispatch = useDispatch();
    const handleClick = (page)=>{
        console.log(page)
        dispatch(loadBooksThunkCreator(page, state.searchTerm, state.sortBy))
    }
    return(
        <Pagination>
            <Pagination.First  onClick={()=>handleClick(1)} />
            <Pagination.Prev  onClick={()=>handleClick(state.page-1)} />
         
            {
                state.page > 2 && (
                    <Pagination.Ellipsis />  )
            }

            {   
            state.page > 1 && (

                    <Pagination.Item onClick={() => handleClick(state.page - 1)}>
                    {state.page - 1}
                    </Pagination.Item>)
            }  

            <Pagination.Item active>{state.page}</Pagination.Item>
            {
                state.page < state.numberOfPages &&(
                        <Pagination.Item onClick={()=>handleClick(state.page+1)}>{state.page+1}</Pagination.Item>)
            }

            {
                state.page+1 < state.numberOfPages &&(

                        <Pagination.Ellipsis />)
            }

            <Pagination.Next onClick={()=>handleClick(state.page+1)} />
             <Pagination.Last onClick={() => handleClick(state.numberOfPages)} />
        </Pagination>
    )
}
export default PaginationBar