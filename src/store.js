import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as form  } from 'redux-form';
import loginReducer from './reducers/loginReducer';
import categoriesCRUDReducer from './reducers/categoriesCRUDReducer';
import fetchStandardsReducer from './reducers/fetchStandardsReducer';
import assignmentCRUDReducer from './reducers/assignmentCRUDReducers';
import classesCRUDReducer from './reducers/classesCRUDReducers';
import gradesCRUDReducer from './reducers/gradesCRUDReducers';
import studentsCRUDReducer from './reducers/studentsCRUDReducers';
import dashboardReducer from './reducers/dashboardReducer';

const rootReducer = combineReducers({
  loginReducer,
  form,
  assignmentCRUDReducer,
  classesCRUDReducer,
  categoriesCRUDReducer,
  fetchStandardsReducer,
  gradesCRUDReducer,
  studentsCRUDReducer,
  dashboardReducer
});
const store= createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
