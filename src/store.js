import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form  } from 'redux-form';
import loginReducer from './reducers/Login-Page-Reducers/loginReducer';
import studentListReducer from './reducers/Dashboard-Page-Reducers/studentListReducer';
import assignmentReducer from './reducers/Assignment-Page-Reducers/assignmentReducer';
import createClassReducer from './reducers/Dashboard-Page-Reducers/createClassReducer';
import fetchGradesReducer from './reducers/Grades-Page-Reducers/fetchGradesReducer';
import fetchClassesReducer from './reducers/Grades-Page-Reducers/fetchClassesReducer';
import categoriesReducer from './reducers/Assignment-Page-Reducers/categoriesReducer';

const rootReducer = combineReducers({
  loginReducer,
  studentListReducer,
  form,
  assignmentReducer,
  createClassReducer,
  fetchGradesReducer,
  fetchClassesReducer,
  categoriesReducer
});
const store= createStore(rootReducer, applyMiddleware(thunk));

export default store;
