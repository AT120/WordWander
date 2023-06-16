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
import { useLocation } from 'react-router';
import { loadBookThunkCreator } from '../reducers/reader-reducer';
// import "./Reader.css"
const meta = {
    meta: {
      name: {
        'color-scheme': 'light dark'
      }
    }
}

function Reader() {
    const location = useLocation()    

    require("./Reader.css")
    return (
        <DocumentMeta {...meta}>
            <Provider store={storeReader}>
                <ReaderSettings />
                {/* TODO: авторизация */}
                <TranslatePopup />
                <FileLoader />
                <BookViewMin fileId={location.state}/>
                <BookNavigation />
            </Provider>
        </DocumentMeta>
    )
}

export default Reader;