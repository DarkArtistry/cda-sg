import axios from 'axios';
import cookie from 'js-cookie';

export const fetchApi = (env, apiRoutes, method, params, reqBody, query) => {
    method = method.toUpperCase();
    if (params) {
        let apiArr = apiRoutes.split('/')
        console.log('apiArr => ', apiArr);
        apiRoutes = apiArr.map((queryBreakDown) => {
            let value
            if (queryBreakDown.indexOf(':') > -1) {
            queryBreakDown = queryBreakDown.replace(':', '');
            if (!params) throw Error('No Params');
            value = params[`${queryBreakDown}`];
            } else {
            value = queryBreakDown
            }
            return value
        })
        console.log('apiRoutes1 => ', apiRoutes);
        apiRoutes = apiRoutes.join('/')
        // console.log('apiRoutes2 => ', apiRoutes);
    }
    if (query) {
        // Initialize an array to be joint later after looping through all queries
        let queryArr = [];
        for (const property in query) {
            queryArr[queryArr.length] = `${property}=${query[property]}`
        }
        const queryString = queryArr.join('&')
        // add question mark at the end of api, and include query strings
        apiRoutes = apiRoutes + '?' + queryString
    }
    // console.log("reqBody => ", reqBody);
    let data = reqBody ? reqBody : null
    const accessToken = cookie.get('access_token');
    let headers = {};
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    headers['Content-Type'] =  'application/json';
    const host = process.env.YOUR_BACKEND_API

    const response = axios({
        method: method,
        baseURL: host,
        url: apiRoutes,
        headers,
        data
    });
    // console.log('response : ', response)
    return response
}
