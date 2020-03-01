import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

class Home extends React.Component<RouteComponentProps> {
    render() {
        if(!localStorage.getItem('user')){
            this.props.history.push('/login');
        }
        return (
            <h1>欢迎使用电影管理系统</h1>
        );
    }
}

export default withRouter(Home);