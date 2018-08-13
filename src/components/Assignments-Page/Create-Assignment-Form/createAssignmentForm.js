import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../input';
import CategoryList from './categoryList';
import {createAssignment} from '../../../actions/POST/createAssignment';
import ClassList from './classSelect';
import '../../componentStyles.css';
import '../../componentMobileStyles.css';

class CreateAssignmentForm extends React.Component {
  onSubmit(values){
    const classes = Object.keys(values.classes);
    const classIds = classes.map(classItem => classItem.slice(6));
    console.log('values=', values, 'classIds=', classIds);
    return this.props.dispatch(createAssignment(values.name, values.date, classIds));
  }
  render (){
    return (
      <form className="create-assignment-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          className="assignment-name-create"
          component={Input}
          element="input"
          type="text"
          name="name"
          id="name"
          label= "Assignment Name"
        >
        </Field>
        <Field
          className="assignment-date-create"
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
        <div className="assignment-create-save-button-container">
          <button className="assignment-create-save-button" disabled={this.props.pristine||this.props.submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'createAssignment'
})(CreateAssignmentForm);