import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import GradeDisplay from '../Grades-Page/gradeDisplay';
import SideBar from './classSidebar';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';


export class GradesPage extends React.Component {
  render(){
    return (
      <div>
        <div className="row nav-container">
          <NavBar />
        </div>
        <SideBar/>
        <div className="grade-display">
          <GradeDisplay/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    name: state.loginReducer.currentUser.firstName  //DO I NEED THIS?
    
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradesPage));