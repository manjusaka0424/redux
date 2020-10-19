// reducers配置文件
import { routerReducer } from 'react-router-redux';
import orderList from './orderList';
import counter from './counter';

// 保存当前正在执行的action type
const combineReducers = (reducers, loadingType) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, { actionType: action.type, loadingType });
    };
};

const rootReducers = (loadingType) => {
    return combineReducers({
        counter,
        orderList,
        router: routerReducer
    }, loadingType);
};

export default rootReducers;