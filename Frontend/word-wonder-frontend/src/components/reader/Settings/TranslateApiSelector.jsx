import Form from 'react-bootstrap/Form';
import { availableTranslators } from '../../../api/translate-api';
import { useDispatch, useSelector } from 'react-redux';
import { setNewTranslateApiActionCretor } from '../../../reducers/reader-reducer';


export default function TranslateApiSelector() {
    const dispatch = useDispatch()
    const translateApiType = useSelector(store => store.readerReducer.translateApiType)
    function changeTranslator(event) {
        dispatch(setNewTranslateApiActionCretor(
            parseInt(event.currentTarget.value)
        ))
    }

    return (
        <Form.Select onChange={changeTranslator}>
            <option selected={translateApiType === availableTranslators.LibreTranslate}
                    value={availableTranslators.LibreTranslate}>
                        LibreTranslate
            </option>

            <option selected={translateApiType === availableTranslators.GoogleTranslate} 
                    value={availableTranslators.GoogleTranslate}>
                        GoogleTranslate
            </option>
        </Form.Select>
    )
}