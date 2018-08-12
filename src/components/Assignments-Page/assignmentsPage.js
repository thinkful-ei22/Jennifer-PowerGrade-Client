import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import AssignmentDisplay from './Assignment-Display/assignmentDisplay';
import CreateAssignmentForm from './Create-Assignment-Form/createAssignmentForm';
import AssignmentFilters from './Assignment-Display/assignmentFilters';
import EditAssignmentForm from './Assignment-Display/editAssignmentForm';
import './assignmentPage.css';

class AssignmentsPage extends React.Component {
  render(){
    return (
      <div>
        <div className="row nav-container">
          <NavBar />
        </div>
        <div className="row option-container">
          <div className="assignment-create col-3">
            <h2 className="assignment-option-heading">Create an Assignment</h2>
            <CreateAssignmentForm />
          </div>
          <div className="assignment-display col-3">
            <h2 className="assignment-option-heading">Your Assignments</h2>
            <AssignmentFilters/>
            <AssignmentDisplay/>
          </div>
          <div className="assignment-edit col-3">
            <h2 className="assignment-option-heading">Edit Assignment</h2>
            <EditAssignmentForm/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    name: state.loginReducer.currentUser.firstName //DO I NEED THIS?
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentsPage));