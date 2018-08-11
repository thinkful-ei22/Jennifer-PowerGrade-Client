import {FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR} from '../actions/GET/fetchStudents';

const initialState = {
  students: [],
  error: null
};
//POST new student --> not a feature
//PUT edit one student --> not a feature
//DELETE one student --> not a feature

export default function studentsCRUDReducer(state=initialState, action) {
//GET all students
  if(action.type===FETCH_STUDENTS_SUCCESS){
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
}