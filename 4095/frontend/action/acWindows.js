const setUrl = (value) => {
    return {
        type: 'set_url',
        payload: value
    };
};

const setRequestType = (value) => {
    return {
        type: 'set_requestType',
        payload: value
    };
};

const setRequestURLParams = (value) => {
    return {
        type: 'set_requestURLParams',
        payload: value
    };
};

const setRequestHeadersParams = (value) => {
    return {
        type: 'set_requestHeadersParams',
        payload: value
    };
};

const setFormDataParams = (value) => {
    return {
        type: 'set_formDataParams',
        payload: value
    };
};

const setUrlencodedParams = (value) => {
    return {
        type: 'set_urlencodedParams',
        payload: value
    };
};

const setRawParams = (value) => {
    return {
        type: 'set_rawParams',
        payload: value
    };
};

const setPreview = (value) => {
    return {
        type: 'set_Preview',
        payload: value
    };
};

const setStateUrlParams = (value) => {
    return {
        type: 'set_stateUrlParams',
        payload: value
    };
};

const setStateHeadersParams = (value) => {
    return {
        type: 'set_stateHeadersParams',
        payload: value
    };
};

const setActiveButtonParams = (value) => {
    return {
        type: 'set_activeButtonParams',
        payload: value
    };
};

const setHistoryList = (value) => {
    return {
        type: 'set_historyList',
        payload: value
    };
};

export {
    setUrl,
    setRequestType,
    setRequestURLParams,
    setRequestHeadersParams,
    setFormDataParams,
    setUrlencodedParams,
    setRawParams,
    setPreview,

    setStateUrlParams,
    setStateHeadersParams,
    setActiveButtonParams,

    setHistoryList
};
