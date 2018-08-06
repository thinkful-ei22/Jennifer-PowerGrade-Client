import {FETCH_ASSIGNMENT_REQUEST, FETCH_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENT_ERROR} from '../actions/test';

const initialState = {
  assignments: [],
  loading: false,
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_ASSIGNMENT_REQUEST){
    return Object.assign({}, state, {loading:true});
  }
  else if(action.type===FETCH_ASSIGNMENT_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      error: null,
      assignments: action.assignments
    });
  }
  else if(action.type===FETCH_ASSIGNMENT_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
};