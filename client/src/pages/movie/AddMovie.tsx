import React from "react";
import MovieForm from "../../components/MovieForm";
import { IMovie, MovieService } from "../../services/MovieService";
import { IResponseError, IResponseData } from "../../services/CommonTypes";

export default class extends React.Component {
    async handleSumbit(movie: IMovie){
        const res:IResponseError | IResponseData<IMovie> = await MovieService.add(movie);
        if(res.error){
            return res.error
        }else {
            return ''
        }
    }

    render() {
        return (
            <MovieForm onSumbit={this.handleSumbit}/>
        );
    }
}