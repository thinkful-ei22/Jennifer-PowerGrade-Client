import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../../requiresLogin';
import {fetchAssignments, fetchOneAssignment} from '../../../actions/GET/fetchAssignments';
import {deleteAssignment} from '../../../actions/DELETE/deleteAssignment';

class AssignmentDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  render(){
    const assignmentList=this.props.assignments.map(assignment =>(
      <div className="assignment-list" key={assignment.id}>
        <li className="assignment-list-item" id={assignment.id}>
          <a className="assignment-name-link" href="#" onClick={(e)=>this.props.dispatch(fetchOneAssignment(e.target.parentElement.id))}>{assignment.name}</a>
          <i className="delete-assignment-x" onClick={(e) => this.props.dispatch(deleteAssignment(e.target.parentElement.id))} className="fa fa-times"></i>
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
    currentAssignment: state.assignmentCRUDReducer.currentAssignment
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentDisplay));