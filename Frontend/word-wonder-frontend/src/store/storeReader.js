import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import readerReducer from '../reducers/reader-reducer';
import translateReducer from '../reducers/translate-reducer';

const reducers = combineReducers({
    readerReducer : readerReducer,
    translateReducer : translateReducer
});
const storeReader = createStore (reducers, applyMiddleware(thunk));

export default storeReader;