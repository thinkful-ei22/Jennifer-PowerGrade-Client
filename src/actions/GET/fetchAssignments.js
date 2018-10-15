import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../OTHER/utils';

export const FETCH_ASSIGNMENT_REQUEST='FETCH_ASSIGNMENT_REQUEST';
export const fetchAssignmentsRequest= () => ({
  type: FETCH_ASSIGNMENT_REQUEST,
});
export const FETCH_ASSIGNMENT_SUCCESS='FETCH_ASSIGNMENT_SUCCESS';
export const fetchAssignmentsSuccess= assignmentInfo => ({
  type: FETCH_ASSIGNMENT_SUCCESS,
  assignmentInfo
});
export const FETCH_ASSIGNMENT_ERROR='FETCH_ASSIGNMENT_ERROR';
export const fetchAssignmentsError= error => ({
  type: FETCH_ASSIGNMENT_ERROR,
  error
});

export const FILTER_ASSIGNMENTS = 'FILTER_ASSIGNMENTS';
export const filteredAssignments = filter => ({
  type: FILTER_ASSIGNMENTS,
  filter
});

export const filterAssignments = (filter) => (dispatch, getState) => {
  const assignments = getState().assignmentCRUDReducer.assignments;   
  const filtering = assignments.filter(assignment => assignment.classes.includes(filter));
  if(filter==='0'){
    dispatch(fetchAssignmentsSuccess(assignments));
  }else {
    dispatch(filteredAssignments(filtering));
  }
};

export const SEARCH_ASSIGNMENT_REQUEST='SEARCH_ASSIGNMENT_REQUEST';
export const searchAssignmentsRequest= () => ({
  type: SEARCH_ASSIGNMENT_REQUEST,
});

export const SEARCH_ASSIGNMENTS_SUCCESS = 'SEARCH_ASSIGNMENTS_SUCCESS';
export const searchAssignmentsSuccess = searchTerm => ({
  type: SEARCH_ASSIGNMENTS_SUCCESS,
  searchTerm
});

export const SEARCH_ASSIGNMENTS_ERROR = 'SEARCH_ASSIGNMENTS_ERROR';
export const searchAssignmentsError = error => ({
  type: SEARCH_ASSIGNMENTS_ERROR,
  error
});

export const searchAssignmentFilter = searchTerm => (dispatch, getState) => {
  dispatch(searchAssignmentsRequest());
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/assignments/?searchTerm=${searchTerm}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(res => 
      dispatch(searchAssignmentsSuccess(res)) 
    )
    .catch(err =>
      dispatch(searchAssignmentsError(err))
    );
};
export const fetchAssignments = () => (dispatch, getState) => {
  dispatch(fetchAssignmentsRequest());
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/assignments`, {
    method: 'GET',
    headers: {
      Authorization:`Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((assignments) => dispatch(fetchAssignmentsSuccess(assignments)))
    .catch(err => {
      dispatch(fetchAssignmentsError(err));
    });
};

export const FETCH_ONE_ASSIGNMENT_REQUEST = 'FETCH_ONE_ASSIGNMENT_REQUEST';
export const fetchOneAssignmentRequest = () => ({
  type: FETCH_ONE_ASSIGNMENT_REQUEST,
});

export const FETCH_ONE_ASSIGNMENT_SUCCESS = 'FETCH_ONE_ASSIGNMENT_SUCCESS';
export const fetchOneAssignmentSuccess = currentAssignment => ({
  type: FETCH_ONE_ASSIGNMENT_SUCCESS,
  currentAssignment
});

export const FETCH_ONE_ASSIGNMENT_ERROR = 'FETCH_ONE_ASSIGNMENT_ERROR';
export const fetchOneAssignmentError = error => ({
  type: FETCH_ONE_ASSIGNMENT_ERROR,
  error
});

export const fetchOneAssignment = (id) => (dispatch, getState) => {
  dispatch(fetchOneAssignmentRequest());
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/assignments/${id}`, {
    method: 'GET',
    headers: {
      Authorization:`Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((currentAssignment) => dispatch(fetchOneAssignmentSuccess(currentAssignment)))
    .catch(err => {
      dispatch(fetchOneAssignmentError(err));
    });
};