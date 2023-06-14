import { Provider, useDispatch } from 'react-redux';
import FileLoader from '../components/reader/FileLoader';
import storeReader from '../store/storeReader';
import "./TranslatePopup.css"
import "./ReaderSettings.css"
import BookViewMin from '../components/reader/BookViewMin';
import BookNavigation from '../components/reader/BookNavigation';
import TranslatePopup from '../components/reader/TranslatePopup';
import ReaderSettings from '../components/reader/ReaderSettings';
import DocumentMeta from 'react-document-meta';

const meta = {
    meta: {
      name: {
        'color-scheme': 'light dark'
      }
    }
}

function Reader() {
    require("./Reader.css")
    return (
        <DocumentMeta {...meta}>
            <Provider store={storeReader}>
                <ReaderSettings />
                {/* TODO: авторизация */}
                <TranslatePopup />
                <FileLoader />
                <BookViewMin />
                <BookNavigation />
            </Provider>
        </DocumentMeta>
    )
}

export default Reader;