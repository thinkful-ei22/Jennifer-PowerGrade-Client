import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import testReducer from './reducers/testreducer';


const store= createStore(testReducer, applyMiddleware(thunk));

export default store;
