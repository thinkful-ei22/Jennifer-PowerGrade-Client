import {CREATE_CLASS_ERROR, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS} from '../actions/POST/createClass';
import {FETCH_CLASSES_SUCCESS, FETCH_CLASSES_ERROR, FILTER_CLASSES, FETCH_ONE_CLASS_SUCCESS} from '../actions/GET/fetchClasses';
import {DELETE_CLASS_SUCCESS, DELETE_CLASS_ERROR} from '../actions/DELETE/deleteClass';
import { FETCH_ONE_ASSIGNMENT_ERROR } from '../actions/GET/fetchAssignments';

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
  currentClass: {}
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
  //GET one class
  else if(action.type===FETCH_ONE_CLASS_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      currentClass: action.currentClass
    });
  }
  else if(action.type===FETCH_ONE_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  //filter class list
  else if(action.type===FILTER_CLASSES){
    return Object.assign({}, state, {
      filteredClasses: action.filter
    });
  }
  else if(action.type===DELETE_CLASS_SUCCESS){
    //DELTE one class
    const indexToDelete = state.findIndex(classItem => {
      return classItem.id === action.class.id;
    });
    return Object.assign({}, state, {
      classes: this.classes.splice(indexToDelete, 1),
      loading:false,
      error:null
    });
  }
  else if(action.type===DELETE_CLASS_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  //PUT edit one class
  return state;
}