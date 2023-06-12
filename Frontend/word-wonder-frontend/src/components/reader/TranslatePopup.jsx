import { useState } from "react";
import { useSelector } from "react-redux";




let prevText = ''
export default function TranslatePopup() {
    const textToTranslate = useSelector(state => state.readerReducer.textToTranslate)
    const [hidden, hide] = useState(true)
    const hidePopup = () => hide(true)

    if (prevText !== textToTranslate) {
        prevText = textToTranslate
        hide(false)
        return;
    }

    return (
        <div id="translate-popup" className={`d-flex flex-column ${(hidden) ? 'hidden' : ''}`}>
            <div className="d-flex flex-row flex-grow-1">
                <div className="text flex-grow-1 p-3">
                    {textToTranslate}
                </div>
                <div className="text flex-grow-1 p-3">
                    {textToTranslate}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={hidePopup}>
                    <svg class="icon" viewBox="0 0 25 20" style={{ height: "4rem" }}>
                        <path d="M 3 15 L 12 12 L 21 15" />
                    </svg>
                </button>
            </div>
        </div>
    )
}