import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import groupMemberInfoReducer from '../reducers/group-member-info-reducer';
import bookListReducer from '../reducers/book-list-reducer';


let reducers=combineReducers({
    groupMemberInfoReducer,
    booksPage : bookListReducer
})

let GroupMemberInfoStore = createStore (reducers, applyMiddleware(thunk));

export default GroupMemberInfoStore;