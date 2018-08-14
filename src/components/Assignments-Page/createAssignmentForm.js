import React from 'react';
import {createAssignment} from '../../actions/POST/createAssignment';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';
import '../componentMobileStyles.css';

class CreateAssignmentForm extends React.Component {

  render (){
    const categoryOptions = this.props.categories.map((category, i) => (
      <option key={i} value={category.id}>{category.name}</option>
    ));
    const classesToAdd = [];
    const availableClasses = this.props.classes.filter(classItem=> classItem.userId.id === this.props.currentUser.id);
    const classList = availableClasses.map(classItem =>{
      return(
        <div key={classItem.id}>
          <label htmlFor={classItem.id}>{classItem.name}</label>
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
            id={classItem.id}>
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
          const userId = this.props.currentUser.id;
          return this.props.dispatch(createAssignment(name, date, classes, userId, categoryId));
        }}>
        <label htmlFor="name">Assignment Name</label>
        <input
          className="assignment-name-create"
          type="text"
          name="name"
          id="name">
        </input>
        <label htmlFor="date">Assignment Date</label>
        <input
          className="assignment-date-create"
          type="date"
          name="date"
          id="date">
        </input>
        <select
          type="select"
          name="categoryId"
          id="categoryId">
          <option>Choose a Category</option>
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

