import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import StudentList from './studentList';
import { createClass } from '../../actions/Dashboard-Page-Actions/createClass';

class CreateClassForm extends React.Component {
  onSubmit(values){
    const students = Object.keys(values.students);
    const studentIds = students.map(student => student.slice(8));
    console.log('values=', values, 'values.name=', values.name, 'studentIds=', studentIds);
    return this.props.dispatch(createClass(values.name, studentIds));
  }
  render (){
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          component={Input}
          element="input"
          type="text"
          name="name"
          id="name"
          label="Class Name"
        >
        </Field>
        <StudentList/>
        <button disabled={this.props.pristine||this.props.submitting}>
            Create Class
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'createClass'
})(CreateClassForm);