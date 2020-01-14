import { IMovie } from "../../services/MovieService";
import { IAction } from "./ActionTypes";
import { ICondition } from "../../services/CommonTypes";

/**
 * 设置电影数组
 */
export type SetMovieAction = IAction<'_setMovie', {
    movie: IMovie[];
    total: number;
}>;
export function setMovieAction(movie: IMovie[], total: number): SetMovieAction {
    return {
        type: '_setMovie',
        payload: {
            movie,
            total
        }
    };
};

/**
 * 设置查询条件
 */
export type SetConditionAction = IAction<'_setCondition', ICondition>;
export function setConditionAction(condition: ICondition): SetConditionAction {
    return {
        type: '_setCondition',
        payload: condition
    };
};

/**
 * 设置是否正在加载
 */
export type SetLoadingAction = IAction<'_setLoading', boolean>;
export function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: '_setLoading',
        payload: isLoading
    };
};

/**
 * 删除一个电影
 */
export type DeleteMovieAction = IAction<'_deleteMovie', string>;
export function deleteMovieAction(id: string): DeleteMovieAction {
    return {
        type: '_deleteMovie',
        payload: id
    };
};

export type MovieActions = SetMovieAction | SetConditionAction | SetLoadingAction | DeleteMovieAction;

export default {
    setMovieAction,
    setConditionAction,
    setLoadingAction,
    deleteMovieAction
};
