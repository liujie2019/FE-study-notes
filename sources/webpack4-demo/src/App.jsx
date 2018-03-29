import React from 'react';
import ReactDOM from 'react-dom';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                Hello Weback 4.x!实现热更新。
                <img src={require('./static/image/stack-head.png')} alt=""/>
            </div>
        )
    }
}