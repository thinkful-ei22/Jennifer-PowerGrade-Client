import {API_BASE_URL} from '../../config';

export const CREATE_CLASS_REQUEST = 'CREATE_CLASS_REQUEST';
export const createClassRequest = () => ({
  type: CREATE_CLASS_REQUEST,
});

export const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
export const createClassSuccess = (classInfo) => ({
  type: CREATE_CLASS_SUCCESS,
  classInfo
});

export const CREATE_CLASS_ERROR = 'CREATE_CLASS_ERROR';
export const createClassError = error => ({
  type: CREATE_CLASS_ERROR,
  error
});

export const createClass = (name, userId, students) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(createClassRequest());
  return fetch(`${API_BASE_URL}/api/classes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name,
      userId,
      students
    })
  })
    .then( body => {
      return body;
    })
    .then(res => res.json())
    .then(res => dispatch(createClassSuccess(res)))
    .catch(err => dispatch(createClassError(err)));
};