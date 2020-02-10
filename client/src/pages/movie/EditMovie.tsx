import React from "react";
import { RouteComponentProps } from "react-router";
import { IMovie, MovieService } from "../../services/MovieService";
import { IResponseError, IResponseData } from "../../services/CommonTypes";
import MovieForm from "../../components/MovieForm";

interface IParams {
    id: string
}

interface EditFormData {
    movie?: IMovie
}

export default class extends React.Component<RouteComponentProps<IParams>, EditFormData> {

    state: EditFormData = {
        movie: undefined
    }

    async componentDidMount(){
        const res:IResponseData<IMovie | null> = await MovieService.findById(this.props.match.params.id);
        if(res.data){
            this.setState({
                movie: res.data
            })
        }
    }

    async handleSumbit(movie: IMovie){
        const res:IResponseError | IResponseData<true> = await MovieService.updata(this.props.match.params.id, movie);
        if(res.error){
            return res.error
        }else {
            return ''
        }
    }

    render() {
        return (
            <MovieForm 
            onSumbit={this.handleSumbit.bind(this)}
            movie={this.state.movie}
            />
        );
    }
}