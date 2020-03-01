import React from "react";
import Login from './login/Login';
import { LoginService } from "../services/LoginService";
import { IResponseData, IResponseError, IAccount } from "../services/CommonTypes";

export class LoginComp extends React.Component {
    async handleSumbit(value: IAccount) {
        const res: IResponseData<object> | IResponseError = await LoginService.verify(value);
        if (res.error) {
            return res.error
        } else {
            localStorage.setItem('user', value.phone);
            return ''
        }
    }

    render() {
        return (
            <Login onSumbit={this.handleSumbit} />
        );
    }
}