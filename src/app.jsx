import React from 'react';
import { ConfigProvider } from 'antd';
import * as Sentry from '@sentry/react';
import dayjs from 'dayjs';
import intl from 'react-intl-universal';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import { Provider } from 'react-redux';
import { Switch, Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
// import reduxMiddleware from 'redux-promise-plus';
import isPromise from 'is-promise';
import { createHashHistory } from 'history';
import Home from '@src/pages/Home/index';
import ErrorBoundary from '@components/ErrorBoundary/index';
import Login from '@src/pages/User/login';
import rootReducers from '@reducers/rootReducers';
import Event from '@utils/event';
import '@mock/mock.js';
import './styles/index.less';

const history = createHashHistory();

let loadingType = new Map();

Sentry.init({ dsn: 'https://e739481dadcf450b89dde7222210cea9@o414598.ingest.sentry.io/5310162' });

function reduxMiddleware({ dispatch }) {
    return next => action => {
        if(isPromise(action.payload)) {
            loadingType.set(action.type, true);
            dispatch({ ...action, payload: {} });
            return action.payload
                .then(result => {
                    loadingType.set(action.type, false);
                    dispatch({ ...action, payload: result });
                })
                .catch(error => {
                    loadingType.set(action.type, false);
                    dispatch({ ...action, payload: error, error: true});
                });
        }
        return next(action);
    };
}

const store = createStore(
    rootReducers(loadingType),
    applyMiddleware(reduxMiddleware)
);

const locales = {
    'en_US': require('./locales/en_US.json'),
    'zh_CN': require('./locales/zh_CH.json')
};

// if (module.hot) {
//     module.hot.accept();
// }

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            antdLang: 'zh_CN'
        };
    }

    componentDidMount() {
        this.loadLocales();
        Event.on('changeLanguage', (obj) => {
            dayjs.locale(obj.args == 'zh_CN' ? 'zh-cn' : 'en-us');
            this.loadLocales(obj.args);
        });
    }

    loadLocales(lang = 'zh_CN') {
        intl.init({
            currentLocale: lang,
            locales
        }).then(() => {
            this.setState({
                antdLang: lang == 'zh_CN'
            });
        });
    }

    render() {
        return (
            <ConfigProvider locale={this.state.antdLang ? zh_CN : en_US}>
                <Provider store={store} >
                    <Router history={history}>
                        <Switch>
                            <Route path="/user/login" exact component={Login} />
                            <ErrorBoundary>
                                <Home />
                            </ErrorBoundary>
                        </Switch>
                    </Router>
                </Provider>
            </ConfigProvider>
        );
    }
}
