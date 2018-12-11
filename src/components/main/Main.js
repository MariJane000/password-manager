import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

import ProtectedRoute from '../../ProtectedRoute';
import Dashboard from '../dashboard/Dashboard';
import RegistrationForm from '../auth/RegistrationForm';
import LoginForm from '../auth/LoginForm';
import './Main.scss'

class Main extends Component {
  render() {
    return (
        <main className="main-content">
          <Switch>
              <Route path='/login' component={LoginForm}/>
              <Route path='/registration' component={RegistrationForm}/>
              <ProtectedRoute path="/" component={Dashboard} />
          </Switch>
        </main>
    );
  }
}

export default Main;


