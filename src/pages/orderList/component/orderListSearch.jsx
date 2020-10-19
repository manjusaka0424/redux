import React, { Component } from 'react';
import { Button, Select, Input, Form } from 'antd';
import Icon from '@components/Icon/index';
import './orderListSearch.less';

const colWidth = 150;
const { Option } = Select;

class orderListSearch extends Component {
    constructor(props) {
        super(props);
    }

    // 表单提交
    handleSubmit = values => {
        console.log('Success:', values);
    }

    render() {
        return (
            <section className="orderListSearch">
                <article>
                    <Form layout="inline"
                        name="orderListSearch"
                        onFinish={this.handleSubmit}
                    >
                        <Form.Item
                            label="订单编号"
                            name="orderId"
                        >
                            <Input placeholder="请输入订单编号" style={{ width: colWidth }} />
                        </Form.Item>
                        <Form.Item
                            label="客户名称"
                            name="customerName"
                        >
                            <Input placeholder="请输入客户名称" style={{ width: colWidth }} />
                        </Form.Item>
                        <Form.Item
                            label="下单方式"
                            name="placeOrder"
                        >
                            <Select
                                allowClear
                                style={{ width: colWidth }}
                                placeholder="请选择下单方式"
                            >
                                <Option value={1}>自主下单</Option>
                                <Option value={2}>代下单</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <article className="button">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<Icon type="icon-shipin" />}
                                >
                                    提交
                                </Button>
                            </article>
                        </Form.Item>
                    </Form>
                </article>
            </section>
        );
    }
}

export default orderListSearch;