import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import {
    ADD,
    REDUCE
} from '@actions/counter';

const initialState = fromJS({
    count: 0
});

export default createReducer(initialState, {
    [ADD]: (state, { params }) => {
        return state.set('count', params + 1);
    },
    [REDUCE]: (state, { params }) => {
        return state.set('count', params - 1);
    }
});