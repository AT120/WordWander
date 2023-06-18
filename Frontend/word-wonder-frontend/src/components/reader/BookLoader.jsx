import { getView, insertView } from "../../foliate-js/reader-import"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setOnTextChosenCallback } from "../../foliate-js/text-selector"
import { newTextToTranslateThunkCreator } from "../../reducers/translate-reducer";
import { loadBookThunkCreator, setBookActionCreator, updateProgressThunkCreator, updateThemeActionCreator } from "../../reducers/reader-reducer";
import BookView from "./BookView";
import { useNavigate } from "react-router-dom";




function BookLoader({ fileId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

        
    useEffect(() => {
        setOnTextChosenCallback((text, event) => {
            dispatch(newTextToTranslateThunkCreator(text, event))
        })

        dispatch(loadBookThunkCreator(fileId))

        return () => {
            // navigate(0)
            console.log('BookLoader')
        } 
    }, [])


    return <BookView />
}

export default BookLoader