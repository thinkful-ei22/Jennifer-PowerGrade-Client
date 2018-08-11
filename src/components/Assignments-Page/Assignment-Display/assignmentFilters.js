import React from 'react';
import {reduxForm, Field} from 'redux-form';
import ClassDropdown from './classDropdown';
import Input from '../../input';
import './assignmentFilters.css';


class AssignmentFilters extends React.Component {
  render(){
    return (
      <div>
        <Field
          className="assignment-filter"
          component={Input}
          element="search"
          type="search"
          name="search"
          id="search"
          label= "Search">
        </Field>
        <ClassDropdown/>
      </div>
    );
  }
}

export default reduxForm({
  form: 'assignmentFilters'
})(AssignmentFilters);