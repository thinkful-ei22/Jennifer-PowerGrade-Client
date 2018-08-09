import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import { fetchAssignments } from '../../actions/Assignment-Page-Actions/assignmentList';

class AssignmentDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  render(){
    const assignmentList=this.props.assignments.map(assignment =>(<li key={assignment.id}>{assignment.name}</li>)); 
    return (
      <div>
        <ul>{assignmentList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assignments: state.assignmentReducer.assignments
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentDisplay));