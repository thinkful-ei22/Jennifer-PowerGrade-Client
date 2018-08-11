import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchGrades} from '../../actions/Grades-Page-Actions/fetchGrades';
import {fetchStudents} from '../../actions/Dashboard-Page-Actions/fetchStudents';
import {fetchClasses} from '../../actions/Grades-Page-Actions/fetchClasses';

class GradeDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchGrades());
    this.props.dispatch(fetchClasses());
    this.props.dispatch(fetchStudents());
  }
  getValue(assignment, student){
    if(this.props.grades){
      const grade = this.props.grades.find(grade=>grade.studentId.id===student.id && grade.assignmentId.id===assignment.id);
      if(grade){
        return grade.value;
      }else{
        return '-';
      }
    }
  }
  // getAssignmentAverage(assignment){
  //   if(this.props.grades){
  //     const grade = this.props.grades.find(grade=> grade.assignmentId.id===assignment.id);
  //     if(grade){
  //       return grade.value;
  //     }else{
  //       return '-';
  //     }
  //   }
  // }

  render(){
    const currentStudents =this.props.filteredClasses.map(item => item.students.map(student => student));
    const currentClasses = this.props.filteredClasses.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const assignmentList = currentClasses.map(classItem => classItem.assignments.map(assignment => assignment));
    const assignmentRows = assignmentList.map((assignment => assignment.map(name => <th key={name.name}>{name.name}</th>)));

    const studentCells=currentStudents.map(students => students.map(student =>{
      const assignments = assignmentList.map((assignment) => {
        return assignment.map(name => <td key={name.id}>{this.getValue(name, student)}</td>);
      });
      assignments.unshift(<td key="average">Weighted Average Goes Here</td>);
      assignments.unshift(<td key="studentName">{`${student.lastName}, ${student.firstName}`}</td>);
      return (
        <tr key={student.id}>
          {assignments}
        </tr>);
    }));
    return (
      <table>
        <tbody>
          <tr>
            <th>Students</th>
            <th>Overall Grade</th>
            {assignmentRows}
          </tr>
          {studentCells}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.loginReducer.currentUser,
    grades: state.fetchGradesReducer.grades,
    classes: state.fetchClassesReducer.classes,
    filteredClasses: state.fetchClassesReducer.filteredClasses,
    students: state.fetchStudentsReducer.students
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradeDisplay));