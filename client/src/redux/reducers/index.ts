// 合并reducer, 并生产一个唯一reducer
import { combineReducers } from 'redux';
import movie from './MovieReducer';

export const rootReducer = combineReducers({
    movie
})