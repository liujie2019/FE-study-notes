import React, { Fragment } from 'react';
import _ from 'lodash';

export default class Study extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                num: 0
            }
        };
    }
    handleClick = () => {
        const obj = _.cloneDeep(this.state.obj);
        obj.num = 2;
        this.setState({ obj: obj });
        console.log(this.state.obj.num);
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.handleClick}>{`Study${this.state.obj.num}`}</button>
            </Fragment>
        );
    }
}