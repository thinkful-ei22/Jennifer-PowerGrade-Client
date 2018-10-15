import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../OTHER/utils';

export const FETCH_STUDENTS_REQUEST='FETCH_STUDENTS_REQUEST';
export const fetchStudentsRequest= () => ({
  type: FETCH_STUDENTS_REQUEST
});
export const FETCH_STUDENTS_SUCCESS='FETCH_STUDENTS_SUCCESS';
export const fetchStudentsSuccess= students => ({
  type: FETCH_STUDENTS_SUCCESS,
  students
});
export const FETCH_STUDENTS_ERROR='FETCH_STUDENTS_ERROR';
export const fetchStudentsError= error => ({
  type: FETCH_STUDENTS_ERROR,
  error
});

export const fetchStudents = () => (dispatch,getState) => {
  dispatch(fetchStudentsRequest());
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/students`, {
    method: 'GET',
    headers: {
      Authorization:`Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((students) => dispatch(fetchStudentsSuccess(students)))
    .catch(err => {
      dispatch(fetchStudentsError(err));
    });
};