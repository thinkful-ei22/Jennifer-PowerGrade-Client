import {FETCH_STATES_REQUEST, FETCH_STATES_SUCCESS,FETCH_STATES_ERROR,FETCH_STANDARDS_REQUEST,FETCH_STANDARDS_SUCCESS,FETCH_STANDARDS_ERROR} from '../../actions/Assignment-Page-Actions/fetchStandards';

const initialState = {
  loading: false,
  error: null,
  states:[],
  standards:[]
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_STATES_REQUEST){
    return Object.assign({}, state, {
      error: null,
      loading: true
    });
  }else if(action.type===FETCH_STATES_SUCCESS){
    return Object.assign({}, state, {
      error:null,
      loading: false,
      states: action.states
    });
  }
  else if(action.type===FETCH_STATES_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });
  }
  else if(action.type===FETCH_STANDARDS_REQUEST){
    return Object.assign({}, state, {
      error: null,
      loading: true,
    });
  }
  else if(action.type===FETCH_STANDARDS_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      loading: false,
      standards: action.standards
    });
  }
  else if(action.type===FETCH_STANDARDS_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });
  }
  return state;
};