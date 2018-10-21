import React from 'react';
import {connect} from 'react-redux';
import {createClass} from '../../actions/POST/createClass';
import {fetchClasses} from '../../actions/GET/fetchClasses';
import requiresLogin from '../requiresLogin';
import { fetchStudents } from '../../actions/GET/fetchStudents';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import { setDashboardDisplay } from '../../actions/OTHER/displayAction';

export class CreateClassForm extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchStudents());
  }
  render (){
    const studentsToAdd=[];
    let studentCheckboxes;
    if(this.props.loading===false){
      studentCheckboxes = this.props.students.map(
        (student) => {
          return (
            <div key={student.id} className="student-checkbox-container">
              <label htmlFor={`students.student-${student.id}`}>{`${student.lastName}, ${student.firstName}`}</label>
              <input
                onChange={(e) => {
                  if(e.target.checked===true){
                    studentsToAdd.push(student._id);
                  }
                  else if(e.target.checked===false){
                    const indexToDelete = studentsToAdd.indexOf(student._id);
                    studentsToAdd.splice(indexToDelete, 1);
                  }
                  return studentsToAdd;
                }} 
                className="student-checkbox"
                type="checkbox"
                name={`students.student-${student._id}`}
                id={student._id}>
              </input>
              <hr></hr>
            </div>
          );}
      );
    }
    if(this.props.loading===true){
      studentCheckboxes=<div>Loading</div>;
    }

    return (
      <form 
        className="create-class-form" 
        onSubmit={(e)=> {
          e.preventDefault();
          const name = e.target.name.value;
          const userId = this.props.currentUser._id;
          const students = studentsToAdd;
          this.props.dispatch(setDashboardDisplay('none'));
          this.props.dispatch(createClass(name, userId, students));
          this.props.dispatch(fetchClasses());
        }
        }>
        <label htmlFor="class-name">Class Name</label>
        <input
          className="create-class-name"
          type="text"
          name="name"
          id="class-name"
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
    currentUser: state.loginReducer.currentUser,
    loading: state.studentsCRUDReducer.loading
  };
};

export default requiresLogin()(connect(mapStateToProps)(CreateClassForm));