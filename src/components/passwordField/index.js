import React from 'react';
import {ReactComponent as RevealIcon} from '../../assets/icons/reveal.svg';
import {visibilityToggler} from '../../decorators';

const PasswordField = ({
  password,
  handleFieldChange,
  getErrors,
  type,
  isShow,
  toggleVisibility
}) => {
  return (
    <div className="c-input">
      <div className="c-input__wrapper">
        <input
          type={isShow ? 'text' : 'password'}
          className={`c-input__field ${getErrors}`}
          value={password}
          onChange={handleFieldChange}
        />
        <span className="c-input__label">
          Password
                    {type === 'login' ? null : <sup>*</sup>}
        </span>
        <button
          type="button"
          className={`c-input__field-btn ${
            isShow ? 'is-active' : ''
            }`}
          onClick={toggleVisibility}
        >
          <RevealIcon />
        </button>
      </div>
    </div>
  );
};

export default visibilityToggler(PasswordField);
