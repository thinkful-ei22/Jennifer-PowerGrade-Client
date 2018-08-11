import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import AssignmentDisplay from './Assignment-Display/assignmentDisplay';
import CreateAssignmentForm from './Create-Assignment-Form/createAssignmentForm';
import AssignmentFilters from './Assignment-Display/assignmentFilters';
import './assignmentPage.css';

class AssignmentsPage extends React.Component {
  render(){
    return (
      <div>
        <div className="row">
          <NavBar />
        </div>
        <div className="row">
          <div className="assignment-create col-4">
            <h2 className="heading">Create an Assignment</h2>
            <CreateAssignmentForm />
          </div>
          <div className="assignment-display col-4">
            <h2 className="heading">Your Assignments</h2>
            <AssignmentFilters/>
            <AssignmentDisplay/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    name: state.loginReducer.currentUser.firstName
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentsPage));