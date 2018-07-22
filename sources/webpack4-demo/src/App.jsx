import React from 'react';
import $ from 'jquery';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Icon, Steps, Upload, Button } from 'antd';
import Routes from './router';
import HocComponent from './User';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/theme/midnight.css');

const Dragger = Upload.Dragger;
const Step = Steps.Step;
const options = {
    lineNumbers: true,
    mode: 'python',
    theme: 'midnight'
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'test',
            num: 0,
            fileList: [],
            uploading: false
        };
    }

    handleUpload() {
        const { fileList } = this.state;
        console.log(fileList);
        const formData = new FormData();
        formData.append('file', fileList[0]);
        console.log(formData);
        console.log(formData.values());
        // this.setState({
        //   uploading: true,
        // });

        // You can use any AJAX library you like
        // reqwest({
        //   url: '//jsonplaceholder.typicode.com/posts/',
        //   method: 'post',
        //   processData: false,
        //   data: formData,
        //   success: () => {
        //     this.setState({
        //       fileList: [],
        //       uploading: false,
        //     });
        //     message.success('upload successfully.');
        //   },
        //   error: () => {
        //     this.setState({
        //       uploading: false,
        //     });
        //     message.error('upload failed.');
        //   },
        // });
        $.ajax({
                url: 'http://example/upload_file.php',
                type: 'POST',
                enctype: 'multipart/form-data',
                contentype: 'text/plain',
                data: formData,
                // 告诉jQuery不要去处理发送的数据
                processData : false,
                // 告诉jQuery不要去设置Content-Type请求头
                contentType : false,
                timeout : 60000, //设置超时时间
                beforeSend: function () {
                    console.log("现在开始上传文件！");
                }
            });
      }

    createMarkup() {
        return {
            __html: 'First and Second and Third'
        };
    }

    // handleClick() {
    //     // this.setState({
    //     //     num: this.state.num + 1
    //     // });
    //     // this.setState({
    //     //     num: this.state.num + 1
    //     // });

    //     // this.setState((preState, props) => ({
    //     //     num: preState.num + 1
    //     // }));
    //     // this.setState((preState, props) => ({
    //     //     num: preState.num + 1
    //     // }));
    //     setTimeout(() => {
    //         this.setState({
    //             num: this.state.num + 1
    //         });
    //         this.setState({
    //             num: this.state.num + 1
    //         });
    //         this.setState({
    //             num: this.state.num + 1
    //         });
    //     }, 0);
    // }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        });
        console.log(this.state.num);
        this.setState({
            num: this.state.num + 1
        });
        console.log(this.state.num);
        setTimeout(() => {
            this.setState({
                num: this.state.num + 1
            });
            console.log(this.state.num);
            this.setState({
                num: this.state.num + 1
            });
            console.log(this.state.num);
        });
    }
    handleChange(val) {
        this.setState({
            value: val
        });
    }
    render() {
        const { value, num, uploading } = this.state;
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  return {
                    fileList: newFileList,
                  };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList
        };
        return (
            <div style={{ marginLeft: 20, padding: 10 }}>
                {/* {Routes} */}
                <span>
                    {num}
                </span>
                {/* <Button type="primary">
                    <Icon type="plus"></Icon>新增app
                </Button> */}
                {/* <Button
                    type="primary"
                    onClick={() => this.handleClick()}
                >
                    test
                </Button> */}
                {/* <div className="codemirror-mid">
                    <CodeMirror
                        value={value}
                        options={options}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ value });
                        }}
                    />
                </div>
                <HocComponent />
                <Steps current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps> */}
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
                <Button
                    className="upload-demo-start"
                    type="primary"
                    onClick={() => this.handleUpload()}
                    disabled={this.state.fileList.length === 0}
                    loading={uploading}
                >
                    {uploading ? 'Uploading' : 'Start Upload' }
                </Button>
            </div>
        );
    }
}