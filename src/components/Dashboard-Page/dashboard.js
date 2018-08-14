import React from 'react';
import {connect} from 'react-redux';
import CreateClassForm from './createClassForm';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import GradebookSetupForm from './gradebookSetupForm';
import ClassesDisplay from './classesDisplay';
import EditClassForm from './editClassForm';
import GettingStarted from './gettingStarted';
import '../componentMobileStyles.css';
import '../componentStyles.css';

class Dashboard extends React.Component {
  activatePopupGetStarted(e){
    const popup = e.target.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className ==='get-started-popup-hidden col-2'){
      return popup.className = 'get-started-popup-active col-2';
    }
    return;
  }
  closePopupGetStarted(e){
    const popup = e.target.parentElement;
    if(popup.className === 'get-started-popup-active col-2'){
      return popup.className = 'get-started-popup-hidden col-2';
    }
  }
  activatePopupClassForm(e){
    const popup = e.target.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className === 'create-class-popup-hidden col-2'){
      return popup.className = 'create-class-popup-active col-2';
    }
    return;
  }
  closePopupClassForm(e){
    const popup = e.target.parentElement;
    if(popup.className==='create-class-popup-active col-2'){
      return popup.className = 'create-class-popup-hidden col-2';
    }
    return;
  }
  activatePopupClassView(e){
    const popup = e.target.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className === 'view-classes-popup-hidden col-2'){
      return popup.className = 'view-classes-popup-active col-2';
    }
    return;
  }
  closePopupClassView(e){
    const popup = e.target.parentElement.parentElement;
    if(popup.className === 'view-classes-popup-active col-2'){
      return popup.className = 'view-classes-popup-hidden col-2';
    }
    return;
  }
  activatePopupSetup(e){
    const popup = e.target.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className === 'gradebook-setup-popup-hidden col-2'){
      return popup.className = 'gradebook-setup-popup-active col-2';
    }
    return;
  }
  closePopupSetup(e){
    const popup = e.target.parentElement;
    if(popup.className === 'gradebook-setup-popup-active col-2'){
      return popup.className = 'gradebook-setup-popup-hidden col-2';
    }
    return;
  }

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
            <div className="go"><a onClick={(e)=> this.activatePopupGetStarted(e)}><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Get Started</h2>
          </div>
          <div className="get-started-popup-hidden col-2">
            <i className="close-form fa fa-times" onClick={(e) => this.closePopupGetStarted(e)}></i>
            <GettingStarted/>
          </div>
          <div className="col-6 create-class-container">
            <div className="go"><a onClick={(e)=> this.activatePopupClassForm(e)}><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Create Class</h2>
          </div>
          <div className="create-class-popup-hidden col-2">
            <i className="close-form fa fa-times" onClick={(e) => this.closePopupClassForm(e)}></i>
            <CreateClassForm/>
          </div>
          <div className="col-6 view-classes-container">
            <div className="go"><a onClick={(e)=> this.activatePopupClassView(e)}><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >View Classes</h2>
          </div>
          <div className="view-classes-popup-hidden col-2">
            <div className="class-view-edit-container">
              <i className="close-form fa fa-times" onClick={(e) => this.closePopupClassView(e)}></i>
              <ClassesDisplay/>
              <div className="edit-class-popup-hidden">
                <EditClassForm/>
              </div>
            </div>
          </div>
          <div className="col-6 set-up-container">
            <div className="go"><a onClick={(e)=> this.activatePopupSetup(e)}><i className="fa fa-plus"></i></a></div>
            <h2 className="action-heading" >Setup Gradebook</h2>
          </div>
          <div className="gradebook-setup-popup-hidden col-2">
            <i className="close-form fa fa-times" onClick={(e) => this.closePopupSetup(e)}></i>
            <GradebookSetupForm/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    name: state.loginReducer.currentUser.firstName,
    students: state.studentsCRUDReducer.students
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));