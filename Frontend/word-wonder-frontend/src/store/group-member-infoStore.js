import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import groupMemberInfoReducer from '../reducers/group-member-info-reducer';



let reducers=combineReducers({
    groupMemberInfoReducer
})

let GroupMemberInfoStore = createStore (reducers, applyMiddleware(thunk));

export default GroupMemberInfoStore;