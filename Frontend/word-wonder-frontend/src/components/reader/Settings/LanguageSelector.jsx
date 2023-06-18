import { useDispatch, useSelector } from "react-redux"
import Form from 'react-bootstrap/Form';
import { setSourceLanguageActionCreator, setTargetLanguageActionCreator } from "../../../reducers/translate-reducer";
import { languages } from "../../../const/languages";



export default function LanguageSelector() {
    const sourceLang = useSelector(state => state.translateReducer.sourceLanguage)
    const targetLang = useSelector(state => state.translateReducer.targetLanguage)
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
                <Form.Select onChange={setSourceLanguage} defaultValue={sourceLang}>
                    {languages.map(lang =>
                        <option
                            key={lang[0]}
                            value={lang[0]}>{lang[1]}
                        </option>
                    )}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mt-4">
                <Form.Label>Язык перевода</Form.Label>
                <Form.Select onChange={setTargetLanguage} defaultValue={targetLang}>
                    {languages.map(lang =>
                        <option
                            key={lang[0]}
                            value={lang[0]}>{lang[1]}
                        </option>
                    )}
                </Form.Select>
            </Form.Group>
        </div>
    )
}