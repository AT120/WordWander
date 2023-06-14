import { useState } from "react";
import { useSelector } from "react-redux";


let prevText = ''
export default function TranslateMobile({translation}) {
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
        <div id="translate-popup-mobile" className={`d-flex flex-column ${(hidden) ? 'hidden' : ''}`}>
            <div className="row flex-grow-1">
                <div className="text col-6 p-3">
                    {textToTranslate}
                </div>
                <div className="text col-6 p-3">
                    { (translatedText) ? translatedText : '...'} 
                    {/* TODO: анимация */}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={hidePopup}>
                    <svg className="icon" viewBox="0 0 25 20" style={{ height: "4rem" }}>
                        <path d="M 3 15 L 12 12 L 21 15" />
                    </svg>
                </button>
            </div>
        </div>
    )
}