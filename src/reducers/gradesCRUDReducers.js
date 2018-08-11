import {FETCH_GRADES_SUCCESS, FETCH_GRADES_ERROR} from '../../actions/Grades-Page-Actions/fetchGrades';

const initialState = {
  grades: [],
  error: null
};

export default function gradesCRUDReducer(state=initialState, action){
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
  return state;
}
//POST new grade
//GET one grade
//PUT edit one grade
//DELTE one grade