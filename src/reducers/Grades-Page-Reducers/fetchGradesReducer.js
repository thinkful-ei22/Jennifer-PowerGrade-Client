
import {FETCH_GRADES_SUCCESS, FETCH_GRADES_ERROR} from '../../actions/Grades-Page-Actions/getGrades';

const initialState = {
  grades: [],
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_GRADES_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      grades: action.grades
    });
  }
  else if(action.type===FETCH_GRADES_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};