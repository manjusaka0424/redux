/*
 * 路由权限配置页面
 * @Date: 2019-07-18 10:33:21
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined, EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['/dashboard'],
            // 当前页面路径
            pathname: ''
        };
    }

    componentDidMount() {
        const { location: { pathname } } = this.props;
        this.setState({
            selectedKeys: [pathname],
            pathname
        });
    }

    static getDerivedStateFromProps(props, state) {
        if(props.location.pathname != state.pathname) {
            return {
                pathname: props.location.pathname,
                selectedKeys: [props.location.pathname]
            };
        }
        return state;
    }

    render() {
        const { selectedKeys } = this.state;
        return (
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['/dashboard']}
                selectedKeys={selectedKeys}
                onClick={({ key }) => {
                    this.props.history.push(key);
                    this.setState({ selectedKeys: [key] });
                }}
            >
                <Menu.Item key="/dashboard">
                    <HomeOutlined />
                    <span>
                        工作台
                    </span>
                </Menu.Item>
                <Menu.Item key="/order/list">
                    <ShoppingCartOutlined />
                    <span>
                        订单管理
                    </span>
                </Menu.Item>
                <Menu.Item key="/add/goods">
                    <ShoppingCartOutlined />
                    <span>
                        添加商品
                    </span>
                </Menu.Item>
                <Menu.Item key="/counter">
                    <EditOutlined />
                    <span>
                        计数器
                    </span>
                </Menu.Item>
                <Menu.Item key="/errorPage">
                    <span>
                        测试sentry
                    </span>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(Index);
