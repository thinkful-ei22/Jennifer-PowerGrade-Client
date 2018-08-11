import React from 'react';
import {connect} from 'react-redux';
import {fetchClasses} from '../../../actions/Grades-Page-Actions/fetchClasses';
import requiresLogin from '../../requiresLogin';
import {filterAssignments} from '../../../actions/Assignment-Page-Actions/fetchAssignments';
import {Field} from 'redux-form';
import './classDropdown.css';

class ClassDropdown extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  onChange(values){
    return this.props.dispatch(filterAssignments(values));
  }
  render(){
    const currentClasses = this.props.classes.filter(item => item.userId.id === this.props.currentUserId);
    const classOptions = currentClasses.map((classItem, i) => (
      <option onChange={()=> this.onChange(classItem.id)} key={i} value={classItem.id}>{classItem.name}</option>
    ));
    return(
      <Field
        className="class-filter"
        component="select"
        element="select"
        type="select"
        name="classId"
        id="classId"
        label='Filter by Class'>
        <option>Choose a Class</option>
        {classOptions}
      </Field>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.loginReducer.currentUser.id,
    classes: state.fetchClassesReducer.classes
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassDropdown));


