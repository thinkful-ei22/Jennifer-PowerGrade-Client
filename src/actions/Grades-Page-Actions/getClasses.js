import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../utils';

export const FETCH_CLASSES_SUCCESS='FETCH_CLASSES_SUCCESS';
export const fetchClassesSuccess= classes => ({
  type: FETCH_CLASSES_SUCCESS,
  classes
});
export const FETCH_CLASSES_ERROR='FETCH_CLASSES_ERROR';
export const fetchClassesError= error => ({
  type: FETCH_CLASSES_ERROR,
  error
});

export const fetchClasses = () => (dispatch,getState) => {
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/classes`, {
    method: 'GET',
    headers: {
      Authorization:`Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((classes) => dispatch(fetchClassesSuccess(classes)))
    .catch(err => {
      dispatch(fetchClassesError(err));
    });
};