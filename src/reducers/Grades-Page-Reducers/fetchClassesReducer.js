
import {FETCH_CLASSES_SUCCESS, FETCH_CLASSES_ERROR, FILTER_CLASSES} from '../../actions/Grades-Page-Actions/fetchClasses';

const initialState = {
  classes: [],
  filteredClasses: [],
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_CLASSES_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      classes: action.classes
    });
  }
  else if(action.type===FETCH_CLASSES_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if(action.type===FILTER_CLASSES){
    return Object.assign({}, state, {
      filteredClasses: action.filter
    });
  }
  return state;
};