import React from 'react';
import {connect} from 'react-redux';
import {createClass} from '../../actions/POST/createClass';
import {fetchClasses} from '../../actions/GET/fetchClasses';
import requiresLogin from '../requiresLogin';
import { fetchStudents } from '../../actions/GET/fetchStudents';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';

export class CreateClassForm extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStudents());
  }
  closePopupClassForm(e){
    const popup = e.target.parentElement;
    if(popup.className==='create-class-popup-active col-2'){
      return popup.className = 'create-class-popup-hidden col-2';
    }
    return;
  }
  render (){
    const studentsToAdd=[];
    const studentCheckboxes = this.props.students.map(
      student => {
        return (
          <div key={student.id} className="student-checkbox-container">
            <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
            <input
              onChange={(e) => {
                if(e.target.checked===true){
                  studentsToAdd.push(student.id);
                }
                else if(e.target.checked===false){
                  const indexToDelete = studentsToAdd.indexOf(student.id);
                  studentsToAdd.splice(indexToDelete, 1);
                }
                console.log(studentsToAdd);
                return studentsToAdd;
              }} 
              className="student-checkbox"
              type="checkbox"
              role="checkbox"
              name={`students.student-${student.id}`}
              id={student.id}>
            </input>
            <hr></hr>
          </div>
        );}
    );
    return (
      <form 
        className="create-class-form" 
        onSubmit={(e)=> {
          e.preventDefault();
          const name = e.target.name.value;
          const userId = this.props.currentUser.id;
          const students = studentsToAdd;
          this.closePopupClassForm(e);
          this.props.dispatch(createClass(name, userId, students));
          this.props.dispatch(fetchClasses());
        }
        }>
        <label htmlFor="name">Class Name</label>
        <input
          className="create-class-name"
          type="text"
          name="name"
          id="name"
        >
        </input>
        <fieldset className="checkboxes-container">
          <legend className="student-checkbox-legend">Select Your Students</legend>
          {studentCheckboxes}
        </fieldset>
        <div className="create-class-save-button-container">
          <button className="create-class-save-button" disabled={this.props.pristine||this.props.submitting}>
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

export default requiresLogin()(connect(mapStateToProps)(CreateClassForm));