import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {login} from '../../actions/AUTH/loginAction';
import Input from '../input';
import {required, nonEmpty} from '../../validators';
import '../componentStyles.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }
  render() {
    let error;
    if(this.props.error){
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (   
      <form className="login-form"
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}>
        {error}
        <Field 
          className="login-input"
          component={Input}
          element="input"
          type="text" 
          name="username"
          id="li-username"
          label="Username"
          validate={[required, nonEmpty]}>
        </Field>
        <Field 
          className="login-input"
          component={Input}
          element="input"
          type="password" 
          name="password"
          id="li-password"
          label="Password"
          validate={[required, nonEmpty]}>
        </Field>
        <div className="login-button-container">
          <button className="login-button" disabled={this.props.pristine||this.props.submitting}>
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
