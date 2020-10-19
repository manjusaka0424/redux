import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '@actions/counter';
import './index.less';

const mapStateToProps = state => {
    const { counter } = state;
    return {
        counter: counter.toJS()
    };
};

const mapDispatchToProps = (dispatch) => ({
    add: (...args) => dispatch(action.add(...args)),
    reduce: (...args) => dispatch(action.reduce(...args))
});

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="counter">
                <button onClick={() => this.props.add(this.props.counter.count)}>+</button>
                <span>count is: {this.props.counter.count}</span>
                <button onClick={() => this.props.reduce(this.props.counter.count)}>-</button>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);