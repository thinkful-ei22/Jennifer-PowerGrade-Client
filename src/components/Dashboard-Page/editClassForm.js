import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import {connect} from 'react-redux';
import {editClass} from '../../actions/PUT/editClass';
import StudentList from './studentList';

// class EditClassForm extends React.Component {
let EditClassForm = props => {
  console.log(props.initialValues);
  const { handleSubmit, load, pristine, reset, submitting } = props;

  function onSubmit(values){
    const students = Object.keys(values.students);
    const studentIds = students.map(student => student.slice(8));
    return this.props.dispatch(editClass(values.name, studentIds));
  }
  function closePopupEditClass(e){
    const popup = e.target.parentElement.parentElement;
    if(popup.className === 'edit-class-popup-active'){
      return popup.className = 'edit-class-popup-hidden';
    }
    return;
  }
  return (
    <form className="edit-class-form" onSubmit={handleSubmit(values => onSubmit(values))}>
      <i className="close-form fa fa-times" onClick={(e) => closePopupEditClass(e)}></i>
      <h2>Edit Class</h2>
      <label htmlFor="name">Class Name</label>
      <Field
        className="edit-class-name"
        component="input"
        type="text"
        name="name"
        id="name"
        placeholder="Class Name"
      />
      <StudentList/>
      <div className="edit-class-save-button-container">
        <button className="edit-class-save-button" disabled={pristine||submitting}>
            Save
        </button>
      </div>
    </form>
  );
};
EditClassForm = reduxForm({
  form: 'editClass'
})(EditClassForm);

EditClassForm = connect(
  state => ({
    initialValues: state.classesCRUDReducer.currentClass
    // currentClass: state.classesCRUDReducer.currentClass
  }))(EditClassForm);

export default EditClassForm; 