import { languages } from '../../../const/languages'

export default function ToReversoContext({ textToTranslate, sourceLang, targetLang , size}) {
    let sourceLangFull = languages.find(el => el[0] === sourceLang)
    sourceLangFull = sourceLangFull[1].toLowerCase() 
    
    let targetLangFull = languages.find(el => el[0] === targetLang)
    targetLangFull = targetLangFull[1].toLowerCase()
    
    const reversoUrl = `https://context.reverso.net/translation/${sourceLangFull}-${targetLangFull}/${textToTranslate}`
    return (
        <a 
            href={encodeURI(reversoUrl)}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img src="reverso.png" alt="reverso" style={{ width: size }} />
        </a>
    )
}