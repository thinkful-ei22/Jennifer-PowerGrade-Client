import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../NavBar/navbar';
import requiresLogin from '../requiresLogin';
import GradeDisplay from '../Grades-Page/gradeDisplay';
import SideBar from './classSidebar';
import './gradePage.css';


class GradesPage extends React.Component {
  render(){
    return (
      <div>
        <div className="row">
          <NavBar />
        </div>
        <SideBar/>
        <div>
          <GradeDisplay/>
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

export default requiresLogin()(connect(mapStateToProps)(GradesPage));