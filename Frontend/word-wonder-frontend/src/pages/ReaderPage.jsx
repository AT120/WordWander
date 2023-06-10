import { Provider, useDispatch } from 'react-redux';
import FileLoader from '../components/reader/FileLoader';
import storeReader from '../store/storeReader';
import "./Reader.css"
import "./TranslatePopup.css"
import BookViewMin from '../components/reader/BookViewMin';
import BookNavigation from '../components/reader/BookNavigation';
import TranslatePopup from '../components/reader/TranslatePopup';

function Reader() {

    return (
        <Provider store={storeReader}> 
            <TranslatePopup />
            <FileLoader />
            {/* <BookViewWrapper/> */}
            <BookViewMin />
            <BookNavigation />
        </Provider> 
    )
}

export default Reader;