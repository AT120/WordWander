import axios from "axios";
import { baseURL } from "./api";

async function translate_internal(text, sourceLang, targetLang) {
    try {
        const data = {
            'q': text,
            'source': sourceLang,
            'target': targetLang
        }
        const config = { withCredentials: true }
        const resp = await axios.post(baseURL + 'translate', data, config)

        if (!resp || resp.status !== 200) {
            console.log(resp.data.error)
            return null
        }

        return resp.data.text
    } catch {
        return null
    }

}

async function translate_google(text, sourceLang, targetLang) {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${encodeURIComponent(text)}`;
        const resp = await axios.get(url);
        if (!resp || resp.status !== 200) {
            return null
        }

        return resp.data.sentences.map(sentence => sentence.trans).join("");
    } catch {
        return null
    }
}

let chosen_translator = translate_internal
export default async function translate(text, sourceLang, targetLang) {
    return chosen_translator(text, sourceLang, targetLang)
}

export const availableTranslators = {
    LibreTranslate: 0,
    GoogleTranslate: 1
}

export function changeTranslator(translator) {
    switch (translator) {
        case availableTranslators.GoogleTranslate:
            chosen_translator = translate_google
            break;
        case availableTranslators.LibreTranslate:
            chosen_translator = translate_internal
            break;
        default:
            chosen_translator = translate_internal
            break;
    }
}