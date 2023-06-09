import { Provider, useDispatch } from 'react-redux';
import FileLoader from '../components/reader/FileLoader';
import storeReader from '../store/storeReader';
import FileGetter from '../components/reader/FileGetter';
import "./Reader.css"
import BookViewMin from '../components/reader/BookViewMin';
import BookNavigation from '../components/reader/BookNavigation';

function Reader() {

    return (
        <Provider store={storeReader}> 
            <FileLoader />
            <h1>
                TEST
            </h1>
            <FileGetter />
            {/* <BookViewWrapper/> */}
            <BookViewMin />
            <BookNavigation />
        </Provider> 
    )
}

export default Reader;