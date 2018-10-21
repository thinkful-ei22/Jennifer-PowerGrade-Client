import {API_BASE_URL} from '../../config';
import { deleteGrade } from './deleteGrade';

export const DELETE_ASSIGNMENT_SUCCESS = 'DELETE_ASSIGNMENT_SUCCESS';
export const deleteAssignmentSuccess = () => ({
  type: DELETE_ASSIGNMENT_SUCCESS
});

export const DELETE_ASSIGNMENT_ERROR = 'DELETE_ASSIGNMENT_ERROR';
export const deleteAssignmentError = error => ({
  type: DELETE_ASSIGNMENT_ERROR,
  error
});

export const deleteAssignment = (assignmentId) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/assignments/${assignmentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }})
    // .then(res => res.json())
    .then(res => dispatch(deleteAssignmentSuccess(res)))
    .catch(err => dispatch(deleteAssignmentError(err)));
};