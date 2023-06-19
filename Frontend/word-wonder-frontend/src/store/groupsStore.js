import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let reducers = combineReducers({
    groupsReducer
})

let groupsStore = createStore(reducers, applyMiddleware(thunk));

export default groupsStore;