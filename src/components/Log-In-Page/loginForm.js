import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {login} from '../../actions/Log-In-Actions/loginAction';
import Input from '../input';
import {required, nonEmpty} from '../../validators';

class LoginForm extends React.Component {
  render(){
    let error;
    if(this.props.error){
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (   
      <form
        onSubmit={this.props.handleSubmit(values => this.props.dispatch(login(values.username,values.password)))}>
        <div>
          <label htmlFor="username">Username</label>
          <Field 
            component={Input}
            type="text" 
            name="username"
            id="username"
            validate={[required, nonEmpty]}>
          </Field>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field 
            component={Input}
            type="password" 
            name="password"
            id="password"
            validate={[required, nonEmpty]}>
          </Field>
        </div>
        <div className="button-container">
          <button disabled={this.props.pristine||this.props.submitting}>
            Log-In
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch)=> dispatch(focus('login', 'username'))
})(LoginForm);
