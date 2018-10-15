import {CREATE_ASSIGNMENT_ERROR,CREATE_ASSIGNMENT_REQUEST,CREATE_ASSIGNMENT_SUCCESS} from '../actions/POST/createAssignment';
import  {FETCH_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENT_ERROR, FILTER_ASSIGNMENTS, FETCH_ONE_ASSIGNMENT_SUCCESS, FETCH_ONE_ASSIGNMENT_ERROR, SEARCH_ASSIGNMENTS_SUCCESS, FETCH_ASSIGNMENT_REQUEST} from '../actions/GET/fetchAssignments';
import {DELETE_ASSIGNMENT_ERROR, DELETE_ASSIGNMENT_SUCCESS} from '../actions/DELETE/deleteAssignment';
import {EDIT_ASSIGNMENT_SUCCESS, EDIT_ASSIGNMENT_ERROR, ADD_ASSIGNMENT_CLASS, REMOVE_ASSIGNMENT_CLASS, EDIT_ASSIGNMENT_REQUEST} from '../actions/PUT/editAssignment';
import { EDIT_GRADE_SUCCESS } from '../actions/PUT/editGrade';

const initialState = {
  loading:false,
  error: null,
  assignments: [],
  filteredAssignments: [],
  currentAssignment: null
};
  
export default function assignmentCRUDReducers(state = initialState, action) {
  //POST new assignment
  if(action.type === CREATE_ASSIGNMENT_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_SUCCESS) {
    const newAssignment = {
      name: action.assignmentInfo.name,
      date: action.assignmentInfo.date,
      userId: action.assignmentInfo.userId,
      categoryId: action.assignmentInfo.categoryId,
      classes: action.assignmentInfo.classes,
      grades:action.assignmentInfo.grades,
    };
    const updatedAssignments = [...state.assignments, newAssignment];
    return Object.assign({}, state, {
      assignments: updatedAssignments,
      loading: false,
      error: null
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  //GET all
  else if(action.type===FETCH_ASSIGNMENT_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      assignments: action.assignmentInfo,
      filteredAssignments: action.assignmentInfo,
      loading: false
    });
  }
  else if(action.type===FETCH_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type===FILTER_ASSIGNMENTS){
    return Object.assign({}, state, {
      filteredAssignments: action.filter,
      loading: false
    });
  }
  else if(action.type===SEARCH_ASSIGNMENTS_SUCCESS){
    return Object.assign({}, state, {
      filteredAssignments: action.searchTerm,
      loading: false
    });
  }
  //GET one class
  else if(action.type===FETCH_ONE_ASSIGNMENT_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      currentAssignment: action.currentAssignment,
      loading: false
    });
  }
  else if(action.type===FETCH_ONE_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  //PUT update assignment
  else if(action.type===EDIT_ASSIGNMENT_SUCCESS){
    const indexToUpdate = state.assignments.findIndex(assignment => {
      return assignment.id === action.assignment.id;
    });
    const updatedAssignments = [...state.assignments];
    state.assignments[indexToUpdate]=action.assignment;
    return Object.assign({}, state, {
      assignments: updatedAssignments,
      loading: false
    });
  }
  else if(action.type===EDIT_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type=== ADD_ASSIGNMENT_CLASS){
    const newClasses = [...state.currentAssignment.classes, action.classItem];
    return Object.assign({}, state, {
      currentAssignment:{
        name: state.currentAssignment.name,
        date: state.currentAssignment.date,
        userId: state.currentAssignment.userId,
        categoryId: state.currentAssignment.categoryId,
        classes: newClasses,
        grades: state.currentAssignment.grades
      },
      loading: false
    });
  }
  else if(action.type=== REMOVE_ASSIGNMENT_CLASS){
    const newClasses = state.currentAssignment.classes.filter(classItem => classItem !== action.classItem);
    return Object.assign({}, state, {
      currentAssignment:{
        name: state.currentAssignment.name,
        date: state.currentAssignment.date,
        userId: state.currentAssignment.userId,
        categoryId: state.currentAssignment.categoryId,
        classes: newClasses,
        grades: state.currentAssignment.grades
      },
      loading: false
    });
  }
  else if(action.type===EDIT_GRADE_SUCCESS){
    const indexToUpdate = state.assignments.findIndex(assignment => assignment.id === action.currentGrade.assignmentId);
    const assignmentToEdit = state.assignments[indexToUpdate];
    if(!assignmentToEdit.grades.includes(action.currentGrade.id)){
      return assignmentToEdit.grades = [...assignmentToEdit.grades, action.currentGrade.id];
    }
    const updatedAssignments = [...state.assignments];
    updatedAssignments.splice(indexToUpdate, 1, assignmentToEdit);
    return Object.assign({}, state, {
      assignments: updatedAssignments,
      loading: false
    });
  }
  //DELETE    
  else if(action.type === DELETE_ASSIGNMENT_SUCCESS) {
    const indexToDelete = state.findIndex(assignment => {
      return assignment.id === action.assignment.id;
    });
    return Object.assign({}, state, {
      assignments: this.assignments.splice(indexToDelete, 1),
      loading:false,
      error:null
    });
  }
  else if(action.type === DELETE_ASSIGNMENT_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type === FETCH_ASSIGNMENT_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === EDIT_ASSIGNMENT_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  return state;
}