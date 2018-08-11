import {FETCH_GRADES_SUCCESS, FETCH_GRADES_ERROR} from '../actions/GET/fetchGrades';
import {DELETE_GRADE_SUCCESS, DELETE_GRADE_ERROR} from '../actions/DELETE/deleteGrade';
const initialState = {
  grades: [],
  error: null
};

export default function gradesCRUDReducers(state=initialState, action){
  //POST new grade
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
//PUT edit one grade
