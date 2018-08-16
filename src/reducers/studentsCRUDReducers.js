import {FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_ERROR} from '../actions/GET/fetchStudents';
import { CREATE_CLASS_SUCCESS } from '../actions/POST/createClass';

const initialState = {
  students: [],
  error: null
};

export default function studentsCRUDReducer(state=initialState, action) {
//GET all students
  if(action.type===FETCH_STUDENTS_SUCCESS){
    return Object.assign({}, state, {
      error: null,
      students: action.students
    });
  }
  else if(action.type===FETCH_STUDENTS_ERROR){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if(action.type===CREATE_CLASS_SUCCESS){
    const newClassId = action.classInfo.id;
    const studentsInClass = action.classInfo.students;
    const updatedClassList = state.students.map(student => {
      if(studentsInClass.includes(student.id)){
        student.grades = [...student.grades, newClassId];
      }
      return student;
    });
    return Object.assign({}, state, {
      students: updatedClassList
    });
  }
  return state;
}