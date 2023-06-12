import React from "react"
import Files from "react-files"
import { useDispatch, useSelector } from "react-redux";
import { uploadBookFileActionCreator } from "../../reducers/reader-reducer";

function  FileLoader() {
    const dispatch = useDispatch();
    const file = useSelector(state => state.readerReducer.bookFile)
    const handleChange = (files) => {
        dispatch(uploadBookFileActionCreator(files[0]))
        // console.log(files)
    }

    const handleError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    
    //TODO: форматы книг
    if (file)
        return 
        
    return(
        <Files
            onChange={handleChange}
            onError={handleError}
            accepts={['application/pdf', 'application/epub+zip', ".fb2"]}
            clickable
        >
            Загрузить книгу
        </Files>
    )
}

export default FileLoader