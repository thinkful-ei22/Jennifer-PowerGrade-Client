import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form  } from 'redux-form';
import loginReducer from './reducers/Login-Page-Reducers/loginReducer';
import studentListReducer from './reducers/Dashboard-Page-Reducers/studentListReducer';

const rootReducer = combineReducers({
  loginReducer,
  studentListReducer,
  form
});
const store= createStore(rootReducer, applyMiddleware(thunk));

export default store;
