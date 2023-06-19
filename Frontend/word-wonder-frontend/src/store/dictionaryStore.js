import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import dictionaryReducer from '../reducers/dictionary-reducer';

let reducers=combineReducers({
    dictionaryReducer
})

let storeDictionary = createStore (reducers, applyMiddleware(thunk));

export default storeDictionary;