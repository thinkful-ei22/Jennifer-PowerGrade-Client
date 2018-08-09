
import {FETCH_CLASSES_SUCCESS, FETCH_CLASSES_ERROR} from '../../actions/Grades-Page-Actions/getClasses';

const initialState = {
  classes: [],
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
  return state;
};