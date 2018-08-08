import React from 'react';
import {connect} from 'react-redux';
import CreateClassForm from './createClassForm';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import GradebookSetupForm from './gradebookSetupForm';

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <div className="row">
          <NavBar />
        </div>
        <div className="row">
          <h1 className="welcome">Welcome to PowerGrade, {this.props.name}!</h1>
        </div>
        <div className="row">
          <div className="col-3 option get-started">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action" >Get Started</h2>
          </div>
          <div className="col-3 option create-class">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action" >Create Class</h2>
            <CreateClassForm/>
          </div>
          <div className="col-3 option set-up">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action" >Setup Gradebook</h2>
            <GradebookSetupForm/>
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));