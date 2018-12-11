import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {AuthConsumer} from './AuthContext'
import PasswordField from '../passwordField'
import {Validators} from '../../helpers';

class RegistrationForm extends Component {
  state = {
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    firstNameValid: false,
    secondNameValid: false,
    emailValid: false,
    passwordValid: false,
    formValid: false,
    formPristine: true,
    formErrors: '',
    isShowServerErrors: false
  }
  textError = {
    class: 'is-error',
    message: 'Invalid registration data'
  }

  handleSubmit = (registration, event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      formPristine: false
    }, this.validateForm);
    if (this.state.formValid) {
      registration(this.state);
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
    let {emailValid, passwordValid, firstNameValid, secondNameValid} = this.state;
    let isValid = emailValid && passwordValid && firstNameValid && secondNameValid;
    switch (fieldName) {
      case 'email':
        emailValid = Validators.emailValidator(value);
        break;
      case 'password':
        passwordValid = Validators.minLength(value, 6);
        break;
      case 'firstName':
        firstNameValid = Validators.minLength(value, 2);
        break;
      case 'secondName':
        secondNameValid = Validators.minLength(value, 2);
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      emailValid: emailValid,
      passwordValid: passwordValid,
      firstNameValid: firstNameValid,
      secondNameValid: secondNameValid,
      formErrors: this.getErrors(isValid, 'message')
    }, this.validateForm);
  }

  validateForm() {
    let {emailValid, passwordValid, firstNameValid, secondNameValid} = this.state;
    let isValid = emailValid && passwordValid && firstNameValid && secondNameValid;
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

  handleClearForm = () => {
    this.setState({
      ...this.state,
      firstName: "",
      secondName: "",
      email: "",
      password: ""
    })
  }

  render() {
    const {
      firstName,
      secondName,
      email,
      password,
      firstNameValid,
      secondNameValid,
      emailValid,
      passwordValid,
      formErrors,
      isShowServerErrors
    } = this.state;

    return (
      <div className="auth">
        <AuthConsumer>
          {({registration, serverError}) => (
            <div className="auth__inner">
              <div className="auth__content">
                <div className="auth__wrapper">
                  <div className="auth__title">Register</div>
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
                              className={`c-input__field ${this.getErrors(firstNameValid, 'class')}`}
                              value={firstName}
                              onChange={this.handleFieldChange.bind(this, 'firstName')} />
                            <span className="c-input__label">First name <sup>*</sup></span>
                          </label>
                        </div>
                      </div>
                      <div className="form__field">
                        <div className="c-input">
                          <label className="c-input__wrapper">
                            <input
                              className={`c-input__field ${this.getErrors(secondNameValid, 'class')}`}
                              value={secondName}
                              onChange={this.handleFieldChange.bind(this, 'secondName')} />
                            <span className="c-input__label">Second name <sup>*</sup></span>
                          </label>
                        </div>
                      </div>
                      <div className="form__field">
                        <div className="c-input">
                          <label className="c-input__wrapper">
                            <input
                              className={`c-input__field ${this.getErrors(emailValid, 'class')}`}
                              type="email"
                              value={email}
                              onChange={this.handleFieldChange.bind(this, 'email')} />
                            <span className="c-input__label">Email <sup>*</sup></span>
                          </label>
                        </div>
                      </div>
                      <div className="form__field">
                        <PasswordField
                          password={password}
                          getErrors={this.getErrors(passwordValid, 'class')}
                          handleFieldChange={this.handleFieldChange.bind(this, 'password')}
                        />
                      </div>
                      <div className="form__btn">
                        <button className="c-btn" onClick={this.handleSubmit.bind(this, registration)}> Register
                          <span className="c-btn__decor c-btn__decor--left"></span>
                          <span className="c-btn__decor c-btn__decor--right"></span>
                        </button>
                      </div>
                    </form>
                    <div className="auth__sub-title auth__sub-title--bottom">
                      Do you already have an account?&nbsp;
                      <Link
                        className="auth__link c-link"
                        to="/login">
                        Login here.
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

export default RegistrationForm;
