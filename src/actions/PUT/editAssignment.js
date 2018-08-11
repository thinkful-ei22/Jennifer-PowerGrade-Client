import {API_BASE_URL} from '../../config';

export const EDIT_ASSIGNMENT_REQUEST = 'EDIT_ASSIGNMENT_REQUEST';
export const editAssignmentRequest = () => ({
  type: EDIT_ASSIGNMENT_REQUEST
});

export const EDIT_ASSIGNMENT_SUCCESS = 'EDIT_ASSIGNMENT_SUCCESS';
export const editAssignmentSuccess = currentAssignment => ({
  type: EDIT_ASSIGNMENT_SUCCESS,
  currentAssignment
});

export const EDIT_ASSIGNMENT_ERROR = 'EDIT_ASSIGNMENT_ERROR';
export const editAssignmentError = error => ({
  type: EDIT_ASSIGNMENT_ERROR,
  error
});

export const editAssignment = (id, name, categoryId, date) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(editAssignmentRequest(id));
  return fetch(`${API_BASE_URL}/api/assignments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      categoryId,
      date
    })
  })
    .then(res => {
      return res.json();
    })
    .then(res => 
      dispatch(editAssignmentSuccess(res))
    )
    .catch(err => 
      dispatch(editAssignmentError(err))
    );
};