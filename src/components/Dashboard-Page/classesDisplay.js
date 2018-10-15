import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchClasses, fetchOneClass} from '../../actions/GET/fetchClasses';
import {deleteClass} from '../../actions/DELETE/deleteClass';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';


export class ClassesDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  activatePopupEditClass(e){
    const popup = e.target.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className === 'edit-class-popup-hidden'){
      return popup.className = 'edit-class-popup-active';
    }
    return;
  }
  render(){
    let availableClasses;
    let classList;
    if(this.props.loading===false){
      availableClasses = this.props.classes.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    }
    if(this.props.loading === false){
      if(availableClasses.length === 0){
        classList = <div>No classes yet. Create one!</div>;
      }else{
        classList=availableClasses.map((classItem,i) =>(
          <div className="class-list" key={classItem.id}>
            <li 
              onClick={(e)=>{
                this.activatePopupEditClass(e);
                this.props.dispatch(fetchOneClass(e.target.id));
              }}
              className="class-list-item" id={classItem.id+i}>
              {classItem.name}
            </li>
            <i  id={classItem.id} className="delete-class-x fa fa-times" 
              onClick={(e) => {
                this.props.dispatch(deleteClass(e.target.id));
                this.props.dispatch(fetchClasses());
              }}></i>     
          </div>)); 
      }
    }
    if(this.props.loading === true){
      classList = <div>Loading...</div>;
    }
    
    return (
      <div className="class-edit-container">
        <h2 className="lesson-title">Click on a class to edit.</h2>
        <ul className="class-list-ul">{classList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classesCRUDReducer.classes,
    currentClass: state.classesCRUDReducer.currentClass,
    currentUser: state.loginReducer.currentUser,
    loading: state.classesCRUDReducer.loading
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassesDisplay));