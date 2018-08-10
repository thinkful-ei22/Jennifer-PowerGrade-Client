import React from 'react';
import {reduxForm, Field} from 'redux-form';
import ClassDropdown from './classDropdown';

import Input from '../input';


class AssignmentFilters extends React.Component {
  render(){
    return (
      <div>
        <Field
          component={Input}
          element="search"
          type="search"
          name="search"
          id="search"
          label= "Search for an Assignment">
        </Field>
        <ClassDropdown/>
        <Field
          component="select"
          element="select"
          type="select"
          name="standardSelect"
          id="standardSelect"
          label= "Filter by Standard">
        </Field>
      </div>
    );
  }
}

export default reduxForm({
  form: 'assignmentFilters'
})(AssignmentFilters);