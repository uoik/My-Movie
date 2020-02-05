import React, { Component } from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer';
import { Table, Switch, Button, Popconfirm, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IMovie } from '../services/MovieService';
import NoImg from '../assets/no.jpg';
import { MovieSwitch } from '../services/CommonTypes';
import { NavLink } from 'react-router-dom';

export interface IMovieTableEvent {
    onLoad(): void,
    onChangeSwitch(type: MovieSwitch, newVal: boolean, id: string): void,
    onDelete(id: string): Promise<void>
}

export default class MovieTable extends Component<IMovieState & IMovieTableEvent> {

    componentDidMount() {
        this.props.onLoad();
    }

    private getColums(): ColumnProps<IMovie>[] {
        return [
            {
                title: '海报',
                dataIndex: 'poster',
                render(poster: string) {
                    if (poster) {
                        return <img className='poster' src={poster} alt='海报图' />
                    } else {
                        return <img className='poster' src={NoImg} alt='暂无图片' />
                    }
                }
            },
            { title: '电影名称', dataIndex: 'name' },
            {
                title: '类型',
                dataIndex: 'types',
                render(types: string[]) {
                    return types.join('丨');
                }
            },
            {
                title: '地区',
                dataIndex: 'areas',
                render(areas: string[]) {
                    return areas.join('丨');
                }
            },
            {
                title: '时长',
                dataIndex: 'timing',
                render(timing: string[]) {
                    return timing + '分钟';
                }
            },
            {
                title: '正在热映',
                dataIndex: 'isHot',
                render: (isHot: boolean, record) => {
                    return <Switch checked={isHot} onChange={
                        checked => {
                            this.props.onChangeSwitch(MovieSwitch.isHot, checked, record._id!);
                        }
                    } />
                }
            },
            {
                title: '即将上线',
                dataIndex: 'isSoon',
                render: (isSoon: boolean, record) => {
                    return <Switch checked={isSoon} onChange={
                        checked => {
                            this.props.onChangeSwitch(MovieSwitch.isSoon, checked, record._id!);
                        }
                    } />
                }
            },
            {
                title: '经典影片',
                dataIndex: 'isClassic',
                render: (isClassic: boolean, record) => {
                    return <Switch checked={isClassic} onChange={
                        checked => {
                            this.props.onChangeSwitch(MovieSwitch.isClassic, checked, record._id!);
                        }
                    } />
                }
            },
            {
                title: '操作',
                dataIndex: '_id',
                render: (id: string) => {
                    return (
                        <div>
                            <NavLink to={'/movie/edit/' + id}>
                                <Button size='small' type="primary">编辑</Button>
                            </NavLink>
                            <Popconfirm
                                title="您确定要删除此电影吗?"
                                onConfirm={async () => {
                                    await this.props.onDelete(id);
                                    message.success('删除成功');
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button size='small' type="danger">删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    render() {
        return (
            <Table rowKey='_id' columns={this.getColums()} dataSource={this.props.data} />
        )
    }
}
