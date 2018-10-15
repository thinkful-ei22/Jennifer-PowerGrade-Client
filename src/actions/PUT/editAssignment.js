import {API_BASE_URL} from '../../config';

export const ADD_ASSIGNMENT_CLASS = 'ADD_ASSIGNMENT_CLASS';
export const addAssignmentClass = (classItem) => ({
  type: ADD_ASSIGNMENT_CLASS,
  classItem
});

export const REMOVE_ASSIGNMENT_CLASS= 'REMOVE_ASSIGNMENT_CLASS';
export const removeAssignmentClass = (classItem) => ({
  type: REMOVE_ASSIGNMENT_CLASS,
  classItem
});

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

export const editAssignment = (id, name, date, userId, classes, categoryId, grades) => (dispatch, getState) => {
  dispatch(editAssignmentRequest(id));
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/assignments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      date,
      userId,
      classes,
      categoryId,
      grades
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