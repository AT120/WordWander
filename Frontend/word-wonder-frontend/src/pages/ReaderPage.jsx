import { Provider, useDispatch } from 'react-redux';
import FileLoader from '../components/reader/FileLoader';
import storeReader from '../store/storeReader';
import "./Reader.css"
import BookViewMin from '../components/reader/BookViewMin';
import BookNavigation from '../components/reader/BookNavigation';

function Reader() {

    return (
        <Provider store={storeReader}> 
            <FileLoader />
            {/* <BookViewWrapper/> */}
            <BookViewMin />
            <BookNavigation />
        </Provider> 
    )
}

export default Reader;