import React, { createElement, createRef } from "react"
import { getView } from "../../foliate-js/reader-import"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { newTextToTranslateActionCreator, setBookViewActionCreator } from "../../reducers/readerReducer"
import { setOnTextChosenCallback } from "../../foliate-js/text-selector"


function BookViewMin() {
    const bookFile = useSelector(state => state.readerReducer.bookFile)
    const dispatch = useDispatch()

    useEffect(() => {
        async function loadBookView() {
            setOnTextChosenCallback((text) => {
                dispatch(newTextToTranslateActionCreator(text))
            })
            const view = await getView(bookFile)
            await view.goToTextStart()
            dispatch(setBookViewActionCreator(view))
        }

        if (bookFile)
            loadBookView()
    })

}

export default BookViewMin