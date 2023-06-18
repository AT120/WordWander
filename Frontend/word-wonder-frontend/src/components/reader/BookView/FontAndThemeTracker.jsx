import { useEffect } from "react";
import { useSelector } from "react-redux";


const hyphenate = false;
export function getReaderCss(fontSize, colorScheme = "light dark") {
    return `
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

//ыыыыы
function updateDocumentTheme(theme) {
    document.documentElement.style.colorScheme = theme
    if (theme !== "light dark") {
        document.documentElement.className = theme
    } else {
        document.documentElement.className = 'auto'
    }
}
function resetDocumentTheme() {
    document.documentElement.className = ''
}

export default function FontAndThemeTracker() {
    const theme = useSelector(state => state.readerReducer.theme)
    const fontSize = useSelector(state => state.readerReducer.fontSize)
    const bookView = useSelector(state => state.readerReducer.bookView)

    useEffect(() => {
        return () => {
            console.log('reseted theme')
            resetDocumentTheme()
        }
    }, [])

    updateDocumentTheme(theme)
    if (bookView.current?.renderer)
        bookView.current.renderer.setStyles(getReaderCss(fontSize, theme))
}