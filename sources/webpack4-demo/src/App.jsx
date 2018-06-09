import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, Icon } from 'antd';
import Routes from './router';
import HocComponent from './User';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/theme/midnight.css');

const options = {
    lineNumbers: true,
    mode: 'python',
    theme: 'midnight'
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'test'
        };
    }

    createMarkup() {
        return {
            __html: 'First and Second and Third'
        };
    }

    // handleClick = () => {
    //     this.setState({
    //         num: this.state.num + 1
    //     });
    // }
    // handleClick() {
    //     this.setState({
    //         num: this.state.num + 1
    //     });
    //     console.log(this.state.num);
    //     this.setState({
    //         num: this.state.num + 1
    //     });
    //     console.log(this.state.num);
    //     setTimeout(() => {
    //         this.setState({
    //             num: this.state.num + 1
    //         });
    //         console.log(this.state.num);
    //         this.setState({
    //             num: this.state.num + 1
    //         });
    //         console.log(this.state.num);
    //     });
    // }
    handleChange(val) {
        this.setState({
            value: val
        });
    }
    render() {
        const { value } = this.state;
        return (
            <div style={{ marginLeft: 20, padding: 10 }}>
                {Routes}
                <Button type="primary">
                    <Icon type="plus"></Icon>新增app
                </Button>
                <div className="codemirror-mid">
                    <CodeMirror
                        value={value}
                        options={options}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ value });
                        }}
                    />
                </div>
                <HocComponent />
            </div>
        );
    }
}