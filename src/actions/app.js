import { CALL_API } from '../app/middleware/callApi.js';

export const sampleAction = () => ({
    type: 'SAMPLE_ACTION',
})

export const sampleApiAction = (params, reqBody) => ({
    types: ['POST_SERVICE_REQUEST', 'POST_SERVICE_SUCCESS', 'POST_SERVICE_FAILURE'],
    [CALL_API]: '/first_path_parameter/:id',
    method: 'post',
    params: params, // in this case {id: "someid"}
    reqBody: reqBody, // { ...request body }
})
