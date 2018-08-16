
import {FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR} from '../actions/GET/fetchCategories';
import { EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_ERROR } from '../actions/PUT/editCategoryValues';

const initialState = {
  categories: [],
  error: null
};

export default function categoriesCRUDReducer(state=initialState, action){
  //get all
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
  //edit
  else if(action.type===EDIT_CATEGORY_SUCCESS){
    console.log(action);
    const indexToUpdate = state.categories.findIndex(category => {
      return category.id ===action.category.id;
    });
    const updatedCategories = [...state.categories];
    state.categories[indexToUpdate] = action.category;
    return Object.assign({}, state, {
      categories: updatedCategories
    });
  }
  else if(action.type===EDIT_CATEGORY_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}