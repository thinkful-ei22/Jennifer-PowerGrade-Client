import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../utils';

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
  const assignments = getState().fetchAssignmentsReducer.assignments;   
  const filtering = assignments.filter(assignment => assignment.classes.includes(filter));
  if(filter===0){
    dispatch(fetchAssignmentsSuccess(assignments));
  }else {
    dispatch(filteredAssignments(filtering));
  }
};

export const fetchAssignments = () => (dispatch, getState) => {
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
