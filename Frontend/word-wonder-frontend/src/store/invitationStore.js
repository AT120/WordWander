import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import invitationsReducer from '../reducers/invitation-reducer';

let reducers=combineReducers({
    invitationPage:invitationsReducer 
})

let invitationStore = createStore (reducers, applyMiddleware(thunk));

export default invitationStore;