import {CREATE_CLASS_ERROR, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS} from '../actions/POST/createClass';
import {FETCH_CLASSES_SUCCESS, FETCH_CLASSES_ERROR, FILTER_CLASSES, FETCH_ONE_CLASS_SUCCESS, FETCH_ONE_CLASS_ERROR, FETCH_CLASSES_REQUEST} from '../actions/GET/fetchClasses';
import {DELETE_CLASS_SUCCESS, DELETE_CLASS_ERROR} from '../actions/DELETE/deleteClass';
import {EDIT_CLASS_SUCCESS, EDIT_CLASS_ERROR, ADD_CLASS_STUDENT, REMOVE_CLASS_STUDENT, EDIT_CLASS_REQUEST} from '../actions/PUT/editClass';
import { CREATE_ASSIGNMENT_SUCCESS } from '../actions/POST/createAssignment';

const initialState = {
  loading:false,
  error: null,
  classes: [],
  filteredClasses: [],
  currentClass: null
};
  
export default function classesCRUDReducers(state = initialState, action) {
  //POST new class
  if(action.type === CREATE_CLASS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === CREATE_CLASS_SUCCESS) {
    console.log(action);
    const newClass ={
      name: action.classInfo.name,
      userId: action.classInfo.userId,
      students: action.classInfo.students,
    };
    const updatedClasses = [...state.classes, newClass];
    return Object.assign({}, state, {
      classes: updatedClasses,
      loading: false,
      error: null
    });
  }
  else if(action.type === CREATE_CLASS_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type===FETCH_CLASSES_SUCCESS){
    //GET all classes
    return Object.assign({}, state, {
      error: null,
      classes: action.classes,
      loading: false
    });
  }
  else if(action.type===FETCH_CLASSES_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type === FETCH_CLASSES_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  //GET one class
  else if(action.type===FETCH_ONE_CLASS_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      currentClass: action.currentClass,
      loading: false
    });
  }
  else if(action.type===FETCH_ONE_CLASS_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  //filter class list
  else if(action.type===FILTER_CLASSES){
    return Object.assign({}, state, {
      filteredClasses: action.filter,
      loading: false
    });
  }
  //PUT edit one class
  else if(action.type===EDIT_CLASS_SUCCESS){
    const indexToUpdate = state.classes.findIndex(classItem => {
      return classItem.id === action.class.id;
    });
    const updatedClasses = [...state.classes];
    state.classes[indexToUpdate]=action.class;
    return Object.assign({}, state, {
      classes: updatedClasses,
      loading: false
    });
  }
  else if(action.type===EDIT_CLASS_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type === EDIT_CLASS_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type===ADD_CLASS_STUDENT){
    const newStudents = [...state.currentClass.students, action.student];
    return Object.assign({}, state, {
      currentClass:{
        name: state.currentClass.name,
        id: state.currentClass.id,
        userId: state.currentClass.id,
        students: newStudents
      },
      loading: false
    });
  }
  else if(action.type===REMOVE_CLASS_STUDENT){
    const newStudents = state.currentClass.students.filter(student => student !== action.student);
    return Object.assign({}, state, {
      currentClass:{
        name: state.currentClass.name,
        id: state.currentClass.id,
        userId: state.currentClass.id,
        students: newStudents
      },
      loading: false
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_SUCCESS){
    const classesInAssignment = action.assignmentInfo.classes;
    const updatedAssignmentList = state.classes.map(classItem => {
      if(classesInAssignment.includes(classItem.id)){
        classItem.assignments = [...classItem.assignments, action.assignmentInfo];
      }
      return classItem;
    });
    return Object.assign({}, state, {
      classes: updatedAssignmentList,
      loading: false
    });
  }
  //DELTE one class
  else if(action.type===DELETE_CLASS_SUCCESS){
    console.log(action);
    return Object.assign({}, state, {
      loading:false,
      error:null
    });
  }
  else if(action.type===DELETE_CLASS_ERROR){
    console.log(action);
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  return state;
}