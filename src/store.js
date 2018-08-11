import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form  } from 'redux-form';
import loginReducer from './reducers/Login-Page-Reducers/loginReducer';
import fetchStudentsReducer from './reducers/Dashboard-Page-Reducers/fetchStudentsReducer';
import fetchAssignmentsReducer from './reducers/Assignment-Page-Reducers/fetchAssignmentsReducer';
import createClassReducer from './reducers/Dashboard-Page-Reducers/createClassReducer';
import fetchGradesReducer from './reducers/Grades-Page-Reducers/fetchGradesReducer';
import fetchClassesReducer from './reducers/Grades-Page-Reducers/fetchClassesReducer';
import fetchCategoriesReducer from './reducers/Assignment-Page-Reducers/fetchCategoriesReducer';
import createAssignmentReducer from './reducers/Assignment-Page-Reducers/createAssignmentReducer';
import fetchStandardsReducer from './reducers/Assignment-Page-Reducers/fetchStandardsReducer';

const rootReducer = combineReducers({
  loginReducer,
  fetchStudentsReducer,
  form,
  fetchAssignmentsReducer,
  createClassReducer,
  fetchGradesReducer,
  fetchClassesReducer,
  fetchCategoriesReducer,
  createAssignmentReducer,
  fetchStandardsReducer
});
const store= createStore(rootReducer, applyMiddleware(thunk));

export default store;
