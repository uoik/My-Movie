import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import logger from 'redux-logger';
import { IMovieState } from './reducers/MovieReducer';
import  thunk, { ThunkMiddleware } from 'redux-thunk';

export interface IRootReducer {
    movie: IMovieState
}

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<IRootReducer>, logger)
);