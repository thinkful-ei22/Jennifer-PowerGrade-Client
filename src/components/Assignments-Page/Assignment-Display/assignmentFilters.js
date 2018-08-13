import React from 'react';
import {reduxForm, Field} from 'redux-form';
import ClassDropdown from './classDropdown';
import Input from '../../input';
import {searchAssignmentFilter} from '../../../actions/GET/fetchAssignments';
import '../../componentStyles.css';
import '../../componentMobileStyles.css';


class AssignmentFilters extends React.Component {
  render(){
    return (
      <div className="assignment-filters">
        <Field
          className="assignment-search-filter"
          onChange={(e) => this.props.dispatch(searchAssignmentFilter(e.target.value))}
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