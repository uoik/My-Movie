import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LayoutComp } from './pages/Layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/' component={LayoutComp}></Route>
      </Router>
    </Provider>
  );
}

export default App;
