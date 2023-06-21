import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import groupsReducer from '../reducers/groups-reducer';
import errorReducer from '../reducers/error-reducer';

let reducers = combineReducers({
    groupsReducer,
    errorReducer
})

let groupsStore = createStore(reducers, applyMiddleware(thunk));

export default groupsStore;