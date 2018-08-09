import {FETCH_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENT_ERROR} from '../../actions/Assignment-Page-Actions/assignmentList';

const initialState = {
  assignments: [],
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_ASSIGNMENT_SUCCESS){
    console.log('this is the action', action);
    return Object.assign({}, state, {
      error: null,
      assignments: action.assignmentInfo
    });
  }
  else if(action.type===FETCH_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};