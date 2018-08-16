import {API_BASE_URL} from '../../config';

export const CREATE_ASSIGNMENT_REQUEST = 'CREATE_ASSIGNMENT_REQUEST';
export const createAssignmentRequest = () => ({
  type: CREATE_ASSIGNMENT_REQUEST,
});

export const CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS';
export const createAssignmentSuccess = (assignmentInfo) => ({
  type: CREATE_ASSIGNMENT_SUCCESS,
  assignmentInfo
});

export const CREATE_ASSIGNMENT_ERROR = 'CREATE_ASSIGNMENT_ERROR';
export const createAssignmentError = error => ({
  type: CREATE_ASSIGNMENT_ERROR,
  error
});

export const createAssignment = (name, date, classes, userId, categoryId) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(createAssignmentRequest());
  return fetch(`${API_BASE_URL}/api/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name,
      date,
      classes,
      userId,
      categoryId
    })
  })
    .then((res)=> {
      if(!res.ok){
        return dispatch(createAssignmentError(res));
      }
      return res.json();
    })
    .then(res => dispatch(createAssignmentSuccess(res)))
    .catch(err => dispatch(createAssignmentError(err)));
};
