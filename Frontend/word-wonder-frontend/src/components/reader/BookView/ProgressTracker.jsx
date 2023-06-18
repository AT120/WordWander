import { useSelector } from "react-redux";

export default function ProgressTracker() {
    const progress = useSelector(state => state.readerReducer.progress)
    const bookView = useSelector(state => state.readerReducer.bookView)

    if (progress.shouldBeUpdated && bookView)
        bookView.current.goToFraction(progress.fraction)
}