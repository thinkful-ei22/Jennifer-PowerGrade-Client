const API_BASE_URL = 'http://commonstandardsproject.com/api/v1/';
const API_KEY = 'NWELvHTNeuUGe8BasEStQqvt';

export const FETCH_STATES_REQUEST = 'FETCH_STATES_REQUEST';
export const fetchStatesRequest = () => ({
  type: FETCH_STATES_REQUEST
});

export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const fetchStatesSuccess = (states) => ({
  type: FETCH_STATES_SUCCESS,
  states
});

export const FETCH_STATES_ERROR = 'FETCH_STATES_ERROR';
export const fetchStatesError = (error) => ({
  type: FETCH_STATES_ERROR,
  error
});

export const FETCH_STANDARDS_REQUEST = 'FETCH_STANDARDS_REQUEST';
export const fetchStandardssRequest = () => ({
  type: FETCH_STANDARDS_REQUEST
});

export const FETCH_STANDARDS_SUCCESS = 'FETCH_STANDARDS_SUCCESS';
export const fetchStandardsSuccess = (standards) => ({
  type: FETCH_STANDARDS_SUCCESS,
  standards
});

export const FETCH_STANDARDS_ERROR = 'FETCH_STANDARDS_ERROR';
export const fetchStandardsError = (error) => ({
  type: FETCH_STANDARDS_ERROR,
  error
});

export const fetchStates = () => (dispatch) => {
  return fetch(`${API_BASE_URL}/jurisdictions`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Api-Key': API_KEY,
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  })
    .then(res=>res.json())
    .then((states) => dispatch(fetchStatesSuccess(states)))
    .catch(err => {
      dispatch(fetchStatesError(err));
    });
};
