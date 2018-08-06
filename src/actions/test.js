import {API_BASE_URL} from '../config';

export const FETCH_ASSIGNMENT_REQUEST='FETCH_ASSIGNMENT_REQUEST';
export const fetchAssignmentsRequest = () => ({
  type: FETCH_ASSIGNMENT_REQUEST
});
export const FETCH_ASSIGNMENT_SUCCESS='FETCH_ASSIGNMENT_SUCCESS';
export const fetchAssignmentsSuccess= assignments => ({
  type: FETCH_ASSIGNMENT_SUCCESS,
  assignments
});
export const FETCH_ASSIGNMENT_ERROR='FETCH_ASSIGNMENT_ERROR';
export const fetchAssignmentsError= error => ({
  type: FETCH_ASSIGNMENT_ERROR,
  error
});

export function fetchAssignments(){
  return function(dispatch){
    console.log('Fetching assignments...');
    dispatch(fetchAssignmentsRequest());
    return fetch(`${API_BASE_URL}/api/assignments`)
      .then(res => {
        if(!res.ok) {
          return Promise.reject('Something went wrong');
        }
        return res.json();
      })
      .then(data => {
        dispatch(fetchAssignmentsSuccess(data));
      })
      .catch(err => dispatch(fetchAssignmentsError(err)));
  };
}