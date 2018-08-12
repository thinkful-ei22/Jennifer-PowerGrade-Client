import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import StudentList from './studentList';
import {createClass} from '../../actions/POST/createClass';

class CreateClassForm extends React.Component {
  onSubmit(values){
    const students = Object.keys(values.students);
    const studentIds = students.map(student => student.slice(8));
    return this.props.dispatch(createClass(values.name, studentIds));
  }
  render (){
    return (
      <form className="create-class-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          className="create-class-name"
          component={Input}
          element="input"
          type="text"
          name="name"
          id="name"
          label="Class Name"
        >
        </Field>
        <StudentList/>
        <div className="create-class-save-button-container">
          <button className="create-class-save-button" disabled={this.props.pristine||this.props.submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'createClass'
})(CreateClassForm);