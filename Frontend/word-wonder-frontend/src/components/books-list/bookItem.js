import {Card, ProgressBar} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteBookThunkCreator } from '../../reducers/book-list-reducer';

function BookItem(props){
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(deleteBookThunkCreator(props.id, props.page))
    }
    return(
        <Card className='card'>
            <Card.Header  className='d-flex justify-content-between'>
                 <span>{props.name}</span>
                 <button className="btn btn-sm btn-outline-danger" onClick={handleClick}>Удалить</button> 
            </Card.Header>
            <Card.Body>
                <em>{props.description}</em>
            </Card.Body>
            <div style={{padding: '0 10px 5px 10px'}}>
                <span style={{ fontSize:'12px'}} >{props.currentPage} / {props.pageNumber} страниц</span>
                <ProgressBar  variant='info' striped  now={props.currentPage} max={props.pageNumber} />
            </div>
        </Card>
    )
}

export default BookItem;