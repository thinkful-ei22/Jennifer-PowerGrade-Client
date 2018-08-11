import {API_BASE_URL} from '../../config';

export const CREATE_CLASS_REQUEST = 'CREATE_CLASS_REQUEST';
export const createClassRequest = () => ({
  type: CREATE_CLASS_REQUEST,
});

export const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
export const createClassSuccess = (classInfo) => ({
  type: CREATE_CLASS_SUCCESS,
  classInfo
});

export const CREATE_CLASS_ERROR = 'CREATE_CLASS_ERROR';
export const createClassError = error => ({
  type: CREATE_CLASS_ERROR,
  error
});

export const createClass = (className, studentIds) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(createClassRequest());
  return fetch(`${API_BASE_URL}/api/classes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name: className,
      students: studentIds
    })
  })
    .then( body => {
      return body;
    })
    .then(res => dispatch(createClassSuccess(res)))
    .catch(err => dispatch(createClassError(err)));
};

// //add classId to students' class lists
// export const ADD_STUDENT_CLASS_REQUEST = 'ADD_STUDENT_CLASS_REQUEST';
// export const addStudentClassRequest = classId => ({
//   type: ADD_STUDENT_CLASS_REQUEST,
//   classId
// });
// export const ADD_STUDENT_CLASS_SUCCESS = 'ADD_STUDENT_CLASS_SUCCESS';
// export const addStudentClassSuccess = classId => ({
//   type: ADD_STUDENT_CLASS_SUCCESS,
//   classId
// });
// export const ADD_STUDENT_CLASS_ERROR = 'ADD_STUDENT_CLASS_ERROR';
// export const addStudentClassError = err => ({
//   type: ADD_STUDENT_CLASS_ERROR,
//   err
// });
// //add classId to teachers' class lists
// export const ADD_USER_CLASS_REQUEST = 'ADD_STUDENT_CLASS_REQUEST';
// export const addUserClassRequest = classId => ({
//   type: ADD_USER_CLASS_REQUEST,
//   classId
// });
// export const ADD_USER_CLASS_SUCCESS = 'ADD_STUDENT_CLASS_SUCCESS';
// export const addUserClassSuccess = classId => ({
//   type: ADD_USER_CLASS_SUCCESS,
//   classId
// });
// export const ADD_USER_CLASS_ERROR = 'ADD_STUDENT_CLASS_ERROR';
// export const addUserClassError = err => ({
//   type: ADD_USER_CLASS_ERROR,
//   err
// });