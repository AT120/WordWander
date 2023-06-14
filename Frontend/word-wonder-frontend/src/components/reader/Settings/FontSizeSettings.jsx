import { useDispatch, useSelector } from "react-redux"
import Form from 'react-bootstrap/Form';
import { setNewFontSizeActionCreator } from "../../../reducers/reader-reducer";

export default function FontSizeSettings() {
    const fontSize = useSelector(state => state.readerReducer.fontSize)
    const dispatch = useDispatch();

    function updateFontSize(event) {
        dispatch(setNewFontSizeActionCreator(
            parseInt(event.currentTarget.value)
        ))
    }

    return (
        <Form.Group  className="mt-4">
            <Form.Label>Шрифт</Form.Label>
            <Form.Control type="number" min='1' value={fontSize} onChange={updateFontSize}></Form.Control>
        </Form.Group>
    )
}