import {
  // ADD_STUDENT_CLASS_ERROR, 
  // ADD_STUDENT_CLASS_REQUEST,
  // ADD_STUDENT_CLASS_SUCCESS,
  // ADD_USER_CLASS_ERROR,
  // ADD_USER_CLASS_REQUEST,
  // ADD_USER_CLASS_SUCCESS,
  CREATE_CLASS_ERROR,
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS} from '../../actions/Dashboard-Page-Actions/createClass';

const initialState = {
  loading:false,
  error: null,
  classId: '',
  className: '',
  classStudents: [],
  studentClasses: [],
  userClasses: []
};

export default function classReducer(state = initialState, action) {
  if(action.type === CREATE_CLASS_REQUEST) {
    console.log(action);
    return Object.assign({}, state, {
      loading: true
    });
  }else if(action.type === CREATE_CLASS_SUCCESS) {
    console.log(action);
    return Object.assign({}, state, {
      className: action.classInfo.name,
      classStudents: action.classInfo.studentIds,
      classId: action.id,
      loading: false,
      error: null
    });
  }else if(action.type === CREATE_CLASS_ERROR) {
    console.log(action);
    return Object.assign({}, state, {
      error: action.error
    });
  // }else if(action.type === ADD_STUDENT_CLASS_REQUEST){
  //   console.log(action);
  //   return Object.assign({}, state, {
  //     loading: true
  //   });
  // }else if(action.type === ADD_STUDENT_CLASS_SUCCESS){
  //   console.log(action);
  //   return Object.assign({}, state, {
  //     studentClasses: [...state.studentClasses, action.id],
  //     loading: false,
  //     error: null
  //   });
  // }else if(action.type === ADD_STUDENT_CLASS_ERROR){
  //   console.log(action);
  //   return Object.assign({}, state, {
  //     error: action.error
  //   });
  // }else if(action.type === ADD_USER_CLASS_REQUEST){
  //   console.log(action);
  //   return Object.assign({}, state, {
  //     loading: true
  //   });
  // }else if(action.type === ADD_USER_CLASS_SUCCESS){
  //   console.log(action);
  //   return Object.assign({}, state, {
  //     userClasses: [...state.userClasses, action.id],
  //     loading: false,
  //     error: null
  //   });
  // }else if(action.type === ADD_USER_CLASS_ERROR){
  //   console.log(action);
  //   return Object.assign({}, state, {
  //     error: action.error
  //   });
  }
  return state;
}