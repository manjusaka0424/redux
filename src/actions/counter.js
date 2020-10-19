export const ADD = 'add';
export function add(params) {
    return {
        type: ADD,
        params
    };
}

export const REDUCE = 'reduce';
export function reduce(params) {
    return {
        type: REDUCE,
        params
    };
}