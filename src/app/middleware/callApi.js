import { fetchApi } from '../utils/callApi';

export const CALL_API = Symbol('callApi key');

// Action key that carries API call info interpreted by this Redux middleware.
const callApi = store => next => async (action) => {
    const apiRoutes = action[CALL_API];

    // If it's not a callApi's action skip to next action.
    if (typeof apiRoutes === 'undefined') {
        return next(action);
    }
    const env = process.env.NODE_ENV || 'production'
    const { method, types, params, reqBody, query } = action;

    next({ type: types[0] });
    return fetchApi(env, apiRoutes, method, params, reqBody, query).then(
        response => next({
        data: response.data.data,
        type: types[1],
        }), error => next({
        error: error || 'Something bad happened',
        type: types[2]
        })
    )
}

export default callApi