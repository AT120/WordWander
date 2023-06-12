import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import readerReducer from '../reducers/reader-reducer';

let reducers = combineReducers({
    readerReducer
});
let storeReader = createStore (reducers, applyMiddleware(thunk));

export default storeReader;