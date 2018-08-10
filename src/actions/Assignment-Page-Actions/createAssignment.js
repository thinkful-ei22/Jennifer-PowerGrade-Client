import {API_BASE_URL} from '../../config';

//add class to classes collection
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

export const createAssignment = (name, categoryId, classId, date) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(createAssignmentRequest());
  return fetch(`${API_BASE_URL}/api/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name: name,
      categoryId: categoryId,
      classes: [classId],
      date: date
    })
  })
    .then( body => {
      console.log('this is the body', body);
      return body;
    })
    .then(res => dispatch(createAssignmentSuccess(res)))
    .catch(err => dispatch(createAssignmentError(err)));
};
