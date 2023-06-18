import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAndThemeTracker from "./BookView/FontAndThemeTracker";
import ProgressTracker from "./BookView/ProgressTracker";
import BookNavigation from "./BookView/BookNavigation";
import { setBookViewActionCreator, updateProgressThunkCreator } from "../../reducers/reader-reducer";

export default function BookView() {
    const book = useSelector(state => state.readerReducer.book)
    const bookViewUpdated = useSelector(state => state.readerReducer.bookView)
    const bookView = useRef(null);
    const dispatch = useDispatch()

    function relocateHandler(event) {
        dispatch(updateProgressThunkCreator(event.detail))
    }

    useEffect(() => {
        async function loadBook() {
            await bookView.current.open(book)
            await bookView.current.goToTextStart()
            bookView.current.addEventListener('relocate', relocateHandler)
            dispatch(setBookViewActionCreator(bookView))
        }
        if (book && !bookViewUpdated.current)
            loadBook()

    }, [book, bookViewUpdated])


    return (
        <div>
            <foliate-view ref={bookView} />
            <FontAndThemeTracker />
            <ProgressTracker  />
            <BookNavigation />
        </div>
    );
}