import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import { filterClasses } from '../../actions/GET/fetchClasses';
import '../componentMobileStyles.css';
import '../componentStyles.css';
import '../componentTabletStyles.css';

export class SideBar extends React.Component{
  onClick(values){
    return this.props.dispatch(filterClasses(values));
  }
  render(){
    const currentClasses = this.props.classes.filter(classItem => classItem.userId._id === this.props.currentUser._id);
    const classLinks = currentClasses.map(classItem =>
      <li onClick={() => this.onClick(classItem.name)} key={classItem.id}><a role="button">{classItem.name}</a></li>);
    return (
      <nav className="sidenav">
        <ul className="sidenav-classes">
          {classLinks}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.loginReducer.currentUser,
    classes: state.classesCRUDReducer.classes,
  };
};
  
export default requiresLogin()(connect(mapStateToProps)(SideBar));
