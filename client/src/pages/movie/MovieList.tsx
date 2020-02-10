import MovieTable, { IMovieTableEvent } from '../../components/MovieTable';
import { connect } from 'react-redux';
import { IRootReducer } from "../../redux/store";
import { Dispatch } from 'react';
import MovieAction from '../../redux/actions/MovieAction';

function mapStoreToProps(store: IRootReducer) {
    return store.movie;
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvent {
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key: ''
            }))
        },
        onChangeSwitch(type, newVal, id) {
            dispatch(MovieAction.checkedSwitchMovie(type, newVal, id));
        },
        async onDelete(id) {
            await dispatch(MovieAction.deleteMovie(id));
        },
        onChange(pagination){
            dispatch(MovieAction.fetchMovies({
                page: pagination.current
            }))
        },
        onKeyChange(key){
            dispatch(MovieAction.setConditionAction({
                key
            }))
        },
        onSearch(){
            dispatch(MovieAction.fetchMovies({
                page: 1
            }))
        }
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(MovieTable);