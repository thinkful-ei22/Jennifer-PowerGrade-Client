import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../utils';

// export const FETCH_ASSIGNMENT_REQUEST='FETCH_ASSIGNMENT_REQUEST';
// export const fetchAssignmentsRequest = () => ({
//   type: FETCH_ASSIGNMENT_REQUEST
// });
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