import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

store.dispatch(MovieAction.fetchMovies({
   page: 2
})).then(() => {
   store.dispatch(MovieAction.deleteMovie("5e1b22074161231fe47c0f5c"));
})

ReactDOM.render(<App />, document.getElementById('root'));
