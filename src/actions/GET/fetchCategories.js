import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../utils';

export const FETCH_CATEGORIES_SUCCESS='FETCH_CATEGORIES_SUCCESS';
export const fetchCategoriesSuccess= categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
});
export const FETCH_CATEGORIES_ERROR='FETCH_CATEGORIES_ERROR';
export const fetchCategoriesError= error => ({
  type: FETCH_CATEGORIES_ERROR,
  error
});

export const fetchCategories = () => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/categories`, {
    method: 'GET',
    headers: {
      Authorization:`Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((students) => dispatch(fetchCategoriesSuccess(students)))
    .catch(err => {
      dispatch(fetchCategoriesError(err));
    });
};
