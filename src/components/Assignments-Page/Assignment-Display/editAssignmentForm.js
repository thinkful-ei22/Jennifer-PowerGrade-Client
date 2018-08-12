import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../input';
import CategoryList from '../Create-Assignment-Form/categoryList';
import {editAssignment} from '../../../actions/PUT/editAssignment';
import ClassList from '../Create-Assignment-Form/classSelect';

class EditAssignmentForm extends React.Component {
  onSubmit(values){
    const classes = Object.keys(values.classes);
    const classIds = classes.map(classItem => classItem.slice(6));
    return this.props.dispatch(editAssignment(values.name, values.date, classIds));
  }
  render (){
    return (
      <form className="edit-assignment-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          className="assignment-name-edit"
          component={Input}
          element="input"
          type="text"
          name="name"
          id="name"
          label= "Assignment Name"
        >
        </Field>
        <Field
          className="assignment-date-edit"
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
        <div className="assignment-edit-save-button-container">
          <button className="assignment-edit-save-button" disabled={this.props.pristine||this.props.submitting}>
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