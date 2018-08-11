import {FETCH_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENT_ERROR, FILTER_ASSIGNMENTS} from '../../actions/Assignment-Page-Actions/fetchAssignments';

const initialState = {
  assignments: [],
  filteredAssignments: [],
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_ASSIGNMENT_SUCCESS){
    console.log(action);
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
    console.log(action);
    return Object.assign({}, state, {
      filteredAssignments: action.filter
    });
  }
  return state;
};