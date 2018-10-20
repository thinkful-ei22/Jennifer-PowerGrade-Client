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
import '../componentTabletStyles.css';
import { setDashboardDisplay } from '../../actions/OTHER/displayAction';
import { fetchCategories } from '../../actions/GET/fetchCategories';
import { fetchClasses } from '../../actions/GET/fetchClasses';
import { fetchStudents } from '../../actions/GET/fetchStudents';

export class Dashboard extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchClasses());
    this.props.dispatch(fetchStudents());
  }
  closePopup(){
    this.props.dispatch(setDashboardDisplay('none'));
  }
  activatePopupGetStarted(){
    this.props.dispatch(setDashboardDisplay('help'));
  }
  activatePopupClassForm(){
    this.props.dispatch(setDashboardDisplay('create'));
  }
  activatePopupClassView(){
    this.props.dispatch(setDashboardDisplay('view'));
  }
  activatePopupSetup(){
    this.props.dispatch(setDashboardDisplay('setup'));
  }
  // activatePopupClassEdit(){
  //   this.props.dispatch(setDashboardDisplay('edit'));
  // }
  closePopupClassEdit(){
    this.props.dispatch(setDashboardDisplay('view'));
  }
  render(){
    const iconStyle={
      width:'80px',
      cursor:'pointer'
    };
    let popup;
    if(this.props.display==='edit'){
      popup = 
      <div className='edit-class-popup-active col-2'>
        <i className="close-form fa fa-times" onClick={() => this.closePopupClassEdit()}></i>
        <h2 className="popup-heading">Edit Class</h2>
        <EditClassForm {...this.props}/>
      </div>;
    }else if(this.props.display==='setup'){
      popup = 
      <div className="gradebook-setup-popup-active col-3">
        <i className="close-form fa fa-times" onClick={() => this.closePopup()}></i>
        <h2 className="popup-heading">Set Gradebook Categories</h2>
        <p className="setup-instructions">Please enter the percentage that you would like each category to be worth.</p>
        <GradebookSetupForm/>
      </div>;
    }else if(this.props.display==='view'){
      popup= 
      <div className="view-classes-popup-active col-2">
        <div className="class-view-edit-container">
          <i className="close-form fa fa-times" onClick={() => this.closePopup()} ></i>
          <ClassesDisplay openEdit={this.activatePopupClassEdit} {...this.props}/>
        </div>
      </div>;
    }else if(this.props.display==='create'){
      popup=    
      <div className="create-class-popup-active col-2">
        <i className="close-form fa fa-times" onClick={() => this.closePopup()}></i>
        <h2 className="popup-heading">Create a Class</h2>
        <CreateClassForm/>
      </div>;
    }else if(this.props.display==='help'){
      popup= 
      <div className="get-started-popup-active col-3">
        <i className="close-form fa fa-times" onClick={() => this.closePopup()}></i>
        <GettingStarted/>
      </div>;
    }else if(this.props.display==='none'){
      popup =
      <div></div>;
    }
    return (
      <div>
        <div className="row">
          <NavBar />
        </div>
        <div className="row">
          <h1 className="welcome">Welcome to PowerGrade, {this.props.name}!</h1>
        </div>
        <div className="row">
          <div className="col-6 get-started-container option-box">
            <div className="go"><a onClick={()=> this.activatePopupGetStarted()}><i className="far fa-question-circle" style={iconStyle}></i></a></div>
            <h2 className="action-heading" >Get Help</h2>
          </div>
          <div className="col-6 view-classes-container option-box">
            <div className="go"><a onClick={()=> this.activatePopupClassView()}><img src="https://github.com/thinkful-ei22/Jennifer-PowerGrade-Client/blob/master/Screenshots/class.png?raw=true" alt="class" style={iconStyle}></img></a></div>
            <h2 className="action-heading" >View Classes</h2>
          </div>
          <div className="col-6 create-class-container option-box">
            <div className="go"><a onClick={()=> this.activatePopupClassForm()}><i className="far fa-plus-square" style={iconStyle}></i></a></div>
            <h2 className="action-heading" >Create Class</h2>
          </div>
          <div className="col-6 set-up-container option-box">
            <div className="go"><a onClick={()=> this.activatePopupSetup()}> <img src="https://github.com/thinkful-ei22/Jennifer-PowerGrade-Client/blob/master/Screenshots/grade.png?raw=true" alt="grade" style={iconStyle}/></a></div>
            <h2 className="action-heading" >Setup Gradebook</h2>
          </div>
          {popup}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    display: state.dashboardReducer.display,
    name: state.loginReducer.currentUser.firstName,
    students: state.studentsCRUDReducer.students,
    classes: state.classesCRUDReducer.classes,
    currentUser: state.loginReducer.currentUser,
    loading: state.classesCRUDReducer.loading,
    currentClass: (state.classesCRUDReducer.currentClass !== null) ? state.classesCRUDReducer.currentClass : { name: 'Loading', students: [], id: null },
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));