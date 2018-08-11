import React from 'react';
import {connect} from 'react-redux';
import {fetchStudents} from '../../actions/Dashboard-Page-Actions/fetchStudents';
import requiresLogin from '../requiresLogin';
import {Field} from 'redux-form';
import Input from '../input';

class StudentList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStudents());
  }
  render(){
    const studentList = this.props.students.map(student => (
      <div key={student.id}>
        <Field 
          component={Input}
          element="checkbox"
          type="checkbox"
          name={`students.student-${student.id}`}
          id={student.id}
          label={`${student.lastName}, ${student.firstName}`}>
        </Field>
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
    students: state.fetchStudentsReducer.students
  };
};

export default requiresLogin()(connect(mapStateToProps)(StudentList));


