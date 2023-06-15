import { useEffect, useRef, useState } from "react";
import { CloseButton, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTranslatePositionActionCreator } from "../../../reducers/reader-reducer";

let prevText = ''
export default function TranslateDesktop({ translation, reference }) {
    const [hidden, hide] = useState(true);
    const handleClose = () => hide(true);

    const textToTranslate = translation.textToTranslate
    const translatedText = translation.translatedText
    const width = (textToTranslate.length > 50) ? '40%' : 'auto'
    // const width = 'auto'
    const position = translation.position
    if (prevText !== textToTranslate) {
        prevText = textToTranslate
        hide(false)
        return;
    }


    return (
        <div ref={reference}
            id="translate-popup-desktop"
            className={(hidden ? 'hidden' : '')}
            style={{ left: position.x, top: position.y, width: width }}>
            <div className="d-flex flex-row">
                <div className="me-3">
                    {textToTranslate}
                </div>
                <div className="spacer"></div>
                <div className="ms-3">
                    {(translatedText) ? translatedText : '...'}
                </div>
                <div className="d-flex flex-row">
                    <CloseButton onClick={handleClose} className="ms-2"></CloseButton>

                </div>
            </div>
        </div>
    )

}