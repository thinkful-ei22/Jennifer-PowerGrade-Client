import React from 'react';
import {editAssignment, addAssignmentClass, removeAssignmentClass} from '../../../actions/PUT/editAssignment';
import {connect} from 'react-redux';
import {fetchAssignments} from '../../../actions/GET/fetchAssignments';
import {fetchCategories} from '../../../actions/GET/fetchCategories';
import {fetchClasses} from '../../../actions/GET/fetchClasses';
import requiresLogin from '../../requiresLogin';
import '../../componentStyles.css';
import '../../componentTabletStyles.css';
import '../../componentMobileStyles.css';

class EditAssignmentForm extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchClasses());
  }
  onSubmit(e){
    const id = e.target.id;
    const name = e.target.name.value;
    const date = e.target.date.value;
    const categoryId = e.target.categoryId.value;
    const grades = this.props.currentAssignment.grades;
    const classes = this.props.currentAssignment.classes;
    const userId = this.props.currentUser.id;
    this.props.dispatch(fetchClasses());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchAssignments());
    this.props.dispatch(editAssignment(id, name, date, userId, classes, categoryId, grades));
  }
  closeEditPopup(e){
    const popup= e.target.parentElement;
    if(popup.className === 'assignment-edit-active col-3'){
      return popup.className = 'assignment-edit-hidden col-3';
    }
    return;
  }
  render (){
    const availableClasses = this.props.classes.filter(classItem => classItem.userId.id === this.props.currentUser.id);
    const categoryOptions = this.props.categories.map((category, i) => (
      <option key={i} value={category.id}>{category.name}</option>
    ));
    const classList = availableClasses.map(classItem => {
      if(this.props.currentAssignment.classes.includes(classItem.id)){
        return (
          <div className="edit-class-checkbox-container" key={classItem.id}>
            <label className="edit-class-checkbox-label" htmlFor={classItem.id}>{classItem.name}</label>
            <input
              onChange={(e)=> {
                if(e.target.checked===true){
                  this.props.dispatch(addAssignmentClass(classItem.id));
                  this.props.dispatch(fetchClasses());
                }
                else if(e.target.checked===false){
                  this.props.dispatch(removeAssignmentClass(classItem.id));
                  this.props.dispatch(fetchClasses());
                }
              }}
              className="class-checkbox-list-item"
              type="checkbox"
              role="checkbox"
              name={classItem.name}
              id={classItem.id}
              defaultChecked>
            </input>
          </div>);
      }
      else{
        return(
          <div className="edit-class-checkbox-container" key={classItem.id}>
            <label className="edit-class-checkbox-label" htmlFor={classItem.id}>{classItem.name}</label>
            <input
              onChange={(e)=> {
                if(e.target.checked===true){
                  this.props.dispatch(addAssignmentClass(classItem.id));
                  this.props.dispatch(fetchClasses());
                }
                else if(e.target.checked===false){
                  this.props.dispatch(removeAssignmentClass(classItem.id));
                  this.props.dispatch(fetchClasses());
                }
              }}
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
          this.closeEditPopup(e);
          this.onSubmit(e);
        }
        }>
        <label className="assignment-edit-label" htmlFor="name">Assignment Name</label>
        <input
          className="assignment-edit-input"
          type="text"
          name="name"
          id="name"
          defaultValue={(this.props.currentAssignment.name !== 'Loading') ? this.props.currentAssignment.name : ''}>
        </input>
        <label className="assignment-edit-label" htmlFor="date">Assignment Date</label>
        <input
          className="assignment-edit-input"
          type="date"
          name="date"
          id="date"
          defaultValue={(this.props.currentAssignment.date !== '1/6/1988') ? this.props.currentAssignment.date : ''}> 
        </input>
        <label className="assignment-edit-label" htmlFor="categoryId">Choose a Category</label>
        <select
          className="assignment-edit-input"
          type="select"
          name="categoryId"
          id="categoryId">
          {categoryOptions}
        </select>
        <fieldset className="edit-class-checkbox-container">
          <legend className="edit-class-checkbox-legend">Assign to a Class</legend>
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