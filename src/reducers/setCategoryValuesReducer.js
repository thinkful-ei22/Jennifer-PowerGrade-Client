import {SET_TEST_VALUE, SET_QUIZ_VALUE, SET_CLASSWORK_VALUE, SET_HOMEWORK_VALUE,} from '../../actions/Dashboard-Page-Actions/setCategoryValues';

const initialState = {
  testValue: 0,
  quizValue: 0,
  classWorkValue: 0,
  homeworkValue: 0
};

export default (state=initialState, action) => {
  if(action.type===SET_TEST_VALUE){
    return Object.assign({}, state,{
      testValue: action.value/100
    });
  }
  else if(action.type===SET_QUIZ_VALUE){
    return Object.assign({}, state,{
      quizValue: action.value/100
    });
  }
  else if(action.type===SET_CLASSWORK_VALUE){
    return Object.assign({}, state,{
      classworkValue: action.value/100
    });
  }
  else if(action.type===SET_HOMEWORK_VALUE){
    return Object.assign({}, state,{
      homeworkValue: action.value/100
    });
  }
};