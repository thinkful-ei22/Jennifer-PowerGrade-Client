import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import CategoryList from './categoryList';
import { createAssignment } from '../../actions/Assignment-Page-Actions/createAssignment';

class CreateAssignmentForm extends React.Component {
  onSubmit(values){
    console.log(values.name, values.date, values.categoryId);
    return this.props.dispatch(createAssignment(values));
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
          label= "Assignment Name"
        >
        </Field>
        <Field
          component={Input}
          element="input"
          type="date"
          name="date"
          id="date"
          label= "Assignment Date"
        >
        </Field>
        <CategoryList/>
        <button disabled={this.props.pristine||this.props.submitting}>
            Save
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'createClass'
})(CreateAssignmentForm);