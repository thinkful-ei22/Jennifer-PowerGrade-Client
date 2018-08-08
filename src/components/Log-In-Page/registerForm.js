import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/Login-Page-Actions/registerAction';
import Input from '../input';
import {login} from '../../actions/Login-Page-Actions/loginAction';
import {required, nonEmpty, matches, length, isTrimmed} from '../../validators';
const passwordLength = length({min: 10, max: 72});
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
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <div> 
          <label htmlFor="firstName">First Name</label>
          <Field
            component={Input}
            type="text"
            id="firstName"
            name="firstName"
            validate = {[required, nonEmpty, isTrimmed]}>
          </Field>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field
            component={Input}
            type="text"
            id="lastName"
            name="lastName"
            validate = {[required, nonEmpty, isTrimmed]}>
          </Field>
        </div> 
        <div>
          <label htmlFor="username">Username</label>
          <Field 
            component={Input}
            type="text"
            id="username"
            name="username"
            validate = {[required, nonEmpty, isTrimmed]}>
          </Field>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field
            component={Input} 
            type="password"
            id="password"
            name="password"
            validate={[required, passwordLength, isTrimmed]}>
          </Field>
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field
            component={Input} 
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            validate={[required, nonEmpty, matchesPassword]}>
          </Field>
        </div>
        <div className="button-container">
          <button
            type="submit" 
            disabled={this.props.pristine||this.props.submitting}>
          Sign-Up
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => 
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);