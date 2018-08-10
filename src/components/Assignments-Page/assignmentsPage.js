import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import AssignmentDisplay from './assignmentDisplay';
import CreateAssignmentForm from './createAssignmentForm';
import AssignmentFilters from './assignmentFilters';
import StandardSelectForm from './standardSelectForm';

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
          <AssignmentFilters/>
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