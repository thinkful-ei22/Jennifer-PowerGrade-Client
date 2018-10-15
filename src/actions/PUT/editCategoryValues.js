import {API_BASE_URL} from '../../config';
import { fetchCategoriesRequest } from '../GET/fetchCategories';

export const EDIT_CATEGORY_REQUEST = 'EDIT_CATEGORY_REQUEST';
export const editCategoryRequest = () => ({
  type: EDIT_CATEGORY_REQUEST
});

export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const editCategorySuccess = (category) => ({
  type: EDIT_CATEGORY_SUCCESS,
  category
});

export const EDIT_CATEGORY_ERROR = 'EDIT_CATEGORY_ERROR';
export const editCategoryError = (error) => ({
  type: EDIT_CATEGORY_ERROR,
  error
});

export const editCategory = (id, name, value) => (dispatch, getState) => {
  dispatch(fetchCategoriesRequest(id));
  const authToken = getState().loginReducer.authToken;
  return fetch(`${API_BASE_URL}/api/categories/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      name,
      value
    })
  })
    .then(res => {
      return res.json();
    })
    .then(res => dispatch(editCategorySuccess(res))
    ).catch(err => dispatch(editCategoryError(err)));
};

