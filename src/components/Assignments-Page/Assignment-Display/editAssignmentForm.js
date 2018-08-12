import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../input';
import CategoryList from '../Create-Assignment-Form/categoryList';
import {editAssignment} from '../../../actions/PUT/editAssignment';
import ClassList from '../Create-Assignment-Form/classSelect';

class EditAssignmentForm extends React.Component {
  onSubmit(values){
    console.log(values);
    return this.props.dispatch(editAssignment(values));
  }
  render (){
    return (
      <form className="edit-assignment" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          className="assignment-name"
          component={Input}
          element="input"
          type="text"
          name="name"
          id="name"
          label= "Assignment Name"
        >
        </Field>
        <Field
          className="assignment-date"
          component={Input}
          element="input"
          type="date"
          name="date"
          id="date"
          label= "Assignment Date"
        > 
        </Field>
        <CategoryList/>
        <ClassList/>
        <div className="create-button">
          <button disabled={this.props.pristine||this.props.submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editAssignment'
})(EditAssignmentForm);