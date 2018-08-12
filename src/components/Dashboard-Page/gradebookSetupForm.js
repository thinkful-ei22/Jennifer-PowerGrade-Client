import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../input';
import { setQuizValue, setClassworkValue, setTestValue, setHomeworkValue } from '../../actions/OTHER/setCategoryValues';

class GradebookSetupForm extends React.Component {
  onSubmit(values){
    this.props.dispatch(setTestValue(values.tests));
    this.props.dispatch(setQuizValue(values.quizzes));
    this.props.dispatch(setClassworkValue(values.classwork));
    this.props.dispatch(setHomeworkValue(values.homework));
  }
  render (){
    return (
      <form className="gradebook-setup-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          className="value-input"
          component={Input}
          element="input"
          type="number"
          name="tests"
          id="tests"
          label="Tests"
        >
        </Field>
        <Field
          className="value-input"
          component={Input}
          element="input"
          type="number"
          name="quizzes"
          id="quizzes"
          label="Quizzes"
        >
        </Field>
        <Field
          className="value-input"
          component={Input}
          element="input"
          type="number"
          name="classwork"
          id="classwork"
          label="Classwork"
        >
        </Field>
        <Field
          className="value-input"
          component={Input}
          element="input"
          type="number"
          name="homework"
          id="homework"
          label="Homework"
        >
        </Field>
        <div className="class-setup-button-container">
          <button className="class-setup-button" disabled={this.props.pristine||this.props.submitting}>
          Save Settings
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'gradebookSetupForm'
})(GradebookSetupForm);