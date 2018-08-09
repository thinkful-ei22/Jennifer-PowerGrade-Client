import {API_BASE_URL} from '../../config';

//add class to classes collection
export const CREATE_ASSIGNMENT_REQUEST = 'CREATE_ASSIGNMENT_REQUEST';
export const createAssignmentRequest = () => ({
  type: CREATE_ASSIGNMENT_REQUEST,
});

export const CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS';
export const createAssignmentSuccess = (classInfo) => ({
  type: CREATE_ASSIGNMENT_SUCCESS,
  classInfo
});

export const CREATE_ASSIGNMENT_ERROR = 'CREATE_ASSIGNMENT_ERROR';
export const createAssignmentError = error => ({
  type: CREATE_ASSIGNMENT_ERROR,
  error
});

export const createAssignment = (assignmentName, categoryId, classId, assignmentDate) => (dispatch, getState) => {
  const authToken = getState().loginReducer.authToken;
  dispatch(createAssignmentRequest());
  return fetch(`${API_BASE_URL}/api/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name: assignmentName,
      category: categoryId,
      classes: [classId],
      date: assignmentDate
    })
  })
    .then( body => {
      console.log(body);
      return body;
    })
    .then(res => dispatch(createAssignmentSuccess(res)))
    .catch(err => dispatch(createAssignmentError(err)));
};

// //add classId to students' class lists
// export const ADD_STUDENT_ASSIGNMENT_REQUEST = 'ADD_STUDENT_ASSIGNMENT_REQUEST';
// export const addStudentClassRequest = classId => ({
//   type: ADD_STUDENT_ASSIGNMENT_REQUEST,
//   classId
// });
// export const ADD_STUDENT_ASSIGNMENT_SUCCESS = 'ADD_STUDENT_ASSIGNMENT_SUCCESS';
// export const addStudentClassSuccess = classId => ({
//   type: ADD_STUDENT_ASSIGNMENT_SUCCESS,
//   classId
// });
// export const ADD_STUDENT_ASSIGNMENT_ERROR = 'ADD_STUDENT_ASSIGNMENT_ERROR';
// export const addStudentClassError = err => ({
//   type: ADD_STUDENT_ASSIGNMENT_ERROR,
//   err
// });
// //add classId to teachers' class lists
// export const ADD_USER_ASSIGNMENT_REQUEST = 'ADD_STUDENT_ASSIGNMENT_REQUEST';
// export const addUserClassRequest = classId => ({
//   type: ADD_USER_ASSIGNMENT_REQUEST,
//   classId
// });
// export const ADD_USER_ASSIGNMENT_SUCCESS = 'ADD_STUDENT_ASSIGNMENT_SUCCESS';
// export const addUserClassSuccess = classId => ({
//   type: ADD_USER_ASSIGNMENT_SUCCESS,
//   classId
// });
// export const ADD_USER_ASSIGNMENT_ERROR = 'ADD_STUDENT_ASSIGNMENT_ERROR';
// export const addUserClassError = err => ({
//   type: ADD_USER_ASSIGNMENT_ERROR,
//   err
// });