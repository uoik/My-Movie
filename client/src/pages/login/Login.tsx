import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { withRouter, RouteComponentProps } from 'react-router';
import { IAccount } from '../../services/CommonTypes';

interface IFormProps extends RouteComponentProps {
    form: WrappedFormUtils
    onSumbit: (value: IAccount) => Promise<string>
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

class Login extends Component<IFormProps> {

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // 阻止默认事件
        const { validateFields } = this.props.form;
        validateFields(async (err, values: IAccount) => {
            if (!err) {
                // 表单验证成功
                const res = await this.props.onSumbit(values);
                if (res) {
                    message.error(res);
                } else {
                    message.success('登录成功', 1, () => {
                        // 跳转页面
                        this.props.history.push('/');
                    })
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='loginPage'>
                <div className='loginContainer'>
                    <h1>欢迎使用电影后台管理系统</h1>
                    <Form {...layout} onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item label="手机号">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: "手机号不能为空" },
                                    { pattern: /(^[1]([3-9])[0-9]{9}$)|(admin)/, message: '请输入正确的手机号' }
                                ]
                            }
                            )(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: "密码不能为空" }]
                            }
                            )(
                                <Input.Password />
                            )}
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Form.create<IFormProps>()(Login));