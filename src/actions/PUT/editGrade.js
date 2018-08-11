import {API_BASE_URL} from '../../config';

export const EDIT_GRADE_REQUEST = 'EDIT_GRADE_REQUEST';
export const editGradeRequest = () => ({
  type: EDIT_GRADE_REQUEST
});

export const EDIT_GRADE_SUCCESS = 'EDIT_GRADE_SUCCESS';
export const editGradeSuccess = currentGrade => ({
  type: EDIT_GRADE_SUCCESS,
  currentGrade
});

export const EDIT_GRADE_ERROR = 'EDIT_GRADE_ERROR';
export const editGradeError = error => ({
  type: EDIT_GRADE_ERROR,
  error
});

export const editGrade = (id, value, studentId, assignmentId, classId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(editGradeRequest(id));
  return fetch(`${API_BASE_URL}/api/grades/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value,
      studentId,
      assignmentId,
      classId
    })
  })
    .then(res => {
      return res.json();
    })
    .then(res => 
      dispatch(editGradeSuccess(res))
    )
    .catch(err => 
      dispatch(editGradeError(err))
    );
};