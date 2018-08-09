import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import GradesDisplay from './gradeDisplay';

class SideBar extends React.Component{
  render(){
    const currentClasses = this.props.classes.filter(classItem => classItem.userId === this.props.currentUser.id);
    const classLink = currentClasses.map(classItem => 
      <Link to={GradesDisplay}>{classItem.name}</Link>);
    return (
      <nav className="sidenav">
        <ul>
          {classLink}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.loginReducer.currentUser,
    classes: state.fetchClassesReducer.classes
  };
};
  
export default requiresLogin()(connect(mapStateToProps)(SideBar));
