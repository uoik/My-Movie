import React from "react";
import { RouteComponentProps } from "react-router";

interface IParams {
    id: string
}

export default class extends React.Component<RouteComponentProps<IParams>> {
    render() {
        console.log(this.props.match.params.id);
        return (
            <h1>修改电影</h1>
        );
    }
}