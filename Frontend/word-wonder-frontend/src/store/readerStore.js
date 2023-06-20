import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import readerReducer from '../reducers/reader-reducer';
import translateReducer from '../reducers/translate-reducer';

const reducers = combineReducers({
    readerReducer : readerReducer,
    translateReducer : translateReducer
});
const readerStore = createStore (reducers, applyMiddleware(thunk));

export default readerStore;