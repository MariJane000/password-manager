import React, { Component } from 'react';

import {AuthConsumer} from '../auth/AuthContext'
import './Header.scss';
import Logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, logout }) => (
          <header className="header">
            <Link
              className="header__logo"
              to="/">
              <img className="logo" src={Logo} alt=""/>
            </Link>
            { isAuth && (
              <button className="header__logout" onClick={logout}>Logout</button>
            )}
          </header>
        )}
      </AuthConsumer>
  );
  }
}

export default Header;


