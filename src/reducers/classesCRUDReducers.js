import { CREATE_CLASS_ERROR, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS} from '../../actions/Dashboard-Page-Actions/createClass';
import {FETCH_CLASSES_SUCCESS, FETCH_CLASSES_ERROR, FILTER_CLASSES} from '../../actions/Grades-Page-Actions/fetchClasses';
  
const initialState = {
  loading:false,
  error: null,
  classId: '',
  className: '',
  classStudents: [],
  studentClasses: [],
  userClasses: [],
  classes: [],
  filteredClasses: [],
};
  
export default function classesCRUDReducers(state = initialState, action) {
  //POST new class
  if(action.type === CREATE_CLASS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === CREATE_CLASS_SUCCESS) {
    return Object.assign({}, state, {
      className: action.classInfo.name,
      classStudents: action.classInfo.studentIds,
      classId: action.id,
      loading: false,
      error: null
    });
  }
  else if(action.type === CREATE_CLASS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if(action.type===FETCH_CLASSES_SUCCESS){
    //GET all classes
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
}
//GET one class
//PUT edit one class
//DELTE one class