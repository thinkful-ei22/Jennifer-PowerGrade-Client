import {API_BASE_URL} from '../../config';

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

export const editClass = (id, name, assignments, students) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(editClassRequest(id));
  return fetch(`${API_BASE_URL}/api/classes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, 
      assignments, 
      students
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