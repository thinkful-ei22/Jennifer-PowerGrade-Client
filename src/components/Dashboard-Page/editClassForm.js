import React from 'react';
import {editClass, addClassStudent, removeClassStudent} from '../../actions/PUT/editClass';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import { setDashboardDisplay } from '../../actions/OTHER/displayAction';

export default class EditClassForm extends React.Component {
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
    console.log(this.props);
    let studentCheckboxes;
    if(this.props.students !==null && this.props.students !== undefined){
      studentCheckboxes = this.props.students.map(
        student => {
          if(this.props.currentClass.students.includes(student._id)){ //if the student is already in the class show them as checked
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
                <label htmlFor={`students.student-${student._id}`}>{`${student.lastName}, ${student.firstName}`}</label>
                <input
                  onChange={(e)=> {
                    if(e.target.checked===true){
                      this.props.dispatch(addClassStudent(student._id));
                    }
                    else if(e.target.checked===false){
                      this.props.dispatch(removeClassStudent(student._id));
                    }
                  }}
                  className="student-checkbox"
                  type="checkbox"
                  name={`students.student-${student._id}`}
                  id={student._id}>
                </input>
                <hr></hr>
              </div>);
          }
        });
    }
    return(
      <form 
        id={this.props.currentClass._id}
        className="edit-class-form" 
        onSubmit={(e)=>{  
          e.preventDefault();
          this.onSubmit(e);
          this.props.dispatch(setDashboardDisplay('view'));
        }}>
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
      </form>);
  }
}