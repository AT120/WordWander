import { useDispatch } from 'react-redux';
import { getBookActionCreator } from '../../reducers/readerReducer';

export default function FileGetter() {
    const dispatch = useDispatch()
    const clickHangeler = () => {
        dispatch(getBookActionCreator())
    }
    return (
        <button onClick={clickHangeler}>ПОЛУЧИТЬ</button>
    )
}