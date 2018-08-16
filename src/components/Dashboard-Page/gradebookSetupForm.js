import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import { editCategory } from '../../actions/PUT/editCategoryValues';
import { fetchCategories } from '../../actions/GET/fetchCategories';

class GradebookSetupForm extends React.Component { 
  componentDidMount(){
    this.props.dispatch(fetchCategories());
  }
  onSubmit(e){
    this.props.dispatch(editCategory(e.target.Test.id, e.target.Test.name, e.target.Test.value/100));
    this.props.dispatch(editCategory(e.target.Quiz.id, e.target.Quiz.name, e.target.Quiz.value/100));
    this.props.dispatch(editCategory(e.target.Classwork.id, e.target.Classwork.name, e.target.Classwork.value/100));
    this.props.dispatch(editCategory(e.target.Homework.id, e.target.Homework.name, e.target.Homework.value/100));
  }
  closePopup(e){
    const popup = e.target.parentElement;
    if(popup.className === 'gradebook-setup-popup-active col-2'){
      return popup.className = 'gradebook-setup-popup-hidden col-2';
    }
  }
  render (){
    const categoryInputs = this.props.categories.map(
      category => {
        return (
          <div className="input-container" key={category.id}>
            <label htmlFor={category.id}>{category.name}</label>
            <input
              className="value-input"
              type="number"
              name={category.name}
              id={category.id}
              defaultValue={category.value*100}>
            </input>
          </div>
        );
      });
    return (
      <form className="gradebook-setup-form" onSubmit={e => {
        e.preventDefault();
        this.onSubmit(e);
        this.closePopup(e);
      }}>
        {categoryInputs}
        <div className="class-setup-button-container">
          <button className="class-setup-button" disabled={this.props.pristine||this.props.submitting}>
          Save Settings
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesCRUDReducer.categories,
  };
};

export default requiresLogin()(connect(mapStateToProps)(GradebookSetupForm));