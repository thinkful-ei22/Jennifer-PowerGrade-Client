import React from 'react';
import {connect} from 'react-redux';
import CreateClassForm from './createClassForm';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import GradebookSetupForm from './gradebookSetupForm';
import ClassesDisplay from './classesDisplay';
import EditClassForm from './editClassForm';
// import GettingStarted from './gettingStarted';

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <div className="row nav-container">
          <NavBar />
        </div>
        <div className="row">
          <h1 className="welcome">Welcome to PowerGrade, {this.props.name}!</h1>
        </div>
        <div className="row">
          <div className="col-3 option">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Get Started</h2>
            <div className="get-started-popup"/* style={{'display':('plus sign is clicked')?'block':'none'}} */ >
              {/* <GettingStarted/> */}
            </div>
          </div>
          <div className="col-3 option">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Create Class</h2>
            <div className="create-class-popup"/* style={{'display':('plus sign is clicked')?'block':'none'}} */ >
              <CreateClassForm/>
            </div>
          </div>
          <div className="col-3 option">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >View Classes</h2>
            <div className="view-classes-popup"/* style={{'display':('plus sign is clicked')?'block':'none'}} */ >
              <ClassesDisplay/>
              <div className="edit-class-popup"  /* style={{'display':('name of a class is clicked')?'block':'none'}} */>
                <EditClassForm/>
              </div>
            </div>
          </div>
          <div className="col-3 option set-up">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Setup Gradebook</h2>
            <div className="gradebook-setup-popup"/* style={{'display':('the plus sign is clicked')?'block':'none'}} */>
              <GradebookSetupForm/>
            </div>
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