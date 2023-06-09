import React, { createElement, createRef } from "react"
// import "../../foliate-js/view"
import { getView } from "../../foliate-js/reader-import"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setBookViewActionCreator } from "../../reducers/readerReducer"


function BookViewMin() {
    const bookFile = useSelector(state => state.readerReducer.bookFile)
    const dispatch = useDispatch()


    useEffect(() => {
        async function loadBookView() {
            const view = await getView(bookFile)
            await view.goToTextStart()
            dispatch(setBookViewActionCreator(view))
        }

        if (bookFile)
            loadBookView()
    })

}

export default BookViewMin