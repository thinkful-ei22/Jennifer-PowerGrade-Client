import React from 'react';
import {connect} from 'react-redux';
import {fetchStudents} from '../../actions/Dashboard-Page-Actions/studentList';
import requiresLogin from '../requiresLogin';

class StudentList extends React.Component {
  componentDidMount(){
    console.log('this.props.students=',this.props.students);
    this.props.dispatch(fetchStudents());
  }
  render(){
    const studentList = this.props.students.map(student => (
      <div key={student.id}>
        <input type="checkbox" id={student.id} name={student.id} value={student.id}></input>
        <label htmlFor={student.id}>{student.lastName}, {student.firstName}</label>
      </div>
    ));
    return(
      <fieldset>
        <legend>Select Your Students</legend>
        {studentList}
      </fieldset>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.studentListReducer.students
  };
};

export default requiresLogin()(connect(mapStateToProps)(StudentList));


