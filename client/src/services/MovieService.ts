import axios from 'axios';
import { IResponseData, IResponseError, ICondition, IResponsePageData } from './CommonTypes';

export interface IMovie {
    _id?: string;
    name: string;
    types: string[];
    areas: string[];
    timing: number;
    hot: boolean;
    soon: boolean;
    classics: boolean;
    description?: string;
    poster?: string;
}

export class MovieService {
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.post('/api/movie', movie);
        return data;
    }

    public static async findById(id: string): Promise<IResponseData<IMovie | null>> {
        const { data } = await axios.get('/api/movie/' + id);
        return data;
    }

    public static async find(condition?: ICondition): Promise<IResponsePageData<IMovie[]> | IResponseError> {
        const { data } = await axios.get('/api/movie', { params: condition });
        return data;
    }

    public static async updata(id: string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put('/api/movie/' + id, movie);
        return data;
    }

    public static async delete(id: string): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.delete('/api/movie/' + id);
        return data;
    }
}