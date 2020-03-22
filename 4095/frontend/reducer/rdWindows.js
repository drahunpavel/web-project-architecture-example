const initialState = {
    url: '',
    requestType: 'GET',
    requestURLParams: [{ key: '', value: '' }],
    requestHeadersParams: [{ key: '', value: '' }],
    formDataParams: [{ key: '', value: '' }],
    urlencodedParams: [{ key: '', value: '' }],
    rawParams: '',
    preview: ''
};

export default function windows(state = initialState, action) {
    switch (action.type) {
        case 'set_url':
            return { ...state, url: action.payload }
        case 'set_requestType':
            return { ...state, requestType: action.payload }
        case 'set_requestURLParams':
            return { ...state, requestURLParams: action.payload }
        case 'set_requestHeadersParams':
            return { ...state, requestHeadersParams: action.payload }
        case 'set_formDataParams':
            return { ...state, formDataParams: action.payload }
        case 'set_urlencodedParams':
            return { ...state, urlencodedParams: action.payload }
        case 'set_rawParams':
            return { ...state, rawParams: action.payload }
        case 'set_Preview':
            return { ...state, preview: action.payload }
        default:
            return state;
    };
};
