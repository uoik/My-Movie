import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LayoutComp } from './pages/Layout';
import { LoginComp } from './pages/LoginComp';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path='/login' component={LoginComp}></Route>
          <Route path='/' component={LayoutComp}></Route>
        </Router>
      </Provider>
    )
  }
};
