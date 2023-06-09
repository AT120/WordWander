import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import loginReducer from '../reducers/login-reducer';


let reducers = combineReducers({
    loginPage : loginReducer
});
let loginStore = createStore (reducers, applyMiddleware(thunk));

export default loginStore;