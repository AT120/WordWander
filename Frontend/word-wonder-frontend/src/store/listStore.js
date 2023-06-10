import {createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk';
import bookListReducer from '../reducers/book-list-reducer';

let reducers = combineReducers({
    booksPage : bookListReducer
});
let listStore = createStore (reducers, applyMiddleware(thunk));

export default listStore;