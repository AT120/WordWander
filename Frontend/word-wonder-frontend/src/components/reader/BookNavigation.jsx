import { createElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function sliderInputHandler(event, bookView) {
    bookView.goToFraction(parseFloat(event.target.value))
}



function GetSectionMarks(book) {
    let sizes = book.sections
        .filter(s => s.linear !== 'no')
        .map(s => s.size)
    const total = sizes.reduce((a, b) => a + b, 0)
    sizes = sizes.slice(0, -1)
    let sum = 0
    return sizes.map(size => {
        sum += size
        return <option value={sum / total} key={sum}></option>
    })
}




function ProgressSlider() {
    const bookView = useSelector(state => state.readerReducer.bookView)
    const fraction = useSelector(state => state.readerReducer.progress.fraction)
    
    return (
        <input 
            id="progress-slider"
            dir={bookView.book.dir} 
            onInput={e => sliderInputHandler(e, bookView)}
            type="range" 
            min="0" 
            max="1"
            value={fraction.toString()} 
            step="any" 
            list="tick-marks"
        />
    ) //TODO: восстанавливать прогресс
}

function SliderTicks() {
    const bookView = useSelector(state => state.readerReducer.bookView)
    return (
        <datalist id="tick-marks">
            {GetSectionMarks(bookView.book)}
        </datalist>
    )
}

export default function BookNavigation() {
    const bookView = useSelector(state => state.readerReducer.bookView)
    const dispatch = useDispatch()
    function nextPage() {
        bookView.goRight()
    }

    function prevPage() {
        bookView.goLeft()
    }

    const hiddenState = (bookView) ? '' : 'visually-hidden'
    if (!bookView)
        return

    return (
        <div id="nav-bar" className={"toolbar " + hiddenState}>
            <button id="left-button" aria-label="Go left" onClick={prevPage}>
                <svg className="icon" width="24" height="24" aria-hidden="true">
                    <path d="M 15 6 L 9 12 L 15 18" />
                </svg>
            </button>
            <ProgressSlider />
            <SliderTicks />
            <button id="right-button" aria-label="Go right" onClick={nextPage}>
                <svg className="icon" width="24" height="24" aria-hidden="true">
                    <path d="M 9 6 L 15 12 L 9 18" />
                </svg>
            </button>
        </div>
    )
}

