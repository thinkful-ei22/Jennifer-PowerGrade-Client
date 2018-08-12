import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../../requiresLogin';
import {fetchAssignments, fetchOneAssignment} from '../../../actions/GET/fetchAssignments';
import {deleteAssignment} from '../../../actions/DELETE/deleteAssignment';
import EditAssignmentForm from './editAssignmentForm';
import './assignmentDisplay.css';

class AssignmentDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  render(){
    const assignmentList=this.props.assignments.map(assignment =>(
      <div className="assignment-list" key={assignment.id}>
        <li id={assignment.id}>
          <a href="#" onClick={this.props.dispatch(fetchOneAssignment(assignment.id))}>{assignment.name}</a>
          <i onClick={(e) => this.props.dispatch(deleteAssignment(e.target.parentElement.id))} className="fa fa-times"></i>
        </li>     
      </div>)); 
    return (
      <div>
        {EditAssignmentForm}
        <div>
          <ul>{assignmentList}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assignments: state.assignmentCRUDReducers.filteredAssignments,
    currentAssignment: state.assignmentCRUDReducers.currentAssignment
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentDisplay));