import {CREATE_ASSIGNMENT_ERROR,CREATE_ASSIGNMENT_REQUEST,CREATE_ASSIGNMENT_SUCCESS} from '../actions/POST/createAssignment';
import  {FETCH_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENT_ERROR, FILTER_ASSIGNMENTS} from '../actions/GET/fetchAssignments';
import {DELETE_ASSIGNMENT_ERROR, DELETE_ASSIGNMENT_SUCCESS} from '../actions/DELETE/deleteAssignment';

const initialState = {
  loading:false,
  error: null,
  categoryId: '',
  assignmentName: '',
  classes: [],
  assignmentDate:'',
  assignments: [],
  filteredAssignments: [],
};
  
export default function assignmentCRUDReducers(state = initialState, action) {
  //POST new assignment
  if(action.type === CREATE_ASSIGNMENT_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_SUCCESS) {
    return Object.assign({}, state, {
      assignmentName: action.assignmentInfo.name,
      categoryId: action.assignmentInfo.categoryId,
      classes: action.assignmentInfo.classes,
      assignmentDate: action.assignmentInfo.assignmentDate,
      loading: false,
      error: null
    });
  }
  else if(action.type === CREATE_ASSIGNMENT_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  //GET all
  else if(action.type===FETCH_ASSIGNMENT_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      assignments: action.assignmentInfo,
      filteredAssignments: action.assignmentInfo
    });
  }
  else if(action.type===FETCH_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if(action.type===FILTER_ASSIGNMENTS){
    return Object.assign({}, state, {
      filteredAssignments: action.filter
    });
  }
  //get one??
  //PUT update assignment
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
      error: action.error
    });
  }
  return state;
}