import React from 'react';
import {connect} from 'react-redux';
import { fetchAssignments } from '../actions/test';

class Test extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  render(){
    const assignmentList=this.props.assignments.map(assignment =>(<li>{assignment.name}</li>)); 
    return (
      <div>
        <ul>{assignmentList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    assignments: state.assignments
  };
};

export default connect(mapStateToProps)(Test);