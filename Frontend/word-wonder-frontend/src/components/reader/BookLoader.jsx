import { getView, insertView } from "../../foliate-js/reader-import"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setOnTextChosenCallback } from "../../foliate-js/text-selector"
import { newTextToTranslateThunkCreator } from "../../reducers/translate-reducer";
import { cleanupActionCreator, loadBookThunkCreator, setBookActionCreator, setForeingActionCreator, updateProgressThunkCreator, updateThemeActionCreator } from "../../reducers/reader-reducer";
import BookView from "./BookView";
import { useNavigate } from "react-router-dom";




function BookLoader({ fileId, foreign }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        setOnTextChosenCallback((text, event) => {
            dispatch(newTextToTranslateThunkCreator(text, event))
        })

        dispatch(setForeingActionCreator(foreign))
        dispatch(loadBookThunkCreator(fileId))

        return () => { dispatch(cleanupActionCreator()) }
    }, [])


    return <BookView />
}

export default BookLoader