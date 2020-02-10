import React, { Component } from 'react'
import { Upload, Icon, message, Modal } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

interface IImgUploaderProps {
    value?: string
    onChange?(imgUrl: string): void
}

interface IState {
    isShow: boolean
}

export default class ImgUploader extends Component<IImgUploaderProps, IState> {

    state: IState = {
        isShow: false
    }

    private getUploadContent() {
        if (this.props.value) {
            return null;
        } else {
            return (
                <div>
                    <Icon type="plus" />
                    <div>上传文件</div>
                </div>
            )
        }
    }

    private getFileList(): UploadFile[] {
        if (this.props.value) {
            return [
                {
                    uid: this.props.value,
                    name: this.props.value,
                    url: this.props.value,
                }
            ]
        }
        return [];
    }

    async handleRequest(p: any) {
        let formData = new FormData(); // 创建一个表单对象
        formData.append(p.filename, p.file); // 插入图片数据

        const request = new Request(p.action, {
            method: 'post',
            body: formData
        });
        const resp = await fetch(request).then(resp => resp.json());
        if (resp.error) {
            message.error('上传失败！');
        } else {
            this.props.onChange && this.props.onChange(resp.data);
        }
    }

    render() {
        return (
            <div>
                <Upload
                    name="imgfile"
                    listType="picture-card"
                    accept=".jpg,.png,.gif"
                    action="/api/upload"
                    fileList={this.getFileList()}
                    customRequest={this.handleRequest.bind(this)}
                    onRemove={() => this.props.onChange && this.props.onChange('')}
                    onPreview={() => {
                        this.setState({
                            isShow: true
                        })
                    }}
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal
                visible={this.state.isShow}
                footer={null}
                onCancel={
                    () => {
                        this.setState({
                            isShow: false
                        })
                    }
                }>
                    <img alt="example" style={{ width: '100%' }} src={this.props.value} />
                </Modal>
            </div>
        )
    }
}
