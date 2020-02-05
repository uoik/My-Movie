import { IMovie } from "../../services/MovieService";
import { ICondition } from "../../services/CommonTypes";
import { MovieActions, SetMovieAction, SetConditionAction, SetLoadingAction, DeleteMovieAction, CheckedSwitchAction } from "../actions/MovieAction";
import { Reducer } from "react";

export type Condition = Required<ICondition>;

/**
 * 仓库数据类型
 */
export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[];
    /**
     * 总数据量
     */
    total: number;
    /**
     * 查询条件
     */
    condition: Condition;
    /**
     * 是否正在加载
     */
    isLoading: boolean;
    /**
     * 页码总数
     */
    totalPage: number;
}

/**
 * 仓库默认数据
 */
const defaultState: IMovieState = {
    data: [],
    total: 0,
    condition: {
        page: 1,
        limit: 10,
        key: ''
    },
    isLoading: false,
    totalPage: 0
}

type MovieReducer<A> = Reducer<IMovieState, A>;

const setMovie: MovieReducer<SetMovieAction> = (state, action) => {
    return {
        ...state,
        data: action.payload.movie,
        total: action.payload.total,
        totalPage: Math.ceil(action.payload.total / state.condition.limit)
    }
}

const setCondition: MovieReducer<SetConditionAction> = (state, action) => {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit);
    return newState;
}

const setLoading: MovieReducer<SetLoadingAction> = (state, action) => {
    return {
        ...state,
        isLoading: action.payload
    }
}

const deleteMovie: MovieReducer<DeleteMovieAction> = (state, action) => {
    const data = state.data.filter(i => i._id !== action.payload);
    return {
        ...state,
        data,
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.limit)
    }
}

const checkedSwitch: MovieReducer<CheckedSwitchAction> = (state, action) => {
    // 找到对应ID的电影对象
    const movie = state.data.find(d => d._id === action.payload.id);
    if (!movie) return state;
    // 克隆对象并更改类型
    const newMovie = { ...movie };
    newMovie[action.payload.type] = action.payload.newVal;
    // 将新对象重新放入数组
    const newData = state.data.map(d => {
        if (d._id === action.payload.id) return newMovie;
        else return d;
    })
    return {
        ...state,
        data: newData
    }
}

export default function (state: IMovieState = defaultState, action: MovieActions) {
    switch (action.type) {
        case '_setMovie':
            return setMovie(state, action);
        case '_setCondition':
            return setCondition(state, action);
        case '_setLoading':
            return setLoading(state, action);
        case '_deleteMovie':
            return deleteMovie(state, action);
        case '_checkedSwitch':
            return checkedSwitch(state, action);
        default:
            return state;
    }
}
