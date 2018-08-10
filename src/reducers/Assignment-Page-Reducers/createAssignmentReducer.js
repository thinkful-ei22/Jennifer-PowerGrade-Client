import {
//should update classes as well
  CREATE_ASSIGNMENT_ERROR,
  CREATE_ASSIGNMENT_REQUEST,
  CREATE_ASSIGNMENT_SUCCESS} from '../../actions/Assignment-Page-Actions/createAssignment';
  
const initialState = {
  loading:false,
  error: null,
  categoryId: '',
  assignmentName: '',
  classes: [],
  assignmentDate:''
};
  
export default function createAssignmentReducer(state = initialState, action) {
  if(action.type === CREATE_ASSIGNMENT_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }else if(action.type === CREATE_ASSIGNMENT_SUCCESS) {
    return Object.assign({}, state, {
      assignmentName: action.assignmentInfo.name,
      categoryId: action.assignmentInfo.categoryId,
      classes: action.assignmentInfo.classes,
      assignmentDate: action.assignmentInfo.assignmentDate,
      loading: false,
      error: null
    });
  }else if(action.type === CREATE_ASSIGNMENT_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}