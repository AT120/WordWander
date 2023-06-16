import { getView } from "../../foliate-js/reader-import"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setOnTextChosenCallback } from "../../foliate-js/text-selector"
import { newTextToTranslateThunkCreator } from "../../reducers/translate-reducer";
import { loadBookThunkCreator, setBookViewActionCreator, updateProgressThunkCreator, updateThemeActionCreator } from "../../reducers/reader-reducer";

const hyphenate = false;
export function getReaderCss(fontSize, colorScheme = "light dark") {
    return  `
        @namespace epub "http://www.idpf.org/2007/ops";
        html {
            color-scheme: ${colorScheme};
        }
        /* https://github.com/whatwg/html/issues/5426 */
        @media (prefers-color-scheme: dark) {
            a:link {
                color: lightblue;
            }
        }
        p, li, blockquote, dd {
            line-height: 1.4;
            font-size: ${fontSize}pt;
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
}



function BookViewMin({fileId}) {
    const bookFile = useSelector(state => state.readerReducer.bookFile)
    // do not recreate view on font change
    const fontSize = useSelector(state => state.readerReducer.fontSize, eq => true)
    const dispatch = useDispatch()
    
    function relocateHandler(event) {
        dispatch(updateProgressThunkCreator(event.detail))
    }

    if (!bookFile)
        dispatch(loadBookThunkCreator(fileId))

    useEffect(() => {
        async function loadBookView() {
            setOnTextChosenCallback((text, event) => {
                dispatch(newTextToTranslateThunkCreator(text, event))
            })
            
            const view = await getView(bookFile)
            view.addEventListener('relocate', relocateHandler)
            await view.goToTextStart()
            view.renderer.setStyles(getReaderCss(fontSize))
            dispatch(setBookViewActionCreator(view))
            dispatch(updateThemeActionCreator('light dark'))
        }

        if (bookFile)
            loadBookView()
    })

}

export default BookViewMin