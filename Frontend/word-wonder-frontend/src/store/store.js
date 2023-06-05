import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import bookListReducer from '../reducers/book-list-reducer';

let reducers = combineReducers({
    booksPage : bookListReducer
});
let store = createStore (reducers, applyMiddleware(thunk));

export default store;