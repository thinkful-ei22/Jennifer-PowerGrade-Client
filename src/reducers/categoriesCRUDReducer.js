
import {FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR, FETCH_CATEGORIES_REQUEST} from '../actions/GET/fetchCategories';
import { EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_ERROR, EDIT_CATEGORY_REQUEST } from '../actions/PUT/editCategoryValues';

const initialState = {
  categories: [],
  error: null,
  loading: false
};

export default function categoriesCRUDReducer(state=initialState, action){
  //get all
  if(action.type===FETCH_CATEGORIES_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      categories: action.categories,
      loading: false
    });
  }
  else if(action.type===FETCH_CATEGORIES_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  //edit
  else if(action.type===EDIT_CATEGORY_SUCCESS){
    const indexToUpdate = state.categories.findIndex(category => {
      return category.id ===action.category.id;
    });
    const updatedCategories = [...state.categories];
    state.categories[indexToUpdate] = action.category;
    return Object.assign({}, state, {
      categories: updatedCategories,
      loading: false
    });
  }
  else if(action.type===EDIT_CATEGORY_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type === FETCH_CATEGORIES_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === EDIT_CATEGORY_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  return state;
}