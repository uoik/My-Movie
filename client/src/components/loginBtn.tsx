import React, { Component } from 'react'
import { Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'

interface IProps extends RouteComponentProps{
    logout: (history: any) => void
}

class LoginBtn extends Component<IProps> {
    render() {
        const user = localStorage.getItem('user');
        return (
            <div>
                <span className='account'>{user}</span>
                <Button onClick={() => {
                    this.props.logout(this.props.history)
                }} type="primary">注销登录</Button>
            </div>
        )
    }
}

export default withRouter(LoginBtn);