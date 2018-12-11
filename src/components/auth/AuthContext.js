import React from 'react';
import {withRouter} from "react-router-dom";

import {LocalStorage, getRandomNumber} from '../../helpers';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: !!this.user,
    serverError: ""
  }

  get user() {
    return LocalStorage.get('user');
  }
  get users() {
    if (!LocalStorage.get('users')) {
      return [];
    }
    return LocalStorage.get('users');
  }

  set users(updateUsers) {
    LocalStorage.set('users', updateUsers);
  }

  set user(user) {
    LocalStorage.set('user', user);
  }

  login = (loginInfo) => {
    const user = this.users.find(userItem => userItem.email === loginInfo.email);
    if (!user) {
      this.setState({
        serverError: "No such user"
      })
      return;
    }
    if (loginInfo.password === user.password) {
      this.setState({
        isAuth: true,
        serverError: ""
      }, () => {
        this.user = user;
        this.props.history.push("/");
      });
    } else {
      this.setState({
        serverError: "Incorrect email/password combination"
      });
    }
  }

  logout = () => {
    this.setState({isAuth: false})
    LocalStorage.remove('user');
  }

  registration = (user) => {
    const userRegistered = this.users.find(userItem => userItem.email === user.email);
    if (userRegistered) {
      this.setState({
        serverError: "User account already exists"
      });
      return
    }
    this.users = [...this.users, {...user, id: getRandomNumber()}];
    this.login(user);
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          serverError: this.state.serverError,
          login: this.login,
          logout: this.logout,
          registration: this.registration,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer
const AuthProviderWithRouter = withRouter(AuthProvider);
export {AuthProviderWithRouter as AuthProvider, AuthConsumer};
