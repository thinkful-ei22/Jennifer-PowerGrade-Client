import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../utils';

// export const FETCH_GRADES_REQUEST='FETCH_GRADES_REQUEST';
// export const fetchGradessRequest = () => ({
//   type: FETCH_GRADES_REQUEST
// });
export const FETCH_GRADES_SUCCESS='FETCH_GRADES_SUCCESS';
export const fetchGradessSuccess= grades => ({
  type: FETCH_GRADES_SUCCESS,
  grades
});
export const FETCH_GRADES_ERROR='FETCH_GRADES_ERROR';
export const fetchGradessError= error => ({
  type: FETCH_GRADES_ERROR,
  error
});

export const fetchGrades = () => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/grades`, {
    method: 'GET',
    headers: {
      Authorization:`Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((students) => dispatch(fetchGradessSuccess(students)))
    .catch(err => {
      dispatch(fetchGradessError(err));
    });
};
