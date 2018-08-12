import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import {editClass} from '../../actions/PUT/editClass';
import StudentList from './studentList';

class EditClassForm extends React.Component {
  onSubmit(values){
    const students = Object.keys(values.students);
    const studentIds = students.map(student => student.slice(8));
    return this.props.dispatch(editClass(values.name, studentIds));
  }
  render (){
    return (
      <form className="edit-class-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h2>Edit Class</h2>
        <Field
          className="edit-class-name"
          component={Input}
          element="input"
          type="text"
          name="name"
          id="name"
          label= "Class Name"
        >
        </Field>
        <StudentList/>
        <div className="edit-class-save-button-container">
          <button className="edit-class-save-button" disabled={this.props.pristine||this.props.submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editClass'
})(EditClassForm);