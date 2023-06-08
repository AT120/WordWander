import {Card} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteBookThunkCreator } from '../../reducers/book-list-reducer';

function BookItem(props){
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(deleteBookThunkCreator(props.id, props.page))
    }
    return(
        <Card>
            <Card.Header  className='d-flex justify-content-between'>
                 <span>{props.name}</span>
                 <button className="btn btn-sm btn-outline-danger" onClick={handleClick}>Удалить</button> 
            </Card.Header>
            <Card.Body>
                <em>{props.description}</em>
            </Card.Body>
        </Card>
    )
}

export default BookItem;