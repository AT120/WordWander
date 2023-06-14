import { useState } from "react";
import { useSelector } from "react-redux";

function countSpaces(text) {
    let spaces = 0
    for (const char of text)
        if (char == ' ')
            spaces += 1
    return spaces
}

function getTextSize(text) {
    if (countSpaces(text) <= 1)
        return 'x-large'

    if (text.length < 50)
        return 'large'

    if (text.length < 150)
        return 'medium'

    if (text.length < 200)
        return 'small'
}

let prevText = ''
export default function TranslateMobile({ translation }) {
    const [hidden, hide] = useState(true)
    const hidePopup = () => hide(true)
    const textToTranslate = translation.textToTranslate
    const translatedText = translation.translatedText

    if (prevText !== textToTranslate) {
        prevText = textToTranslate
        hide(false)
        return;
    }

    return (
        <div
            id="translate-popup-mobile"
            className={`d-flex flex-column ${(hidden) ? 'hidden' : ''}`}
            style={{ 'font-size': getTextSize(textToTranslate) }}
        >
            <div className="d-flex flex-column">

                    <div className="d-flex">
                        <div className="col-6 px-3">
                            {textToTranslate}
                        </div>
                        <div className="col-6 px-3">
                            {(translatedText) ? translatedText : '...'}
                            {/* TODO: анимация */}
                        </div>
                    </div>
                <div>
                    <div className="d-flex justify-content-center ">
                        <button onClick={hidePopup}>
                            <svg className="icon" viewBox="0 0 25 20" style={{ height: "4rem" }}>
                                <path d="M 3 15 L 12 12 L 21 15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}