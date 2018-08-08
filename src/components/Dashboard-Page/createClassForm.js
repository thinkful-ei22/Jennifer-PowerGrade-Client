import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import StudentList from './studentList';

class CreateClassForm extends React.Component {
  // onSubmit(values){
  //   return this.props.dispatch(CREATE CLASS ACTION(values))
  // }
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
        <StudentList />
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