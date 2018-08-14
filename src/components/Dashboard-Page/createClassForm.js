import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Input from '../input';
import StudentList from './studentList';
import {createClass} from '../../actions/POST/createClass';
import requiresLogin from '../requiresLogin';

class CreateClassForm extends React.Component {
  // onSubmit(values){
  //   const students = Object.keys(values.students);
  //   const studentIds = students.map(student => student.slice(8));
  //   return this.props.dispatch(createClass(values.name, studentIds));
  // }
  render (){
    // const studentCheckboxes = this.props.students.map();
    return (
      <form className="create-class-form" onSubmit={(e)=> console.log(e)}>
        <label htmlFor="name">Class Name</label>
        <input
          className="create-class-name"
          type="text"
          name="name"
          id="name"
        >
        </input>
        <StudentList/>
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