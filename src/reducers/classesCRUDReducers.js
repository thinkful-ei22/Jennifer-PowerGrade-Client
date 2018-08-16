import {CREATE_CLASS_ERROR, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS} from '../actions/POST/createClass';
import {FETCH_CLASSES_SUCCESS, FETCH_CLASSES_ERROR, FILTER_CLASSES, FETCH_ONE_CLASS_SUCCESS, FETCH_ONE_CLASS_ERROR} from '../actions/GET/fetchClasses';
import {DELETE_CLASS_SUCCESS, DELETE_CLASS_ERROR} from '../actions/DELETE/deleteClass';
import {EDIT_CLASS_SUCCESS, EDIT_CLASS_ERROR, ADD_CLASS_STUDENT, REMOVE_CLASS_STUDENT} from '../actions/PUT/editClass';
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
  else if(action.type===FETCH_ONE_CLASS_ERROR){
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
  //PUT edit one class
  else if(action.type===EDIT_CLASS_SUCCESS){
    const indexToUpdate = state.classes.findIndex(classItem => {
      return classItem.id === action.class.id;
    });
    const updatedClasses = [...state.classes];
    state.classes[indexToUpdate]=action.class;
    return Object.assign({}, state, {
      classes: updatedClasses
    });
  }
  else if(action.type===EDIT_CLASS_ERROR){
    return Object.assign({}, state, {
      error: action.error
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
      }
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
      }
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_SUCCESS){
    const newAssignmentId = action.assignmentInfo.id;
    const classesInAssignment = action.assignmentInfo.classes;
    const updatedAssignmentList = state.classes.map(classItem => {
      if(classesInAssignment.includes(classItem.id)){
        classItem.assignments = [...classItem.assignments, newAssignmentId];
      }
      return classItem;
    });
    return Object.assign({}, state, {
      classes: updatedAssignmentList
    });
  }
  //DELTE one class
  else if(action.type===DELETE_CLASS_SUCCESS){
    const indexToDelete = state.findIndex(classItem => {
      return classItem.id === action.class.id;
    });
    return Object.assign({}, state, {
      classes: state.classes.splice(indexToDelete, 1),
      loading:false,
      error:null
    });
  }
  else if(action.type===DELETE_CLASS_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}