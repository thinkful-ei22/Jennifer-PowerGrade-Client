import React from 'react';
import {connect} from 'react-redux';
import {fetchClasses} from '../../../actions/Grades-Page-Actions/fetchClasses';
import requiresLogin from '../../requiresLogin';
import {filterAssignments} from '../../../actions/Assignment-Page-Actions/fetchAssignments';
import {fetchAssignments} from '../../../actions/Assignment-Page-Actions/fetchAssignments';
import {Field} from 'redux-form';
import './classDropdown.css';

class ClassDropdown extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  render(){
    const currentClasses = this.props.classes.filter(item => item.userId.id === this.props.currentUserId);
    const classOptions = currentClasses.map((classItem, i) => (
      <option  key={i} value={classItem.id}>{classItem.name}</option>
    ));
    return(
      <div>
        <label htmlFor="classId">Filter by Class</label>
        <select
          onChange={(e => {
            console.log(e.target.value);
            if(e.target.value===0){
              this.props.dispatch(fetchAssignments());
            }
            else{
              this.props.dispatch(filterAssignments(e.target.value));
            }
          }
          )}
          className="class-filter"
          type="select"
          name="classId"
          id="classId">
          <option value="">All Assignments</option>
          {classOptions}
        </select>
      </div>
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


