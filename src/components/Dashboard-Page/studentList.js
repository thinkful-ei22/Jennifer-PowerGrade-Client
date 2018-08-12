import React from 'react';
import {connect} from 'react-redux';
import {fetchStudents} from '../../actions/GET/fetchStudents';
import requiresLogin from '../requiresLogin';
import {Field} from 'redux-form';
import Input from '../input';

class StudentList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStudents());
  }
  render(){
    const studentList = this.props.students.map(student => (
      <Field 
        className="student-checkbox"
        key={student.id}
        component={Input}
        element="checkbox"
        type="checkbox"
        name={`students.student-${student.id}`}
        id={student.id}
        label={`${student.lastName}, ${student.firstName}`}>
      </Field>
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
    students: state.studentsCRUDReducer.students
  };
};

export default requiresLogin()(connect(mapStateToProps)(StudentList));


