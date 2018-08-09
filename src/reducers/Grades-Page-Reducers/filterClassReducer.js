import { FILTER_CLASS } from '../../actions/Grades-Page-Actions/filterClass';

const initialState = {
  assignments:[],
  students:[]
};

export default (state=initialState, action) => {
  if(action.type === FILTER_CLASS){
    Object.assign({}, state, {
      assignments: state.assignments.filter(assignment => assignment.classId===action.filter),
      students: state.students.filter(student => student.classes.includes(action.filter))
    });
  }
};