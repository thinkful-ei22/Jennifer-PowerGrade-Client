import React from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../../../actions/GET/fetchCategories';
import requiresLogin from '../../requiresLogin';
import {Field} from 'redux-form';
import '../../componentStyles.css';
import '../../componentMobileStyles.css';

class CategoryList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchCategories());
  }
  render(){
    const categoryOptions = this.props.categories.map((category, i) => (
      <option key={i} value={category.id}>{category.name}</option>
    ));
    return(
      <Field
        className='category-select'
        component="select"
        element="select"
        type="select"
        name="categoryId"
        id="categoryId"
        label='Select a Category'>
        <option>Choose a Category</option>
        {categoryOptions}
      </Field>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesCRUDReducer.categories
  };
};

export default requiresLogin()(connect(mapStateToProps)(CategoryList));


