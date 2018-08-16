import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchClasses, fetchOneClass} from '../../actions/GET/fetchClasses';
import {deleteClass} from '../../actions/DELETE/deleteClass';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';


class ClassesDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  activatePopupEditClass(e){
    const popup = e.target.parentElement.parentElement.nextSibling;
    if(popup.className === 'edit-class-popup-hidden'){
      return popup.className = 'edit-class-popup-active';
    }
    return;
  }
  render(){
    const availableClasses = this.props.classes.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const classList=availableClasses.map(classItem =>(
      <div className="class-list" key={classItem.id}>
        <li 
          onClick={(e)=>{
            this.activatePopupEditClass(e);
            this.props.dispatch(fetchOneClass(e.target.id));
          }}
          className="class-list-item" id={classItem.id}>
          {classItem.name}
        </li>
        <i  id={classItem.id} className="delete-class-x fa fa-times" onClick={(e) => this.props.dispatch(deleteClass(e.target.id))}></i>     
      </div>)); 
    return (
      <ul className="class-list-ul">{classList}</ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classesCRUDReducer.classes,
    currentClass: state.classesCRUDReducer.currentClass,
    currentUser: state.loginReducer.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassesDisplay));