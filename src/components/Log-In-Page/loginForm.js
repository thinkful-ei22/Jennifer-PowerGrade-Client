import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {login} from '../../actions/AUTH/loginAction';
import Input from '../input';
import {required, nonEmpty} from '../../validators';
import './loginForm.css';

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
      <form
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}>
        {error}
        <Field 
          component={Input}
          element="input"
          type="text" 
          name="username"
          id="li-username"
          label="Username"
          validate={[required, nonEmpty]}>
        </Field>
        <Field 
          component={Input}
          element="input"
          type="password" 
          name="password"
          id="li-password"
          label="Password"
          validate={[required, nonEmpty]}>
        </Field>
        <button className= "button-container" disabled={this.props.pristine||this.props.submitting}>
            Log-In
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch)=> dispatch(focus('login', 'username'))
})(LoginForm);
