import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import AssignmentDisplay from '../Assignments-Page/assignmentDisplay';
import CreateAssignmentForm from '../Assignments-Page/createAssignmentForm';

class AssignmentsPage extends React.Component {
  render(){
    return (
      <div>
        <div className="row">
          <NavBar />
        </div>
        <div>
          <CreateAssignmentForm />
          {/* <StandardSelectForm/> */}
        </div>
        <div>
          {/* <AssignmentFilters/> */}
          <AssignmentDisplay/>
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