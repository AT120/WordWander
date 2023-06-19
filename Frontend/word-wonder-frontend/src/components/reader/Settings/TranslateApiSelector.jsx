import Form from 'react-bootstrap/Form';
import { availableTranslators } from '../../../api/translate-api';
import { useDispatch, useSelector } from 'react-redux';
import { setNewTranslateApiActionCreator } from '../../../reducers/translate-reducer';


export default function TranslateApiSelector() {
    const dispatch = useDispatch()
    const translateApiType = useSelector(state => state.translateReducer.translateApiType)
    function changeTranslator(event) {
        dispatch(setNewTranslateApiActionCreator(
            parseInt(event.currentTarget.value)
        ))
    }

    return (
        <Form.Group>
            <Form.Label >Переводчик</Form.Label>
            <Form.Select onChange={changeTranslator} defaultValue={translateApiType}>
                <option 
                    value={availableTranslators.LibreTranslate}>
                    LibreTranslate
                </option>

                <option
                    value={availableTranslators.GoogleTranslate}>
                    GoogleTranslate
                </option>
            </Form.Select>
        </Form.Group>
    )
}