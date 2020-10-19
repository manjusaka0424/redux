import React, { Component } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Avatar, Dropdown, Menu, Tag } from 'antd';
import Event from '@utils/event';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { lang: 'zh_CN' };
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        const { history } = this.props;
        localStorage.token = '';
        history.replace('/user/login');
    }

    changeIntl = () => {
        Event.emit('changeLanguage', this.state.lang == 'zh_CN' ? 'en_US' : 'zh_CN');
        this.setState({ lang: this.state.lang == 'zh_CN' ? 'en_US' : 'zh_CN' });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={false} onClick={this.signOut}>
                        退出
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <section className="layoutHeader">
                <div className="headeLeft">
                    {intl.get('订单系统') ? intl.get('订单系统') : intl.get('ORDER-SYSTEM')}
                </div>
                <div className="headerRight">
                    <Tag className="intl" onClick={this.changeIntl}>{this.state.lang == 'zh_CN' ? '中文' : 'English'}</Tag>
                    <span className="message">{intl.get('消息') ? intl.get('消息') : intl.get('MESSAGE')}</span>
                    <Dropdown className="dropDown" overlay={menu}>
                        <div>
                            <Avatar className="avatar" size={28} icon={<UserOutlined />} />
                            <span className="name">{intl.get('飞科') ? intl.get('飞科') : intl.get('FAKER')}</span>
                        </div>
                    </Dropdown>
                </div>
            </section>
        );
    }
}

export default withRouter(Index);