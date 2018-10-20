import React from 'react';
import {fetchClasses, fetchOneClass} from '../../actions/GET/fetchClasses';
import {deleteClass} from '../../actions/DELETE/deleteClass';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import { setDashboardDisplay } from '../../actions/OTHER/displayAction';


export default class ClassesDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  render(){
    let availableClasses = this.props.classes.filter(classItem => classItem.userId._id === this.props.currentUser._id);
    let classList;
    if(availableClasses.length === 0){
      classList = <div>No classes yet. Create one!</div>;
    }
    if(availableClasses.length>0){
      classList=availableClasses.map((classItem) =>(
        <div className="class-list" key={classItem._id}>
          <li 
            onClick={(e)=>{
              console.log(e.target.id);
              this.props.dispatch(fetchOneClass(e.target.id));
              this.props.dispatch(setDashboardDisplay('edit'));
            }}
            className="class-list-item" id={classItem._id}>
            {classItem.name}
          </li>
          <i  id={classItem._id} className="delete-class-x fa fa-times" 
            onClick={(e) => {
              this.props.dispatch(deleteClass(e.target.id));
              this.props.dispatch(fetchClasses());
            }}></i>     
        </div>)); 
    }
    if(this.props.loading === true){
      console.log('loading');
      return (<div>Loading...</div>);
    } 
    if(this.props.loading === false){
      console.log('showing class list');
      return(
        <div className="class-edit-container">
          <h2 className="lesson-title">Click on a class to edit.</h2>
          <ul className="class-list-ul">{classList}</ul>;
        </div>);
    }
  }
}