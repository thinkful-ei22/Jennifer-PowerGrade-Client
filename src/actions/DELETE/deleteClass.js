import {API_BASE_URL} from '../../config';

export const DELETE_CLASS_SUCCESS = 'DELETE_CLASS_SUCCESS';
export const deleteClassSuccess = () => ({
  type: DELETE_CLASS_SUCCESS
});

export const DELETE_CLASS_ERROR = 'DELETE_CLASS_ERROR';
export const deleteClassError = error => ({
  type: DELETE_CLASS_ERROR,
  error
});

export const deleteClass = classId => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/classes/${classId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }})
    .then(res => {return res.json();})
    .then(res => dispatch(deleteClassSuccess(res)))
    .catch(err => dispatch(deleteClassError(err)));
};