import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

store.dispatch(MovieAction.setLoadingAction(true));
store.dispatch(MovieAction.setConditionAction({
    page: 2,
    key: '5'
}));

ReactDOM.render(<App />, document.getElementById('root'));
