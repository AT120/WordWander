import { useDispatch, useSelector } from "react-redux"
import { addWordToDictThunkCreator, deleteWordFromDictThunkCreator } from "../../../reducers/reader-reducer"

export default function ToDictionary({ width, height, word, translation }) {
    const dictionary = useSelector(state => state.readerReducer.dictionary)
    const dispatch = useDispatch()
    
    function addToDict(word, translation) {
        dispatch(addWordToDictThunkCreator(word, translation))
    }

    function removeFromDict(id, word) {
        dispatch(deleteWordFromDictThunkCreator(id, word))
    }
    
    const wordId = dictionary.get(word.toLowerCase())?.[1]
    const fillColor = (wordId) ? 'gold' : 'none'
    
    return (
        <button 
            className="add-to-dictionary" 
            onClick={(wordId) ? () => removeFromDict(wordId, word) : () => addToDict(word, translation)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={fillColor}
                className="bi bi-star"
                viewBox='0 0 16 16'
            >
                <path stroke="white" d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        </button>
    )
}