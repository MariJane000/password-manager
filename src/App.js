import React, { Component } from 'react';

import Main from './components/main/Main';
import Header from './components/header/Header'
import { AuthProvider } from './components/auth/AuthContext';
import './App.scss';

class App extends Component {
  render() {
    return (
        <div className="wrapper l-container">
          <AuthProvider>
            <Header />
            <Main />
          </AuthProvider>
        </div>
    );
  }
}

export default App;


