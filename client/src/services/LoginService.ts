import axios from 'axios';
import { IResponseData, IResponseError } from './CommonTypes';

export class LoginService{
    public static async verify(value: object): Promise<IResponseData<object> | IResponseError> {
        const { data } = await axios.post('/api/login', value);
        return data;
    }
}
