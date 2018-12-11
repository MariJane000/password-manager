import React from 'react';
import PasswordField from '../../../passwordField';

const ModalForm = (props) => {
  const {site, username, password, siteValid, usernameValid, passwordValid, formErrors} = props.fields;
  const {handleInput, getErrors} = props;
  return (
    <form className="form">
      <div className="form__error">
        <div className="form__error-text">{formErrors}</div>
      </div>
      <div className="form__field">
        <div className="c-input">
          <label className="c-input__wrapper">
            <input
              className={`c-input__field ${getErrors(siteValid, 'class')}`}
              value={site}
              onChange={handleInput.bind(this, 'site')} />
            <span className="c-input__label">Site<sup>*</sup></span>
          </label>
        </div>
      </div>
      <div className="form__field">
        <div className="c-input">
          <label className="c-input__wrapper">
            <input
              className={`c-input__field ${getErrors(usernameValid, 'class')}`}
              value={username}
              onChange={handleInput.bind(this, 'username')}
            />
            <span className="c-input__label">Username<sup>*</sup></span>
          </label>
        </div>
      </div>
      <div className="form__field">
        <PasswordField
          password={password}
          getErrors={getErrors(passwordValid, 'class')}
          handleFieldChange={handleInput.bind(this, 'password')}
        />
      </div>
    </form>
  )
}

export default ModalForm;