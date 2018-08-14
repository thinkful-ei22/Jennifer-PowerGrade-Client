import React from 'react';
import {connect} from 'react-redux';
import {fetchStudents} from '../../actions/GET/fetchStudents';
import requiresLogin from '../requiresLogin';

class StudentList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStudents());
  }
  render(){
    const studentList = this.props.students.map(student => (
      <div key={student.id} className="student-checkbox-container">
        <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
        <input
          className="student-checkbox"
          type="checkbox"
          name={`students.student-${student.id}`}
          id={student.id}>
        </input>
      </div>
    ));
    return(
      <fieldset className="student-checkbox-container">
        <legend className="student-checkbox-legend">Select Your Students</legend>
        {studentList}
      </fieldset>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.studentsCRUDReducer.students,
    currentClass: state.classesCRUDReducer.currentClass
  };
};

export default requiresLogin()(connect(mapStateToProps)(StudentList));


