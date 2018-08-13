import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as form  } from 'redux-form';
import loginReducer from './reducers/loginReducer';
import fetchCategoriesReducer from './reducers/fetchCategoriesReducer';
import fetchStandardsReducer from './reducers/fetchStandardsReducer';
import assignmentCRUDReducer from './reducers/assignmentCRUDReducers';
import classesCRUDReducer from './reducers/classesCRUDReducers';
import gradesCRUDReducer from './reducers/gradesCRUDReducers';
import setCategoryValuesReducer from './reducers/setCategoryValuesReducer';
import studentsCRUDReducer from './reducers/studentsCRUDReducers';

const rootReducer = combineReducers({
  loginReducer,
  form,
  assignmentCRUDReducer,
  classesCRUDReducer,
  fetchCategoriesReducer,
  fetchStandardsReducer,
  gradesCRUDReducer,
  studentsCRUDReducer,
  setCategoryValuesReducer,
});
const store= createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
