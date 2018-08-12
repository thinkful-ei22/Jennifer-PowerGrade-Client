import React from 'react';
import {connect} from 'react-redux';
import {fetchClasses} from '../../../actions/GET/fetchClasses';
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
        key={`${classItem.id}`}
        className="class-checkbox-list-item"
        component={Input}
        element="checkbox"
        type="checkbox"
        name={`classes.class-${classItem.id}`}
        id={classItem.id}
        label={`${classItem.name}`}>
      </Field>
    ));
    return(
      <fieldset className="class-checkbox-container">
        <legend className="class-checkbox-legend">Assign to a Class</legend>
        {classList}
      </fieldset>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classesCRUDReducer.classes
  };
};

export default requiresLogin()(connect(mapStateToProps)(ClassList));


