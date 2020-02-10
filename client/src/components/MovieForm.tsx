import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, InputNumber, Switch, Icon, message } from 'antd';
import ImgUploader from './ImgUploader';
import { IMovie } from '../services/MovieService';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { withRouter, RouteComponentProps } from 'react-router';

interface IFormProps extends RouteComponentProps {
    form: WrappedFormUtils
    onSumbit: (movie: IMovie) => Promise<string>
    movie?: IMovie
}

const AllAreas: { label: string, value: string }[] = [
    { label: '广州天河', value: '广州天河' },
    { label: '广州越秀', value: '广州越秀' },
    { label: '广州白云', value: '广州白云' },
    { label: '广州番禺', value: '广州番禺' },
    { label: '广州花都', value: '广州花都' },
];

const AreasGroups = Checkbox.Group;

const AllTypes: { label: string, value: string }[] = [
    { label: '喜剧', value: '喜剧' },
    { label: '科幻', value: '科幻' },
    { label: '恐怖', value: '恐怖' },
    { label: '惊悚', value: '惊悚' },
    { label: '灾难', value: '灾难' },
    { label: '动作', value: '动作' },
    { label: '爱情', value: '爱情' },
];

const TypesGroups = Checkbox.Group;

class MovieForm extends Component<IFormProps> {

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // 阻止默认事件
        const { validateFields } = this.props.form;
        validateFields(async (err, values: IMovie) => {
            if (!err) {
                // 表单验证成功
                const res = await this.props.onSumbit(values);
                if (res) {
                    message.error(res);
                } else {
                    message.success('提交成功', 1, () => {
                        // 跳转页面
                        this.props.history.push('/movie');
                    })
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }

        const tailFormItemLayout = {
            wrapperCol: {
                span: 19,
                offset: 5
            }
        }

        return (
            <Form {...formItemLayout} style={{ "width": "500px" }} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="电影名称">
                    {getFieldDecorator<IMovie>('name', {
                        rules: [{ required: true, message: "电影名称不能为空" }]
                    }
                    )(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="封面海报">
                    {getFieldDecorator<IMovie>('poster')(
                        <ImgUploader />
                    )}
                </Form.Item>

                <Form.Item label="地区">
                    {getFieldDecorator<IMovie>('areas', {
                        rules: [{ required: true, message: "请选择上映地区" }]
                    }
                    )(
                        <AreasGroups options={AllAreas} />
                    )}
                </Form.Item>

                <Form.Item label="电影类型">
                    {getFieldDecorator<IMovie>('types', {
                        rules: [{ required: true, message: "请选择电影类型" }]
                    }
                    )(
                        <TypesGroups options={AllTypes} />
                    )}
                </Form.Item>

                <Form.Item label="电影时长(分)">
                    {getFieldDecorator<IMovie>('timing', {
                        rules: [{ required: true, message: "请输入电影时长" }]
                    })(
                        <InputNumber min={1} step={10} />
                    )}
                </Form.Item>

                <Form.Item label="正在热映">
                    {getFieldDecorator<IMovie>('isHot', {
                        initialValue: false,
                        valuePropName: 'checked'
                    })(
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    )}
                </Form.Item>

                <Form.Item label="即将上映">
                    {getFieldDecorator<IMovie>('isSoon', {
                        initialValue: false,
                        valuePropName: 'checked'
                    })(
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    )}
                </Form.Item>

                <Form.Item label="经典影片">
                    {getFieldDecorator<IMovie>('isClassic', {
                        initialValue: false,
                        valuePropName: 'checked'
                    })(
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    )}
                </Form.Item>

                <Form.Item label="影片描述">
                    {getFieldDecorator<IMovie>('description')(
                        <Input.TextArea />
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout} label="">
                    <Button type='primary' htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

type MovieFields = {
    [P in Exclude<keyof IMovie, '_id'>]: any
}

/**
 * 映射默认属性
 */
function getDefaultField(movie: IMovie): MovieFields {
    const obj: any = {};
    for (const key in movie) {
        obj[key] = Form.createFormField({
            value: movie[key]
        })
    }
    return obj;
}

export default withRouter(Form.create<IFormProps>({
    mapPropsToFields(props) {
        if (props.movie) {
            return getDefaultField(props.movie);
        }
    }
})(MovieForm));