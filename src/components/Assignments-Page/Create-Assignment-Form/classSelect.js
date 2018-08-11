import React from 'react';
import {connect} from 'react-redux';
import {fetchClasses} from '../../../actions/Grades-Page-Actions/fetchClasses';
import requiresLogin from '../../requiresLogin';
import {Field} from 'redux-form';
import Input from '../../input';
import './classSelect.css';

class ClassList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchClasses());
  }
  render(){
    const classList = this.props.classes.map(classItem => (
      <Field 
        className="class-option"
        component={Input}
        element="checkbox"
        type="checkbox"
        name={`${classItem.id}`}
        id={classItem.id}
        label={`${classItem.name}`}>
      </Field>
    ));
    return(
      <fieldset>
        <legend>Assign to a Class</legend>
        {classList}
      </fieldset>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.fetchClassesReducer.classes
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassList));


