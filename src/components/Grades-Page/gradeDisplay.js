import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchGrades} from '../../actions/Grades-Page-Actions/getGrades';
import { fetchClasses } from '../../actions/Grades-Page-Actions/getClasses';

class GradeDisplay extends React.Component {
  componentDidMount(){
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
  makeStudentList(student){
    const studentList = [];
    for(let i=0; i<=student.length; i++){
      return studentList.push(student[i]);
    }
    return studentList;
  }
  render(){
    const currentClasses = this.props.classes.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const assignmentList = currentClasses.map(classItem => classItem.assignments.map(assignment => assignment.name));
    const studentNames = currentClasses.map(classitem => classitem.students.map(student => `${student.lastName}, ${student.firstName}`));
    console.log(this.makeStudentList(studentNames[0]));
    const assignmentRows = assignmentList.map((assignment => assignment.map(name => <th key={name}>{name}</th>)));

    const studentCells=studentNames.map((student, i) =>{
      const assignments = assignmentList.map((assignment, i) => {
        return <td /* contentEditable="true" */ key={i}>{this.getValue(assignment, student)}</td>;      
      });
      assignments.unshift(<td key="average">Weighted Average Goes Here</td>);
      assignments.unshift(<td key="studentName">{`${student}`}</td>);

      return (<tr key={i}>
        {assignments}
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
    grades: state.fetchGradesReducer.grades,
    classes: state.fetchClassesReducer.classes,
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradeDisplay));