import React from 'react';
import {editAssignment} from '../../../actions/PUT/editAssignment';
import {connect} from 'react-redux';
import {fetchCategories} from '../../../actions/GET/fetchCategories';
import requiresLogin from '../../requiresLogin';
import '../../componentStyles.css';
import '../../componentMobileStyles.css';

class EditAssignmentForm extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchCategories());
  }
  render (){
    const availableClasses = this.props.classes.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const currentClasses = [...availableClasses];
    const categoryOptions = this.props.categories.map((category, i) => (
      <option key={i} value={category.id}>{category.name}</option>
    ));
    const classList = availableClasses.map(classItem => {
      if(this.props.currentAssignment.classes.includes(classItem.id)){
        return (
          <div key={classItem.id}>
            <label htmlFor={classItem.id}>{classItem.name}</label>
            <input
              className="class-checkbox-list-item"
              type="checkbox"
              name={classItem.name}
              id={classItem.id}
              checked>
            </input>
          </div>);
      }
      else{
        return(
          <div key={classItem.id}>
            <label htmlFor={classItem.id}>{classItem.name}</label>
            <input
              className="class-checkbox-list-item"
              type="checkbox"
              name={classItem.name}
              id={classItem.id}>
            </input>
          </div>);
      }
    });
    return (
      <form
        id={(this.props.currentAssignment.id !== null) ? `${this.props.currentAssignment.id}`: 'id'} 
        className="edit-assignment-form" 
        onSubmit={(e) => {
          e.preventDefault();
          const id = e.target.id;
          const name = e.target.name.value;
          const date = e.target.date.value;
          const categoryId = e.target.categoryId.value;
          const grades = this.props.currentAssignment.grades;
          const classes = currentClasses.map(classItem => classItem.id);
          const userId = this.props.currentUser.id;
          return this.props.dispatch(editAssignment(id, name, date, userId, classes, categoryId, grades));
        }
        }>
        <label htmlFor="name">Assignment Name</label>
        <input
          className="assignment-name-edit"
          type="text"
          name="name"
          id="name"
          defaultValue={(this.props.currentAssignment.name !== 'Loading') ? this.props.currentAssignment.name : ''}>
        </input>
        <label htmlFor="date">Assignment Date</label>
        <input
          className="assignment-date-edit"
          type="date"
          name="date"
          id="date"
          defaultValue={(this.props.currentAssignment.date !== '1/6/1988') ? this.props.currentAssignment.date : ''}> 
        </input>
        <label htmlFor="categoryId">Choose a Category</label>
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
        <div className="assignment-edit-save-button-container">
          <button className="assignment-edit-save-button" disabled={this.props.pristine||this.props.submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    grades: state.gradesCRUDReducer.grades,
    currentAssignment: (state.assignmentCRUDReducer.currentAssignment !== null) ? state.assignmentCRUDReducer.currentAssignment : {name: 'Loading', date: '1/6/1988', userId: 'userId', classes: [], categoryId: 'Test', grades: []},
    categories: state.categoriesCRUDReducer.categories,
    classes: state.classesCRUDReducer.classes,
    currentUser: state.loginReducer.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditAssignmentForm));