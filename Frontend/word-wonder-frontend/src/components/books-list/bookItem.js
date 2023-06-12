import {Card, ProgressBar} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteBookThunkCreator } from '../../reducers/book-list-reducer';

function BookItem(props){
    const dispatch = useDispatch()
    const handleClickDelete = ()=>{
        dispatch(deleteBookThunkCreator(props.id, props.page, props.searchName, props.sortBy))
    }
    const handleClickRead = ()=>{
        console.log("not implemented")
    }
    return(
        <Card className='card' style={{minWidth:'230px'}}>
            <Card.Header  className='d-flex justify-content-between'>
                 <span>{props.name}</span>
                 <span>
                    <button style={{marginRight:'5px'}} className="btn btn-sm btn-outline-warning" onClick={handleClickRead}>Читать</button> 
                    <button className="btn btn-sm btn-outline-danger" onClick={handleClickDelete}>Удалить</button> 
                 </span>
            </Card.Header>
            <Card.Body>
                <em>{props.description}</em>
            </Card.Body>
            <div style={{padding: '0 10px 5px 10px'}}>
                <span style={{ fontSize:'12px'}} >{props.currentPage} / {props.pageNumber} страниц</span>
                <ProgressBar style={{height:'6px'}}  variant='info' striped  now={props.currentPage} max={props.pageNumber} />
            </div>
        </Card>
    )
}

export default BookItem;