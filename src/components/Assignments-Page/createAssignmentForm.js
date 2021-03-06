import React from 'react';
import {createAssignment} from '../../actions/POST/createAssignment';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import { fetchAssignments } from '../../actions/GET/fetchAssignments';
import { fetchClasses } from '../../actions/GET/fetchClasses';

export class CreateAssignmentForm extends React.Component {
  clearValues(e){
    e.target.categoryId.value='0';
    e.target.name.value='';
    e.target.date.value='';
  }
  render (){
    const categoryOptions = this.props.categories.map((category, i) => {
      return(
        <option key={i} value={category._id}>{category.name}</option>
      );
    });
    let classesToAdd = [];
    const availableClasses = this.props.classes.filter(classItem=> classItem.userId._id === this.props.currentUser._id);
    const classList = availableClasses.map((classItem,i) =>{
      return(
        <div className="class-checkbox-container" key={classItem._id}>
          <label className="class-checkbox-label" htmlFor={classItem._id}>{classItem.name}</label>
          <input
            onChange={(e) =>{
              if(e.target.checked===true){
                classesToAdd.push(e.target.id);
              }
              if(e.target.checked===false){
                const indexToDelete = classesToAdd.indexOf(e.target.id);
                classesToAdd.splice(indexToDelete, 1);
              }
            }}
            className="class-checkbox-list-item"
            type="checkbox"
            name={classItem.name}
            id={classItem._id}>
          </input>
        </div>);
    });
    return (
      <form 
        className="create-assignment-form" 
        onSubmit={(e) => {
          e.preventDefault();
          const classes = classesToAdd;
          const name = e.target.name.value;
          const date = e.target.date.value;
          const categoryId = e.target.categoryId.value;
          const userId = this.props.currentUser._id;
          console.log(name, date, classes, userId, categoryId);
          this.props.dispatch(createAssignment(name, date, classes, userId, categoryId));
          this.clearValues(e);
          this.props.dispatch(fetchClasses());
          this.props.dispatch(fetchAssignments());
        }}>
        <label className="assignment-create-label" htmlFor="assignment-create-name">Assignment Name</label>
        <input
          className="assignment-name-create"
          type="text"
          name="name"
          id="assignment-create-name">
        </input>
        <label className="assignment-create-label" htmlFor="assignment-create-date">Assignment Date</label>
        <input
          className="assignment-date-create"
          type="date"
          name="date"
          id="assignment-create-date">
        </input>
        <label className="assignment-create-label" htmlFor="assignment-create-categoryId">Select a Category</label>
        <select
          className="category-select"
          type="select"
          name="categoryId"
          id="assignment-create-categoryId">
          <option value="0"></option>
          {categoryOptions}
        </select>
        <fieldset className="class-checkbox-container">
          <legend className="class-checkbox-legend">Assign to a Class</legend>
          {classList}
        </fieldset>
        <div className="assignment-create-save-button-container">
          <button className="assignment-create-save-button" disabled={this.props.pristine||this.props.submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesCRUDReducer.categories,
    classes: state.classesCRUDReducer.classes,
    currentUser: state.loginReducer.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(CreateAssignmentForm));

