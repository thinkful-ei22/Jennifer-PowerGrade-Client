import React from 'react';
import {connect} from 'react-redux';
import {editClass, addClassStudent, removeClassStudent} from '../../actions/PUT/editClass';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';

class EditClassForm extends React.Component {
  closePopupEditClass(e){
    const popup = e.target.parentElement.parentElement;
    if(popup.className === 'edit-class-popup-active'){
      return popup.className = 'edit-class-popup-hidden';
    }
    return;
  }
  submitClosePopupEditClass(e){
    const popup = e.target.parentElement;
    console.log(popup);
    if(popup.className === 'edit-class-popup-active'){
      return popup.className = 'edit-class-popup-hidden';
    }
    return;
  }
  onSubmit(e){
    const name = e.target.name.value;
    const id = e.target.id;
    const userId = {
      id: this.props.currentUser.id,
    };
    const assignments = this.props.currentClass.assignments;
    const students = this.props.currentClass.students;
    this.props.dispatch(editClass(id, name, students, assignments, userId));
  }
  render(){
    const studentCheckboxes = this.props.students.map(
      student => {
        if(this.props.currentClass.students.includes(student.id)){ //if the student is already in the class show them as checked
          return (
            <div key={student.id} className="student-checkbox-container">
              <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
              <input
                onChange={(e)=> {
                  if(e.target.checked===true){
                    this.props.dispatch(addClassStudent(student.id));
                  }
                  else if(e.target.checked===false){
                    this.props.dispatch(removeClassStudent(student.id));
                  }
                }}
                className="student-checkbox"
                type="checkbox"
                name={`students.student-${student.id}`}
                id={student.id}
                defaultChecked>
              </input>
              <hr></hr>
            </div>
          );
        }
        else{ //otherwise show an empty checkbox
          return (
            <div key={student.id} className="student-checkbox-container">
              <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
              <input
                onChange={(e)=> {
                  if(e.target.checked===true){
                    this.props.dispatch(addClassStudent(student.id));
                  }
                  else if(e.target.checked===false){
                    this.props.dispatch(removeClassStudent(student.id));
                  }
                }}
                className="student-checkbox"
                type="checkbox"
                name={`students.student-${student.id}`}
                id={student.id}>
              </input>
              <hr></hr>
            </div>);
        }
      });
    return (
      <form 
        id={(this.props.currentClass.id !==null) ? `${this.props.currentClass.id}` : 'id'}
        className="edit-class-form" 
        onSubmit={(e)=>{  
          e.preventDefault();
          this.onSubmit(e);
          this.submitClosePopupEditClass(e);
        }}>
        <i className="close-form fa fa-times" onClick={(e) => this.closePopupEditClass(e)}></i>
        <h2>Edit Class</h2>
        <label htmlFor="name">Class Name</label>
        <input
          className="edit-class-input"
          type="text"
          name="name"
          id="name"
          defaultValue={(this.props.currentClass.name!=='Loading') ? this.props.currentClass.name : ''}
        >
        </input>
        <fieldset className="student-checkbox-container">
          <legend className="student-checkbox-legend">Select Your Students</legend>
          {studentCheckboxes}
        </fieldset>
        <div className="edit-class-save-button-container">
          <button className="edit-class-save-button">
            Save
          </button>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {
    students: state.studentsCRUDReducer.students,
    currentClass: (state.classesCRUDReducer.currentClass !== null) ? state.classesCRUDReducer.currentClass : { name: 'Loading', students: [], id: null },
    currentUser: state.loginReducer.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditClassForm));

