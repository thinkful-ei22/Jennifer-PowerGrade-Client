import React from 'react';
import {connect} from 'react-redux';
import {fetchClasses} from '../../../actions/GET/fetchClasses';
import requiresLogin from '../../requiresLogin';
import {filterAssignments, fetchAssignments} from '../../../actions/GET/fetchAssignments';
import '../../componentStyles.css';
import '../../componentTabletStyles.css';
import '../../componentMobileStyles.css';

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
      <div className="class-select-container">
        <label className="class-select-label" htmlFor="classId">Filter by Class</label>
        <select
          onChange={(e => {
            if(e.target.value===0){
              this.props.dispatch(fetchAssignments());
            }
            else{
              this.props.dispatch(filterAssignments(e.target.value));
            }
          }
          )}
          className="class-select"
          type="select"
          name="classId"
          id="classId">
          <option className="class-option" value="0">All Assignments</option>
          {classOptions}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.loginReducer.currentUser.id,
    classes: state.classesCRUDReducer.classes
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassDropdown));


