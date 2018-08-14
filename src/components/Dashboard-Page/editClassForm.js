import React from 'react';
import {connect} from 'react-redux';
import {editClass} from '../../actions/PUT/editClass';
import requiresLogin from '../requiresLogin';


class EditClassForm extends React.Component {
  onSubmit(values){
    const students = Object.keys(values.students);
    const studentIds = students.map(student => student.slice(8));
    return this.props.dispatch(editClass(values.name, studentIds));
  }
  closePopupEditClass(e){
    const popup = e.target.parentElement.parentElement;
    if(popup.className === 'edit-class-popup-active'){
      return popup.className = 'edit-class-popup-hidden';
    }
    return;
  }
  render(){
    return (
      <form 
        id={(this.props.currentClass.id !==null) ? this.props.currentClass.id : 'classId'} 
        className="edit-class-form" onSubmit={e=> {e.preventDefault(); console.log('target.name.value=',e.target.name.value, 'target.value=', e.target.id);}}>
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
          {this.props.students.map(
            student => {
              if(this.props.currentClass.students.includes(student.id)){ //if the student is already in the class show them as checked
                return (
                  <div key={student.id} className="student-checkbox-container">
                    <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
                    <input
                      className="student-checkbox"
                      type="checkbox"
                      name={`students.student-${student.id}`}
                      id={student.id}
                      checked
                    >
                    </input>
                  </div>
                );
              }
              else{ //otherwise show an empty checkbox
                return (
                  <div key={student.id} className="student-checkbox-container">
                    <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
                    <input
                      className="student-checkbox"
                      type="checkbox"
                      name={`students.student-${student.id}`}
                      id={student.id}
                    >
                    </input>
                  </div>);
              }
            })}
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
    currentClass: (state.classesCRUDReducer.currentClass !== null) ? state.classesCRUDReducer.currentClass : { name: 'Loading', students: [], id: null }
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditClassForm));

