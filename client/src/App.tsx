import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Layout } from './pages/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Route path='/' component={Layout}></Route>
    </Router>
  );
}

export default App;
