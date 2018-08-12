import React from 'react';
import {connect} from 'react-redux';
import CreateClassForm from './createClassForm';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import GradebookSetupForm from './gradebookSetupForm';
import ClassesDisplay from './classesDisplay';
import EditClassForm from './editClassForm';
// import GettingStarted from './gettingStarted';
import '../componentMobileStyles.css';
import '../componentStyles.css';

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
          <div className="col-6 get-started-container">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Get Started</h2>
            <div className="get-started-popup-hidden"/* style={{'display':('plus sign is clicked')?'block':'none'}} */ >
              {/* <GettingStarted/> */}
            </div>
          </div>
          <div className="col-6 create-class-container">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Create Class</h2>
          </div>
          <div className="create-class-popup-hidden col-2"/* style={{'display':('plus sign is clicked')?'block':'none'}} */ >
            <CreateClassForm/>
          </div>
          <div className="col-6 view-classes-container">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >View Classes</h2>
            <div className="view-classes-popup-hidden"/* style={{'display':('plus sign is clicked')?'block':'none'}} */ >
              <ClassesDisplay/>
              <div className="edit-class-popup"  /* style={{'display':('name of a class is clicked')?'block':'none'}} */>
                <EditClassForm/>
              </div>
            </div>
          </div>
          <div className="col-6 set-up-container">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Setup Gradebook</h2>
            <div className="gradebook-setup-popup-hidden"/* style={{'display':('the plus sign is clicked')?'block':'none'}} */>
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