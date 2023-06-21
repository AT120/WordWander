import { Provider } from 'react-redux';
import storeReader from '../../store/readerStore';
import "./TranslatePopup.css"
import "./ReaderSettings.css"
import BookLoader from '../../components/reader/BookLoader';
import TranslatePopup from '../../components/reader/TranslatePopup';
import ReaderSettings from '../../components/reader/ReaderSettings';
import { useLocation } from 'react-router';
import CloseBook from '../../components/reader/CloseBook';
// import "./Reader.css"

function Reader() {
    const location = useLocation()

    require("./Reader.css")


    return (
        <Provider store={storeReader}>
            <ReaderSettings />
            <CloseBook />
            <TranslatePopup />
            <BookLoader fileId={location.state.id} foreign={location.state.foreign} />
        </Provider>
    )
}

export default Reader;