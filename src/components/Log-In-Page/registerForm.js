import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/Login-Page-Actions/registerAction';
import Input from '../input';
import {login} from '../../actions/Login-Page-Actions/loginAction';
import {required, nonEmpty, matches, length, isTrimmed} from '../../validators';
const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password');
 
export class RegistrationForm extends React.Component {
  onSubmit(values){
    const {username, password, firstName, lastName} = values;
    const user = {username, password, firstName, lastName};
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }
  render(){
    return (
      <form onSubmit={this.props.handleSubmit(values => 
        this.onSubmit(values)
      )}>
        <Field
          component={Input}
          element="input"
          type="text"
          id="firstName"
          name="firstName"
          label="First Name"
          validate = {[required, nonEmpty, isTrimmed]}>
        </Field>
        <Field
          component={Input}
          element="input"
          type="text"
          id="lastName"
          name="lastName"
          label="Last Name"
          validate = {[required, nonEmpty, isTrimmed]}>
        </Field>
        <Field 
          component={Input}
          element="input"
          type="text"
          id="r-username"
          name="username"
          label="Username"
          validate = {[required, nonEmpty, isTrimmed]}>
        </Field>
        <Field
          component={Input}
          element="input" 
          type="password"
          id="r-password"
          name="password"
          label="Password"
          validate={[required, passwordLength, isTrimmed]}>
        </Field>
        <Field
          component={Input}
          element="input" 
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirm Password"
          validate={[required, nonEmpty, matchesPassword]}>
        </Field>
        <button
          type="submit" 
          disabled={this.props.pristine||this.props.submitting}>
          Sign-Up
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => 
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);