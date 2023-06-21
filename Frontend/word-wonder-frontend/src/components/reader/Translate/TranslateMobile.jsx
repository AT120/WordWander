import { useState } from "react";
import ToReversoContext from "./ToReversoContext";
import ToGlosbe from "./ToGlosbe";
import ToDictionary from "./ToDictionary";

function countSpaces(text) {
    let spaces = 0
    for (const char of text)
        if (char === ' ')
            spaces += 1
    return spaces
}

function getTextSize(text) {
    if (countSpaces(text) <= 1)
        return 'x-large'

    if (text.length < 100)
        return 'large'

    if (text.length < 200)
        return 'medium'

    return 'small'

}

let prevText = ''
export default function TranslateMobile({ translation, sourceLang, targetLang }) {
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
            style={{ fontSize: getTextSize(textToTranslate) }}
        >


            <div className="d-flex text-field">
                <div className="col-6 px-3">
                    {textToTranslate}
                </div>
                <div className="col-6 px-3">
                    {(translatedText) ? translatedText : '...'}
                    {/* TODO: анимация */}
                </div>
            </div>

            <div className="d-flex mt-auto">
                <button onClick={hidePopup} className="d-flex flex-grow-1 justify-content-center" >
                    <svg className="icon" viewBox="0 0 25 20" style={{ height: "4rem" }}>
                        <path d="M 3 15 L 12 12 L 21 15" />
                    </svg>
                </button>
                <div className="d-flex ms-auto">
                    <div className="me-3">
                        <ToDictionary
                            width="3.4rem"
                            height="3rem"
                            word={textToTranslate}
                            translation={translatedText}
                        />
                    </div>
                    <div className="me-3">
                        <ToGlosbe
                            textToTranslate={textToTranslate}
                            sourceLang={sourceLang}
                            targetLang={targetLang}
                            size="3rem"
                        />
                    </div>

                    <div className="me-3">
                        <ToReversoContext
                            textToTranslate={textToTranslate}
                            sourceLang={sourceLang}
                            targetLang={targetLang}
                            size="3rem"
                        />
                    </div>

                </div>
            </div>


        </div>
    )
}