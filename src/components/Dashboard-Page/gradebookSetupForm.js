import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import { setQuizValue, setClassworkValue, setTestValue, setHomeworkValue } from '../../actions/Dashboard-Page-Actions/setCategoryValues';

class GradebookSetupForm extends React.Component {
  onSubmit(values){
    return this.props.dispatch(setTestValue(values.tests))
      .then(()=> this.props.dispatch(setQuizValue(values.quizzes)))
      .then(()=> this.props.dispatch(setClassworkValue(values.classwork)))
      .then(() => this.props.dispatch(setHomeworkValue(values.homework)));
  }
  render (){
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          component={Input}
          element="input"
          type="number"
          name="tests"
          id="tests"
          label="Tests"
        >
        </Field>
        <Field
          component={Input}
          element="input"
          type="number"
          name="quizzes"
          id="quizzes"
          label="Quizzes"
        >
        </Field>
        <Field
          component={Input}
          element="input"
          type="number"
          name="classwork"
          id="classwork"
          label="Classwork"
        >
        </Field>
        <Field
          component={Input}
          element="input"
          type="number"
          name="homework"
          id="homework"
          label="Homework"
        >
        </Field>
        <button disabled={this.props.pristine||this.props.submitting}>
      Save Settings
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'gradebookSetupForm'
})(GradebookSetupForm);