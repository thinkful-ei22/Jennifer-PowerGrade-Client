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

export class EditAssignmentForm extends React.Component {
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
    const userId = this.props.currentUser._id;
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
    let availableClasses;
    if(this.props.loading === false && this.props.classes !== undefined){
      availableClasses = this.props.classes.filter(classItem => classItem.userId._id === this.props.currentUser._id);
    }else{
      availableClasses = [];
    }
    let categoryOptions;
    if(this.props.catLoading=== true){
      categoryOptions= <option>Loading...</option>;
    }
    if(this.props.catLoading === false){
      categoryOptions = this.props.categories.map((category, i) => (
        <option key={i} value={category._id}>{category.name}</option>
      ));
    }
    const classList = availableClasses.map((classItem, i) => {
      if(this.props.currentAssignment.classes.includes(classItem._id)){
        return (
          <div className="edit-class-checkbox-container" key={classItem._id}>
            <label className="edit-class-checkbox-label" htmlFor={classItem._id}>{classItem.name}</label>
            <input
              onChange={(e)=> {
                if(e.target.checked===true){
                  this.props.dispatch(addAssignmentClass(classItem._id));
                  this.props.dispatch(fetchClasses());
                }
                else if(e.target.checked===false){
                  this.props.dispatch(removeAssignmentClass(classItem._id));
                  this.props.dispatch(fetchClasses());
                }
              }}
              className="class-checkbox-list-item"
              type="checkbox"
              name={classItem.name}
              id={classItem._id}
              defaultChecked>
            </input>
          </div>);
      }
      else{
        return(
          <div className="edit-class-checkbox-container" key={classItem._id}>
            <label className="edit-class-checkbox-label" htmlFor={classItem._id}>{classItem.name}</label>
            <input
              onChange={(e)=> {
                if(e.target.checked===true){
                  this.props.dispatch(addAssignmentClass(classItem._id));
                  this.props.dispatch(fetchClasses());
                }
                else if(e.target.checked===false){
                  this.props.dispatch(removeAssignmentClass(classItem._id));
                  this.props.dispatch(fetchClasses());
                }
              }}
              className="class-checkbox-list-item"
              type="checkbox"
              name={classItem.name}
              id={classItem._id}>
            </input>
          </div>);
      }
    });
    return (
      <form
        id={this.props.currentAssignmentId} 
        className="edit-assignment-form" 
        onSubmit={(e) => {
          e.preventDefault();
          this.closeEditPopup(e);
          this.onSubmit(e);
          this.props.dispatch(fetchAssignments());
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
    currentAssignment: (state.assignmentCRUDReducer.currentAssignment !== null) ? state.assignmentCRUDReducer.currentAssignment : {id: 'none',name: 'Loading', date: '1/6/1988', userId: 'userId', classes: [], categoryId: 'Test', grades: []},
    currentAssignmentId: (state.assignmentCRUDReducer.currentAssignmentId !== null) ? state.assignmentCRUDReducer.currentAssignmentId : '12345',
    categories: state.categoriesCRUDReducer.categories,
    classes: state.classesCRUDReducer.classes,
    currentUser: state.loginReducer.currentUser,
    loading: state.classesCRUDReducer.loading,
    catLoading: state.categoriesCRUDReducer.loading
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditAssignmentForm));