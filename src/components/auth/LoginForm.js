import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {AuthConsumer} from './AuthContext'
import PasswordField from '../passwordField'
import {Validators} from '../../helpers';

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailValid: false,
    passwordValid: false,
    formValid: false,
    formPristine: true,
    formErrors: '',
    isShowServerErrors: false
  }

  textError = {
    class: 'is-error',
    message: 'Invalid email or password '
  }

  handleSubmit = (login, event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      formPristine: false
    }, this.validateForm);
    if (this.state.formValid) {
      login(this.state, event)
      this.setState({isShowServerErrors: true});
    }
  }
  handleFieldChange(fieldName, event) {
    let value = event.target.value
    this.setState({
      ...this.state,
      [fieldName]: value,
      isShowServerErrors: false
    }, this.validateField.bind(this, fieldName, value));
  }

  validateField(fieldName, value) {
    let {emailValid, passwordValid} = this.state;
    let isValid = emailValid && passwordValid;
    switch (fieldName) {
      case 'email':
        emailValid = Validators.emailValidator(value);
        break;
      case 'password':
        passwordValid = Validators.minLength(value, 6);
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      emailValid: emailValid,
      passwordValid: passwordValid,
      formErrors: this.getErrors(isValid, 'message')
    }, this.validateForm);
  }

  validateForm() {
    let {emailValid, passwordValid} = this.state;
    let isValid = emailValid && passwordValid;
    this.setState({
      ...this.state,
      formValid: isValid,
      formErrors: this.getErrors(isValid, 'message')
    });
  }

  getErrors(isValid, type) {
    let {formPristine} = this.state;
    return (isValid || formPristine) ? '' : this.textError[type];
  }


  render() {
    const {
      email,
      password,
      emailValid,
      passwordValid,
      formErrors,
      isShowServerErrors
    } = this.state;

    return (
      <div className="auth">
        <AuthConsumer>
          {({login, serverError}) => (
            <div className="auth__inner">
              <div className="auth__content">
                <div className="auth__wrapper">
                  <div className="auth__title">Login</div>
                  <div className="auth__form">
                    <form className="form">
                      <div className="form__error">
                        <div className="form__error-text">{formErrors}</div>
                        <div className="form__error-text">{isShowServerErrors && serverError}</div>
                      </div>
                      <div className="form__field">
                        <div className="c-input">
                          <label className="c-input__wrapper">
                            <input
                              className={`c-input__field ${this.getErrors(emailValid, 'class')}`}
                              value={email}
                              onChange={this.handleFieldChange.bind(this, 'email')} />
                            <span className="c-input__label">Email</span>
                          </label>
                        </div>
                      </div>
                      <div className="form__field">
                        <PasswordField
                          type='login'
                          password={password}
                          getErrors={this.getErrors(passwordValid, 'class')}
                          handleFieldChange={this.handleFieldChange.bind(this, 'password')}
                        />
                      </div>
                      <div className="form__btn">
                        <button className="c-btn" onClick={this.handleSubmit.bind(this, login)}>
                          Login
                          <span className="c-btn__decor c-btn__decor--left"></span>
                          <span className="c-btn__decor c-btn__decor--right"></span>
                        </button>
                      </div>
                    </form>
                    <div className="auth__sub-title auth__sub-title--bottom">
                      Are you a new user?&nbsp;
                      <Link
                        className="auth__link c-link"
                        to="/registration">
                        Register here.
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AuthConsumer>
      </div>
    );
  }
}

export default LoginForm;


