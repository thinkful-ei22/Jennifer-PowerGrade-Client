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
    if(this.props.grades){
      const grade = this.props.grades.filter(grade=> grade.assignmentId.id===assignment.id);
      const gradeValues = grade.map(grade => grade.value);
      let total = 0;
      for(let i=0; i<gradeValues.length; i++){
        total += gradeValues[i];
        console.log(total);
      }
      let averageGrade = total/gradeValues.length;
      return Math.round(averageGrade*100);
    }
    else{
      return '-';
    }
  }
  onGradeChange(e, editedGrade){
    editedGrade.value =e.target.innerHTML;
    this.props.dispatch(editGrade(editedGrade));
  }
  calculateStudentAverage(student){
    if(this.props.grades){
      const grade = this.props.grades.filter(grade=> grade.studentId===student.id);

      const homework = this.props.categories.filter(category => category.id==='444444444444444444444400');
      const homeworkWeight = homework.value;
      const classwork = this.props.categories.filter(category => category.id==='444444444444444444444401');
      const classworkWeight = classwork.value;
      const quiz = this.props.categories.filter(category => category.id==='444444444444444444444402');
      const quizWeight = quiz.value;
      const test = this.props.categories.filter(category => category.id==='444444444444444444444403');
      const testWeight = test.value;

      let total = 0;
      for(let i=0; i<grade.length; i++){
        if(grade.categoryId === '444444444444444444444400'){
          total+=grade.value*homeworkWeight;
        }
        else if(grade.categoryId === '444444444444444444444401'){
          total+=grade.value*classworkWeight;
        }
        else if(grade.categoryId === '444444444444444444444402'){
          total+=grade.value*quizWeight;
        }
        else if(grade.categoryId === '444444444444444444444403'){
          total+=grade.value*testWeight;
        }
        return total;
      }
    }
    return '-';
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
            <td>Averages</td>
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
    students: state.studentsCRUDReducer.students,
    categoryValues: state.fetchCategoriesReducer.categories
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradeDisplay));