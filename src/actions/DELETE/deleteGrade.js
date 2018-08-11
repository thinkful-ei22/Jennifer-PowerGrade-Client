import {API_BASE_URL} from '../../config';

export const DELETE_GRADE_SUCCESS = 'DELETE_GRADE_SUCCESS';
export const deleteGradeSuccess = () => ({
  type: DELETE_GRADE_SUCCESS
});

export const DELETE_GRADE_ERROR = 'DELETE_GRADE_ERROR';
export const deleteGradeError = error => ({
  type: DELETE_GRADE_ERROR,
  error
});

export const deleteGrade = gradeId => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/grades/${gradeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }})
    .then(res => {return res.json();})
    .then(res => dispatch(deleteGradeSuccess(res)))
    .catch(err => dispatch(deleteGradeError(err)));
};