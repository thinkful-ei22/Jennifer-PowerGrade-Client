import {FETCH_GRADES_SUCCESS, FETCH_GRADES_ERROR} from '../actions/GET/fetchGrades';
import {DELETE_GRADE_SUCCESS, DELETE_GRADE_ERROR} from '../actions/DELETE/deleteGrade';
import {EDIT_GRADE_SUCCESS, EDIT_GRADE_ERROR} from '../actions/PUT/editGrade';

const initialState = {
  grades: [],
  error: null
};

export default function gradesCRUDReducers(state=initialState, action){
  //GET all grades
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
  // PUT edit one grade
  else if(action.type===EDIT_GRADE_SUCCESS){
    const indexToUpdate = state.findIndex(grade => {
      return grade.id === action.grade.id;
    });
    const updatedGrades = [...this.grades];
    this.grades[indexToUpdate]=action.grade;
    return Object.assign({}, state, {
      grades: updatedGrades
    });
  }
  else if(action.type===EDIT_GRADE_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if(action.type===DELETE_GRADE_SUCCESS){
    //DELTE one grade
    const indexToDelete = state.findIndex(grade => {
      return grade.id === action.grade.id;
    });
    return Object.assign({}, state, {
      grades: this.grades.splice(indexToDelete, 1),
      error: null
    });
  }
  else if(action.type===DELETE_GRADE_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}

//GET one grade

