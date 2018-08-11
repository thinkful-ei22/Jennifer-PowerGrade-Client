import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../../requiresLogin';
import { fetchAssignments } from '../../../actions/Assignment-Page-Actions/fetchAssignments';
import {deleteAssignment} from '../../../actions/Assignment-Page-Actions/deleteAssignment';
import './assignmentDisplay.css';

class AssignmentDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  render(){
    const assignmentList=this.props.assignments.map(assignment =>(
      <div className="assignment-list" key={assignment.id}>
        <li id={assignment.id}><a href="#">{assignment.name}</a><i onClick={(e) => this.props.dispatch(deleteAssignment(e.target.parentElement.id))} className="fa fa-times"></i></li>     
      </div>)); 
    return (
      <div>
        <ul>{assignmentList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assignments: state.fetchAssignmentsReducer.filteredAssignments
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentDisplay));