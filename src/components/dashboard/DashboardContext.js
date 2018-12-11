import React from 'react';
import {getRandomNumber, isDefined, Validators} from '../../helpers';
import {LocalStorage} from '../../helpers';

const DashboardContext = React.createContext();

export default class DashboardProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersPasswords: this.passwords || [],
      currentPassword: this.getClearCurrentPassword(),
      isOpenModal: false,
      currentPasswordIndex: undefined
    };
    this.textError = {
      class: 'is-error',
      message: 'All fields are required'
    };
  }

  get user() {
    return LocalStorage.get('user');
  }

  get passwords() {
    if (!LocalStorage.get(`passwords${this.user.id}`)) {
      LocalStorage.set(`passwords${this.user.id}`, []);
    }

    return LocalStorage.get(`passwords${this.user.id}`);
  }

  set passwords(usersPasswords) {
    LocalStorage.set(`passwords${this.user.id}`, usersPasswords);
  }

  updatePasswordsList = () => {
    this.passwords = this.state.usersPasswords;
  };

  createNewPassword = () => {
    if (!this.state.currentPassword.formValid) {
      return;
    }

    this.setState(
      ({usersPasswords}) => ({
        usersPasswords: [
          ...usersPasswords,
          {...this.state.currentPassword, id: getRandomNumber()}
        ]
      }),
      this.updatePasswordsList
    );

    this.closeModal();
  };

  savePassword = () => {
    this.setState(
      {
        currentPassword: {
          ...this.state.currentPassword,
          formPristine: false
        }
      },
      this.createNewPassword
    );
  };

  deletePassword = passwordIndex => {
    this.setState(
      ({usersPasswords}) => ({
        usersPasswords: [
          ...usersPasswords.slice(0, passwordIndex),
          ...usersPasswords.slice(passwordIndex + 1)
        ]
      }),
      this.updatePasswordsList
    );
  };

  editPassword = () => {
    if (!this.state.currentPassword.formValid) {
      return;
    }
    this.setState(
      ({usersPasswords, currentPassword, currentPasswordIndex}) => ({
        usersPasswords: [
          ...usersPasswords.slice(0, currentPasswordIndex),
          {...currentPassword, id: getRandomNumber()},
          ...usersPasswords.slice(currentPasswordIndex + 1)
        ]
      }),
      this.updatePasswordsList
    );
    this.closeModal();
  };

  handleFormSubmit = () => {
    if (isDefined(this.state.currentPasswordIndex)) {
      this.editPassword();
      return;
    }

    this.savePassword();
  };

  openModal = currentPasswordIndex => {
    this.setState({
      currentPasswordIndex,
      isOpenModal: true,
      currentPassword: isDefined(currentPasswordIndex)
        ? this.state.usersPasswords[currentPasswordIndex]
        : this.getClearCurrentPassword()
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      currentPasswordIndex: null,
      currentPassword: this.getClearCurrentPassword()
    });
  };

  handleInput = (fieldName, event) => {
    let value = event.target.value;
    this.setState(
      {
        currentPassword: {
          ...this.state.currentPassword,
          [fieldName]: value
        }
      },
      this.validateField.bind(this, fieldName, value)
    );
  };

  validateField(fieldName, value) {
    let {
      usernameValid,
      siteValid,
      passwordValid
    } = this.state.currentPassword;
    let isValid = usernameValid && siteValid && passwordValid;

    switch (fieldName) {
      case 'site':
        siteValid = Validators.required(value);
        break;
      case 'username':
        usernameValid = Validators.required(value);
        break;
      case 'password':
        passwordValid = Validators.required(value);
        break;
      default:
        break;
    }
    this.setState(
      {
        currentPassword: {
          ...this.state.currentPassword,
          siteValid: siteValid,
          usernameValid: usernameValid,
          passwordValid: passwordValid,
          formErrors: this.getErrors(isValid, 'message')
        }
      },
      this.validateForm
    );
  }

  validateForm() {
    let {
      siteValid,
      usernameValid,
      passwordValid
    } = this.state.currentPassword;
    let isValid = siteValid && usernameValid && passwordValid;
    this.setState({
      currentPassword: {
        ...this.state.currentPassword,
        formValid: isValid,
        formErrors: this.getErrors(isValid, 'message')
      }
    });
  }

  getErrors = (isValid, type) => {
    let {formPristine} = this.state.currentPassword;
    return isValid || formPristine ? '' : this.textError[type];
  };

  getClearCurrentPassword() {
    return {
      username: '',
      site: '',
      password: '',
      usernameValid: false,
      siteValid: false,
      passwordValid: false,
      formValid: false,
      formPristine: true,
      formErrors: ''
    };
  }

  render() {
    const {
      usersPasswords,
      currentPassword,
      currentPasswordIndex,
      isOpenModal
    } = this.state;
    return (
      <DashboardContext.Provider
        value={{
          usersPasswords: usersPasswords,
          currentPassword: currentPassword,
          currentPasswordIndex: currentPasswordIndex,
          handleFormSubmit: this.handleFormSubmit,
          isOpenModal: isOpenModal,
          deletePassword: this.deletePassword,
          closeModal: this.closeModal,
          openModal: this.openModal,
          handleInput: this.handleInput,
          getErrors: this.getErrors
        }}
      >
        {this.props.children}
      </DashboardContext.Provider>
    );
  }
}

const DashboardConsumer = DashboardContext.Consumer;
export {DashboardConsumer, DashboardContext};
