
import {FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR} from '../../actions/Dashboard-Page-Actions/studentList';

const initialState = {
  students: [],
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_STUDENTS_SUCCESS){
    console.log('action=',action);
    return Object.assign({}, state, {
      error: null,
      students: action.students
    });
  }
  else if(action.type===FETCH_STUDENTS_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};