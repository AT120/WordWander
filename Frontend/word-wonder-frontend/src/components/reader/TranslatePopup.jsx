import { useEffect, useRef, useState } from "react";
import TranslateMobile from "./Translate/TranslateMobile";
import TranslateDesktop from "./Translate/TranslateDesktop";
import { useDispatch, useSelector } from "react-redux";
import { updateTranslatePositionActionCreator } from "../../reducers/translate-reducer";

export default function TranslatePopup() {
    const [isMobile, setMobile] = useState(window.innerWidth / window.innerHeight < 1);
    const state = useSelector(state => state.translateReducer)
    const translation = state.translation
    const dispatch = useDispatch();
    const ref = useRef(null)

    const updateMobile = () => {
        setMobile(window.innerWidth / window.innerHeight < 1);
    }

    useEffect(() => {
        window.addEventListener("resize", updateMobile);
        if (ref.current && !isMobile) {
            const xOverflow = ref.current.offsetWidth + translation.position.x - window.innerWidth;
            const yOverflow = ref.current.offsetHeight + translation.position.y - window.innerHeight;
            if (xOverflow > 0 || yOverflow > 0) {
                const newPosition = { ...translation.position }
                if (xOverflow > 0) {
                    newPosition.x = newPosition.x - xOverflow - 10
                }
                if (yOverflow > 0)
                    newPosition.y = newPosition.y - yOverflow - 10

                dispatch(updateTranslatePositionActionCreator(newPosition))
            }
        }


        return () => window.removeEventListener("resize", updateMobile);
    })


    if (isMobile)
        return <TranslateMobile 
            translation={translation} 
            sourceLang={state.sourceLanguage} 
            targetLang={state.targetLanguage} 
        />
    else
        return <TranslateDesktop
            reference={ref}
            translation={translation}
            sourceLang={state.sourceLanguage}
            targetLang={state.targetLanguage} 
        />


}