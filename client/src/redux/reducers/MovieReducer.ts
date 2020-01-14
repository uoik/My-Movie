import { IMovie } from "../../services/MovieService";
import { ICondition } from "../../services/CommonTypes";
import { MovieActions, SetMovieAction, SetConditionAction, SetLoadingAction, DeleteMovieAction } from "../actions/MovieAction";
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
    isLoading: false
}

type MovieReducer<A> = Reducer<IMovieState, A>;

const setMovie: MovieReducer<SetMovieAction> = (state, action) => {
    return {
        ...state,
        data: action.payload.movie,
        total: action.payload.total
    }
}

const setCondition: MovieReducer<SetConditionAction> = (state, action) => {
    return {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
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
        total: state.total - 1
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
        default:
            return state;
    }
}
