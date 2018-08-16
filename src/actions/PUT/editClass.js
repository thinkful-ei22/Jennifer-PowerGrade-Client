import {API_BASE_URL} from '../../config';

export const ADD_CLASS_STUDENT = 'ADD_CLASS_STUDENT';
export const addClassStudent = (student) => ({
  type: ADD_CLASS_STUDENT,
  student
});

export const REMOVE_CLASS_STUDENT = 'REMOVE_CLASS_STUDENT';
export const removeClassStudent = (student) => ({
  type: REMOVE_CLASS_STUDENT,
  student
});

export const EDIT_CLASS_REQUEST = 'EDIT_CLASS_REQUEST';
export const editClassRequest = () => ({
  type: EDIT_CLASS_REQUEST
});

export const EDIT_CLASS_SUCCESS = 'EDIT_CLASS_SUCCESS';
export const editClassSuccess = currentClass => ({
  type: EDIT_CLASS_SUCCESS,
  currentClass
});

export const EDIT_CLASS_ERROR = 'EDIT_CLASS_ERROR';
export const editClassError = error => ({
  type: EDIT_CLASS_ERROR,
  error
});

export const editClass = (id, name, students, assignments, userId) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(editClassRequest(id));
  return fetch(`${API_BASE_URL}/api/classes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      name,
      students,
      assignments,
      userId
    })
  })
    .then(res => {
      return res.json();
    })
    .then(res => 
      dispatch(editClassSuccess(res))
    )
    .catch(err => 
      dispatch(editClassError(err))
    );
};