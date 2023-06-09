import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function BookNavigation() {
    const bookView = useSelector(state => state.readerReducer.bookView)
    const dispatch = useDispatch()
    function nextPage() {
        bookView.next()
    }
    
    function prevPage() {
        bookView.prev()
    }
    
    const hiddenState = (bookView) ? '' : 'visually-hidden'
    return (
        <div id="nav-bar" className={"toolbar " + hiddenState}>
            <button id="left-button" aria-label="Go left" onClick={prevPage}>
                <svg class="icon" width="24" height="24" aria-hidden="true">
                    <path d="M 15 6 L 9 12 L 15 18" />
                </svg>
            </button>
            <input id="progress-slider" type="range" min="0" max="1" step="any" list="tick-marks" />
            <datalist id="tick-marks"></datalist>
            <button id="right-button" aria-label="Go right" onClick={nextPage}>
                <svg class="icon" width="24" height="24" aria-hidden="true">
                    <path d="M 9 6 L 15 12 L 9 18" />
                </svg>
            </button>
        </div>
    )
}