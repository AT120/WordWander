import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import registrationReducer  from '../reducers/registration-reducer';


let reducers = combineReducers({
    registrationPage : registrationReducer 
});
let registrationStore = createStore (reducers, applyMiddleware(thunk));

export default registrationStore;