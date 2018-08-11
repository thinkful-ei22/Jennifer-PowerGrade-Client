
import {FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR} from '../actions/GET/fetchCategories';

const initialState = {
  categories: [],
  error: null
};

export default (state=initialState, action) =>{
  if(action.type===FETCH_CATEGORIES_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      categories: action.categories
    });
  }
  else if(action.type===FETCH_CATEGORIES_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};