import React from 'react';
import {connect} from 'react-redux';
import {editClass} from '../../actions/PUT/editClass';
import requiresLogin from '../requiresLogin';

//change onChange listeners to dispatch actions that add or remove students from the current class.
class EditClassForm extends React.Component {
  closePopupEditClass(e){
    const popup = e.target.parentElement.parentElement;
    if(popup.className === 'edit-class-popup-active'){
      return popup.className = 'edit-class-popup-hidden';
    }
    return;
  }
  render(){
    const currentStudents = [...this.props.currentClass.students];
    const studentCheckboxes = this.props.students.map(
      student => {
        if(this.props.currentClass.students.includes(student.id)){ //if the student is already in the class show them as checked
          return (
            <div key={student.id} className="student-checkbox-container">
              <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
              <input
                onChange={e => {
                  const indexToDelete = currentStudents.indexOf(e.target.id);
                  currentStudents.splice(indexToDelete, 1);
                  console.log(currentStudents);
                }}
                className="student-checkbox"
                type="checkbox"
                name={`students.student-${student.id}`}
                id={student.id}
                checked>
              </input>
            </div>
          );
        }
        else{ //otherwise show an empty checkbox
          return (
            <div key={student.id} className="student-checkbox-container">
              <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
              <input
                onChange={e => {
                  currentStudents.push(e.target.id);
                  console.log(currentStudents);
                }} 
                className="student-checkbox"
                type="checkbox"
                name={`students.student-${student.id}`}
                id={student.id}>
              </input>
            </div>);
        }
      });
    return (
      <form 
        id={(this.props.currentClass.id !==null) ? `${this.props.currentClass.id}` : 'id'}
        className="edit-class-form" 
        onSubmit={(e)=>{
          e.preventDefault();
          const name = e.target.name.value;
          const id = e.target.id;
          const userId = {
            id: this.props.currentUser.id,
          };
          const assignments = this.props.currentClass.assignments;
          return this.props.dispatch(editClass(id, name, currentStudents, assignments, userId));
        }}>
        <i className="close-form fa fa-times" onClick={(e) => this.closePopupEditClass(e)}></i>
        <h2>Edit Class</h2>
        <label htmlFor="name">Class Name</label>
        <input
          onChange={e => {
            console.log(e.target.value);
          }}
          className="edit-class-name"
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

