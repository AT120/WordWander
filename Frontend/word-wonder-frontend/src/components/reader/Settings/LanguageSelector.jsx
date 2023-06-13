import { useDispatch, useSelector } from "react-redux"
import Form from 'react-bootstrap/Form';
import { setSourceLanguageActionCreator, setTargetLanguageActionCreator } from "../../../reducers/reader-reducer";
const languages = [
    ['en', 'English'], 
    ['ru', 'Russian'],
    ['ar', 'Arabic'],
    ['az', 'Azerbaijani'],
    ['ca', 'Catalan'],
    ['zh', 'Chinese'],
    ['cs', 'Czech'],
    ['da', 'Danish'],
    ['nl', 'Dutch'],
    ['eo', 'Esperanto'],
    ['fi', 'Finnish'],
    ['fr', 'French'],
    ['de', 'German'],
    ['el', 'Greek'],
    ['he', 'Hebrew'],
    ['hi', 'Hindi'],
    ['hu', 'Hungarian'],
    ['id', 'Indonesian'],
    ['ga', 'Irish'],
    ['it', 'Italian'],
    ['ja', 'Japanese'],
    ['ko', 'Korean'],
    ['fa', 'Persian'],
    ['pl', 'Polish'],
    ['pt', 'Portuguese'],
    ['sk', 'Slovak'],
    ['es', 'Spanish'],
    ['sv', 'Swedish'],
    ['th', 'Thai'],
    ['tr', 'Turkish'],
    ['uk', 'Ukranian']
]

export default function LanguageSelector() {
    const sourceLang = useSelector(store => store.readerReducer.sourceLanguage)
    const targetLang = useSelector(store => store.readerReducer.targetLanguage)
    const dispatch = useDispatch()

    function setTargetLanguage(event) {
        dispatch(setTargetLanguageActionCreator(event.currentTarget.value))
    }
    
    function setSourceLanguage(event) {
        dispatch(setSourceLanguageActionCreator(event.currentTarget.value))
    }

    return (
        <div>
            <Form.Group className="mt-4">
                <Form.Label>Язык текта</Form.Label>
                <Form.Select onChange={setSourceLanguage}>
                    {languages.map(lang => <option selected={sourceLang === lang[0]} value={lang[0]}>{lang[1]}</option>)}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mt-4">
                <Form.Label>Язык перевода</Form.Label>
                <Form.Select onChange={setTargetLanguage}>
                    {languages.map(lang => <option selected={targetLang === lang[0]} value={lang[0]}>{lang[1]}</option>)}
                </Form.Select>
            </Form.Group>
        </div>
    )
}