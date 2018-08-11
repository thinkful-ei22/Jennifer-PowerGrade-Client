import {API_BASE_URL} from '../../config';

export const CREATE_GRADE_REQUEST = 'CREATE_GRADE_REQUEST';
export const createGradeRequest = () => ({
  type: CREATE_GRADE_REQUEST,
});

export const CREATE_GRADE_SUCCESS = 'CREATE_GRADE_SUCCESS';
export const createGradeSuccess = (gradeInfo) => ({
  type: CREATE_GRADE_SUCCESS,
  gradeInfo
});

export const CREATE_GRADE_ERROR = 'CREATE_GRADE_ERROR';
export const createGradeError = error => ({
  type: CREATE_GRADE_ERROR,
  error
});

export const createGrade = (value, studentId, assignmentId, classId) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(createGradeRequest());
  return fetch(`${API_BASE_URL}/api/grades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      value,
      studentId,
      assignmentId,
      classId
    })
  })
    .then( body => {
      return body;
    })
    .then(res => dispatch(createGradeSuccess(res)))
    .catch(err => dispatch(createGradeError(err)));
};