import { Card, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookThunkCreator, setBookTimeActionCreator } from '../../reducers/book-list-reducer';
import { useNavigate } from 'react-router-dom';

function BookItem(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const studentId = useSelector(state => state.booksPage.studentId);

    const handleClickDelete = () => {
        dispatch(deleteBookThunkCreator(props.id, props.page, props.searchName, props.sortBy))
    }
    const handleClickRead = () => {
        if (studentId) {
            navigate("/reader", { state: { id: props.id, foreign: true } })
        } else {
            dispatch(setBookTimeActionCreator(props.id))
            navigate("/reader", { state: { id: props.id, foreign: false } })
        }
    }


    return (
        <Card className='card' style={{ minWidth: '230px' }}>
            <Card.Header className='d-flex justify-content-between'>
                <span>{props.name}</span>
                <span>
                    {props.error && <p className="text-danger">{props.error}</p>}
                    <button style={{ marginRight: '5px' }} className="btn btn-sm btn-outline-warning" onClick={handleClickRead}>Читать</button>

                    {(!studentId) && <button className="btn btn-sm btn-outline-danger" onClick={handleClickDelete}>Удалить</button>}

                </span>
            </Card.Header>
            <Card.Body>
                <em>{props.description}</em>
            </Card.Body>
            <div style={{ padding: '0 10px 5px 10px' }}>
                <span style={{ fontSize: '12px' }} >{props.currentPercent} / 100 %</span>
                <ProgressBar style={{ height: '6px' }} variant='info' striped now={props.currentPercent} max={100} />
            </div>
        </Card>
    )
}

export default BookItem;