import { SET_DASHBOARD_DISPLAY } from '../actions/OTHER/displayAction';

const initialState = {
  display: 'none'
};

export default function dashboardReducer(state = initialState, action){
  if(action.type === SET_DASHBOARD_DISPLAY){
    console.log(action);
    return Object.assign({}, state, {
      display: action.display
    });
  }
  return state;
}