import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../../requiresLogin';
import {fetchAssignments, fetchOneAssignment} from '../../../actions/GET/fetchAssignments';
import {deleteAssignment} from '../../../actions/DELETE/deleteAssignment';
import '../../componentStyles.css';
import '../../componentMobileStyles.css';

class AssignmentDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  activateAssignmentEditPopup(e){
    const popup = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className === 'assignment-edit-hidden col-3'){
      return popup.className = 'assignment-edit-active col-3';
    }
    return;
  }
  render(){
    const availableAssignmnets = this.props.assignments.filter(assignment=>assignment.userId===this.props.currentUser.id);
    const assignmentList=availableAssignmnets.map(assignment =>(
      <div className="assignment-list" key={assignment.id}>
        <li onClick={(e)=>this.activateAssignmentEditPopup(e)} className="assignment-list-item" id={assignment.id}>
          <a className="assignment-name-link" role="button" onClick={(e)=>this.props.dispatch(fetchOneAssignment(e.target.parentElement.id))}>{assignment.name}</a>
          <i className="delete-assignment-x fa fa-times" onClick={(e) => this.props.dispatch(deleteAssignment(e.target.parentElement.id))}></i>
        </li>     
      </div>)); 
    return (
      <ul className="assignment-list-ul">{assignmentList}</ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    assignments: state.assignmentCRUDReducer.filteredAssignments,
    currentAssignment: state.assignmentCRUDReducer.currentAssignment,
    currentUser: state.loginReducer.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentDisplay));