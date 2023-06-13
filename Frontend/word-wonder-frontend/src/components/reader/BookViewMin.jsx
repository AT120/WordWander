import React, { createElement, createRef } from "react"
import { getView } from "../../foliate-js/reader-import"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { newTextToTranslateThunkCreator, setBookViewActionCreator } from "../../reducers/reader-reducer"
import { setOnTextChosenCallback } from "../../foliate-js/text-selector"

const hyphenate = false;
const darkThemeCss = `
    @namespace epub "http://www.idpf.org/2007/ops";
    html {
        color-scheme: light dark;
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media (prefers-color-scheme: dark) {
        a:link {
            color: lightblue;
        }
    }
    p, li, blockquote, dd {
        line-height: 1.4;
        text-align: 'justify';
        -webkit-hyphens: ${hyphenate ? 'auto' : 'manual'};
        hyphens: ${hyphenate ? 'auto' : 'manual'};
        -webkit-hyphenate-limit-before: 3;
        -webkit-hyphenate-limit-after: 2;
        -webkit-hyphenate-limit-lines: 2;
        hanging-punctuation: allow-end last;
        widows: 2;
    }
    /* prevent the above from overriding the align attribute */
    [align="left"] { text-align: left; }
    [align="right"] { text-align: right; }
    [align="center"] { text-align: center; }
    [align="justify"] { text-align: justify; }

    pre {
        white-space: pre-wrap !important;
    }
    aside[epub|type~="endnote"],
    aside[epub|type~="footnote"],
    aside[epub|type~="note"],
    aside[epub|type~="rearnote"] {
        display: none;
    }
`
// const lightThemeCss


function BookViewMin() {
    const bookFile = useSelector(state => state.readerReducer.bookFile)
    const dispatch = useDispatch()

    useEffect(() => {
        async function loadBookView() {
            setOnTextChosenCallback((text) => {
                dispatch(newTextToTranslateThunkCreator(text))
            })
            const view = await getView(bookFile)
            await view.goToTextStart()
            view.renderer.setStyles(darkThemeCss)
            dispatch(setBookViewActionCreator(view))
        }

        if (bookFile)
            loadBookView()
    })

}

export default BookViewMin