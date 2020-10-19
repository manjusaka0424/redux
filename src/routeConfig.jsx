// 路由配置文件
import React, { lazy } from 'react';
import PrivateRoute from '@components/PrivateRoute/index';

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard"*/'@pages/Dashboard/index'));
const orderList = lazy(() => import(/* webpackChunkName: "orderList"*/'@pages/orderList/index'));
const addGoods = lazy(() => import(/* webpackChunkName: "addGoods"*/'@pages/AddGoods/index'));
const Counter = lazy(() => import(/* webpackChunkName: "Counter"*/'@pages/Counter/index'));
const Login = lazy(() => import(/* webpackChunkName: "Login"*/'@pages/User/login'));
const Error = lazy(() => import(/* webpackChunkName: "Error"*/'@pages/User/error'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "ErrorPage"*/'@pages/Error/index'));

const routes = [
    {
        // 登录页
        path: '/user/login',
        component: Login
    },
    {
        // 仪表盘页
        path: '/dashboard',
        component: Dashboard
    },
    {
        // 订单列表页
        path: '/order/list',
        component: orderList
    },
    {
        // 添加商品页
        path: '/add/goods',
        component: addGoods
    },
    {
        // 计数器页
        path: '/counter',
        component: Counter
    },
    {
        // 权限或者404页面
        path: '/error',
        component: Error
    },
    {
        // 错误页面
        path: '/errorPage',
        component: ErrorPage
    }
];

const RouteWithSubRoutes = route => <PrivateRoute exact path={route.path} component={route.component} />;

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;