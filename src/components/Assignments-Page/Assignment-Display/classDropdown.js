import React from 'react';
import {connect} from 'react-redux';
import {fetchClasses} from '../../../actions/GET/fetchClasses';
import requiresLogin from '../../requiresLogin';
import {filterAssignments, fetchAssignments} from '../../../actions/GET/fetchAssignments';
import '../../componentStyles.css';
import '../../componentTabletStyles.css';
import '../../componentMobileStyles.css';

export class ClassDropdown extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  render(){
    let classOptions;
    if(this.props.loading === false){
      const currentClasses = this.props.classes.filter(item => item.userId._id === this.props.currentUserId);
      classOptions = currentClasses.map((classItem, i) => (
        <option  id={classItem._id} key={i} value={classItem._id}>{classItem.name}</option>
      ));
    }
    if(this.props.loading === true){
      classOptions = <option>Loading...</option>;
    }
    

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
    currentUserId: state.loginReducer.currentUser._id,
    classes: state.classesCRUDReducer.classes,
    loading: state.classesCRUDReducer.loading
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassDropdown));


