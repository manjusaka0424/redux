import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as action from '@actions/orderList';
import OrderListSearch from './component/orderListSearch';
import OrderTable from './component/orderTable';
import { isEmpty } from '@utils/index';
import './index.less';

const mapStateToProps = state => {
    let { orderList, actionType, loadingType } = state;
    orderList = orderList.toJS();
    return {
        datas: orderList.datas,
        actionType,
        loadingType
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTable: (...args) => dispatch(action.getTable(...args))
});

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        const { getTable } = this.props;
        getTable();
    }

    render() {
        const { loadingType, datas } = this.props;
        return (
            <section className="orderList">
                <OrderListSearch />
                <OrderTable listData={!isEmpty(datas) ? datas.listData : []} isLoading={loadingType.get('getTable')} />
            </section>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));