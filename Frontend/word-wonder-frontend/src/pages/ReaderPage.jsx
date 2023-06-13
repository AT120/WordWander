import { Provider, useDispatch } from 'react-redux';
import FileLoader from '../components/reader/FileLoader';
import storeReader from '../store/storeReader';
import "./Reader.css"
import "./TranslatePopup.css"
import "./ReaderSettings.css"
import BookViewMin from '../components/reader/BookViewMin';
import BookNavigation from '../components/reader/BookNavigation';
import TranslatePopup from '../components/reader/TranslatePopup';
import ReaderSettings from '../components/reader/ReaderSettings';

function Reader() {

    return (
        <Provider store={storeReader}> 
            <ReaderSettings /> 
            {/* TODO: авторизация */}
            <TranslatePopup />
            <FileLoader />
            <BookViewMin />
            <BookNavigation />
        </Provider> 
    )
}

export default Reader;