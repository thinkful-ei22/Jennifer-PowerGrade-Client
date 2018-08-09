import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import { fetchAssignments } from '../../actions/Assignment-Page-Actions/assignmentList';
import { fetchStudents } from '../../actions/Dashboard-Page-Actions/studentList';
import {fetchGrades} from '../../actions/Grades-Page-Actions/getGrades';
import { fetchClasses } from '../../actions/Grades-Page-Actions/getClasses';

class GradeDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
    this.props.dispatch(fetchStudents());
    this.props.dispatch(fetchGrades());
    this.props.dispatch(fetchClasses());
  }
  getValue(assignment, student){
    if(this.props.grades){
      const grade = this.props.grades.find(grade => grade.studentId.id === student.id && assignment.id === grade.assignmentId.id);
      if(grade){
        return grade.value;
      }else{
        return '-';
      }
    }
  }
  render(){
    const currentClasses = this.props.classes.filter(classItem => classItem.userId === this.props.currentUser.id);
    const currentAssignments = this.props.assignments.filter(assignment => assignment.userId === this.props.currentUser.id);
    // console.log(currentClasses.map(classItem => classItem.students));

    (this.props.students.map(student => student.teachers+'').filter(teacher => teacher.includes(this.props.currentUser.id)));
    const teachers = this.props.students.map(student=> student.teachers);
    const filteredTeachers = teachers.map(teacher=> teacher+'');
    const currentTeacher = filteredTeachers.filter(teacher => teacher.includes(this.props.currentUser.id))[0];
    const assignmentRows=currentAssignments.map((assignment, i) => (
      <th key={i}>{assignment.name}</th>
    ));
    const studentCells=this.props.students.map((student, i) =>{
      const assignmentsList = currentAssignments.map((assignment, i) => {
        return <td contenteditable="true" key={i}>{this.getValue(assignment, student)}</td>;      
      });
      assignmentsList.unshift(<td key="average">Weighted Average Goes Here</td>);
      assignmentsList.unshift(<td key="studentName">{`${student.lastName}, ${student.firstName}`}</td>);

      return (<tr key={i}>
        {assignmentsList}
      </tr>);
    });
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
    assignments: state.assignmentReducer.assignments,
    students: state.studentListReducer.students,
    grades: state.fetchGradesReducer.grades,
    classes: state.fetchClassesReducer.classes,
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradeDisplay));