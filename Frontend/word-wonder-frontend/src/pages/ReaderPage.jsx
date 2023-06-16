import { Provider } from 'react-redux';
import FileLoader from '../components/reader/FileLoader';
import storeReader from '../store/storeReader';
import "./TranslatePopup.css"
import "./ReaderSettings.css"
import BookViewMin from '../components/reader/BookViewMin';
import BookNavigation from '../components/reader/BookNavigation';
import TranslatePopup from '../components/reader/TranslatePopup';
import ReaderSettings from '../components/reader/ReaderSettings';
import { useLocation } from 'react-router';
// import "./Reader.css"

function Reader() {
    const location = useLocation()

    require("./Reader.css")
    return (
        <Provider store={storeReader}>
            <ReaderSettings />
            {/* TODO: авторизация */}
            <TranslatePopup />
            <FileLoader />
            <BookViewMin fileId={location.state} />
            <BookNavigation />
        </Provider>
    )
}

export default Reader;