import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchGrades} from '../../actions/GET/fetchGrades';
import {fetchStudents} from '../../actions/GET/fetchStudents';
import {fetchClasses} from '../../actions/GET/fetchClasses';
import {editGrade} from '../../actions/PUT/editGrade';
import '../componentStyles.css';
import '../componentMobileStyles.css';

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
        return grade;
      }else{
        return {value:'-'};
      }
    }
  }
  getAssignmentAverage(assignment){
    if(this.props.grade){
      const grade = this.props.grades.filter(grade=> grade.assignmentId.id===assignment.id);
      const gradeValues = grade.map(grade => grade.value);
      let total = 0;
      for(let i=0; i<gradeValues.length; i++){
        console.log('this is the value=', gradeValues[i]);
        console.log('total=', total);
        return total + gradeValues[i];
      }
      let averageGrade = total/gradeValues.length;
      console.log('this is average grade=', averageGrade);
      return averageGrade;
    }
    else{
      return '-';
    }
  }
  onGradeChange(e, editedGrade){
    editedGrade.value =e.target.innerHTML;
    this.props.dispatch(editGrade(editedGrade));
  }
  render(){
    const currentStudents =this.props.filteredClasses.map(item => item.students.map(student => student));
    const currentClasses = this.props.filteredClasses.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const assignmentList = currentClasses.map(classItem => classItem.assignments.map(assignment => assignment));
    const assignmentRows = assignmentList.map((assignment => assignment.map(name => <th key={name.name}>{name.name}</th>)));
    const averageCells = assignmentList.map(assignment => assignment.map(assignment => <td key={assignment.id}>{this.getAssignmentAverage(assignment)}</td>));
    const studentCells=currentStudents.map(students => students.map(student =>{
      const assignments = assignmentList.map((assignment) => {
        return assignment.map(name => {
          const grade = this.getValue(name, student);
          return (<td contentEditable="true" id={grade.id} onInput={(e) => this.onGradeChange(e, grade)} key={name.id}>
            {this.getValue(name, student).value*100}
          </td>);
        });
      });
      assignments.unshift(<td key="average">Weighted Average Goes Here</td>);
      assignments.unshift(<td key="studentName">{`${student.lastName}, ${student.firstName}`}</td>);
      return (
        <tr key={student.id}>
          {assignments}
        </tr>);
    }));
    return (
      <table className="grades-table">
        <tbody>
          <tr>
            <th>Students</th>
            <th>Overall Grade</th>
            {assignmentRows}
          </tr>
          {studentCells}
          <tr>
            <td></td>
            <td></td>
            {averageCells}
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.loginReducer.currentUser,
    grades: state.gradesCRUDReducer.grades,
    classes: state.classesCRUDReducer.classes,
    filteredClasses: state.classesCRUDReducer.filteredClasses,
    students: state.studentsCRUDReducer.students
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradeDisplay));