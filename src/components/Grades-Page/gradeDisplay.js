import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchGrades} from '../../actions/GET/fetchGrades';
import {fetchStudents} from '../../actions/GET/fetchStudents';
import {fetchClasses} from '../../actions/GET/fetchClasses';
import {editGrade} from '../../actions/PUT/editGrade';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import { fetchCategories } from '../../actions/GET/fetchCategories';
import { fetchAssignments } from '../../actions/GET/fetchAssignments';

export class GradeDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchGrades());
    this.props.dispatch(fetchClasses());
    this.props.dispatch(fetchStudents());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchAssignments());
  }
  getValue(assignment, student){
    if(this.props.grades){
      const validGrades = this.props.grades.filter(grade => grade !== null && grade.assignmentId !==null && grade.studentId !== null);
      const grade = validGrades.find(grade=>grade.studentId._id===student._id && grade.assignmentId._id===assignment._id);
      if(grade){
        return grade;
      }else{
        return {
          studentId: {id: student._id},
          assignmentId: {id: assignment._id},
          value:0
        };
      }
    }
  }
  getAssignmentAverage(assignment){
    if(this.props.grades){
      const grade = this.props.grades.filter(grade=> grade.assignmentId!==null && grade.assignmentId._id===assignment._id);
      const gradeValues = grade.map(grade => grade.value);
      let total = 0;
      for(let i=0; i<gradeValues.length; i++){
        total += gradeValues[i];
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
      const validGrades = this.props.grades.filter(grade => grade !== null && grade.assignmentId !==null && grade.studentId !== null);
      const grade = validGrades.filter(grade=> grade.studentId._id===student._id);
      
      const homework = this.props.categories.filter(category => category._id==='444444444444444444444400');
      const homeworkWeight = homework[0].value;
      
      const classwork = this.props.categories.filter(category => category._id==='444444444444444444444401');
      const classworkWeight = classwork[0].value;
    
      const quiz = this.props.categories.filter(category => category._id==='444444444444444444444402');
      const quizWeight = quiz[0].value;
   
      const test = this.props.categories.filter(category => category._id==='444444444444444444444403');
      const testWeight = test[0].value;
   
      let total = 0;
      if(grade){
        for(let i=0; i<grade.length; i++){
          if(grade[i].assignmentId.categoryId === '444444444444444444444400'){
            total+=(grade[i].value*100)*homeworkWeight;
          }
          if(grade[i].assignmentId.categoryId === '444444444444444444444401'){
            total+=(grade[i].value*100)*classworkWeight;
          }
          if(grade[i].assignmentId.categoryId === '444444444444444444444402'){
            total+=(grade[i].value*100)*quizWeight;
          }
          if(grade[i].assignmentId.categoryId === '444444444444444444444403'){
            total+=(grade[i].value*100)*testWeight;
          }
        }
        return `${Math.round(total)}%`;
      }
      return '-';
    }
  }
  render(){
    const currentStudents =this.props.filteredClasses.map(item => item.students.map(student => student));
    const currentClasses = this.props.filteredClasses.filter(classItem => classItem.userId._id === this.props.currentUser._id);
    const assignmentList = currentClasses.map(classItem => classItem.assignments.map(assignment => assignment));
    const assignmentRows = assignmentList.map((assignment => assignment.map(name => <th key={name.name}>{name.name}</th>)));
    const averageCells = assignmentList.map(assignment => assignment.map(assignment => <td key={assignment._id}>{this.getAssignmentAverage(assignment)}%</td>));
    const studentCells=currentStudents.map(students => students.map(student =>{
      const assignments = assignmentList.map((assignment) => {
        return assignment.map(name => {
          const grade = this.getValue(name, student);
          return (<td 
            contentEditable="true" 
            id={grade._id} 
            onInput={(e) => {
              this.onGradeChange(e, grade);
            }}
            key={name._id}>
            {Math.round(this.getValue(name, student).value*100)}%
          </td>);
        });
      });
      assignments.unshift(<td key="average">{this.calculateStudentAverage(student)}</td>);
      assignments.unshift(<td key="studentName">{`${student.lastName}, ${student.firstName}`}</td>);

      return (
        <tr key={student._id}>
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
            <td>Assignment Averages</td>
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
    categories: state.categoriesCRUDReducer.categories,
    currentClass: state.classesCRUDReducer.currentClass,
    currentAssignment: state.assignmentCRUDReducer.currentAssignment,
    assignments: state.assignmentCRUDReducer.assignments
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradeDisplay));