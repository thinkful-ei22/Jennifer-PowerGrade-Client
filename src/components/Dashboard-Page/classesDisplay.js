import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import {fetchClasses, fetchOneClass} from '../../actions/GET/fetchClasses';
import {deleteClass} from '../../actions/DELETE/deleteClass';


class ClassesDisplay extends React.Component {
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
    const classList=this.props.classes.map(classItem =>(
      <div className="class-list" key={classItem.id}>
        <li onClick={(e)=>this.activatePopupEditClass(e)}className="class-list-item" id={classItem.id}>
          <a className="class-name-link" href="#" onClick={(e)=>this.props.dispatch(fetchOneClass(e.target.parentElement.id))}>{classItem.name}</a>
          <i className="delete-class-x fa fa-times" onClick={(e) => this.props.dispatch(deleteClass(e.target.parentElement.id))}></i>
        </li>     
      </div>)); 
    return (
      <ul className="class-list-ul">{classList}</ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classesCRUDReducer.classes,
    currentClass: state.classesCRUDReducer.currentClass
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassesDisplay));