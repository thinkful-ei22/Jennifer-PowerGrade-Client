import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import { filterClasses } from '../../actions/Grades-Page-Actions/fetchClasses';
import './sidebar.css';

class SideBar extends React.Component{
  onClick(values){
    return this.props.dispatch(filterClasses(values));
  }
  render(){
    const currentClasses = this.props.classes.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const classLinks = currentClasses.map(classItem =>
      <li onClick={() => this.onClick(classItem.name)} key={classItem.id}><a href="#">{classItem.name}</a></li>);
    return (
      <nav className="sidenav">
        <ul>
          {classLinks}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.loginReducer.currentUser,
    classes: state.fetchClassesReducer.classes,
  };
};
  
export default requiresLogin()(connect(mapStateToProps)(SideBar));
