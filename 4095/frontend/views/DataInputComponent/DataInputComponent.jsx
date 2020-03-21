import React, { PureComponent, Fragment } from 'react';
import { remove } from 'lodash';

import('./DataInputComponent.scss');

class DataInputComponent extends PureComponent {

    state = {
        params: {
            url: '',
            requestType: 'GET',
            requestURLParams: [{ key: '', value: '' }],
            requestHeadersParams: [{ key: '', value: '' }],
            formDataParams: [{ key: '', value: '' }],
            urlencodedParams: [{ key: '', value: '' }],
            rawParams: ''
        },
        stateUrlParams: false,
        stateHeadersParams: false,
        activeButtonParams: { fd: 'active', xwfu: '', r: '' }
    };

    showUrlParams = () => {

        this.setState({
            stateUrlParams: !this.state.stateUrlParams,
            params: {
                ...this.state.params,
                requestURLParams: [{ key: '', value: '' }],
            }
        });
    };

    showHeadersParams = () => {

        this.setState({
            stateHeadersParams: !this.state.stateHeadersParams,
            params: {
                ...this.state.params,
                requestHeadersParams: [{ key: '', value: '' }],
            }
        });
    };

    handleCheckParams = (EO) => {
        const { 
            requestURLParams, 
            requestHeadersParams,
            formDataParams, 
            urlencodedParams, 
            requestHeadersParams 
        } = this.state.params;

        
        switch (EO.target.dataset.name) {
            case 'paramsUrl':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === requestURLParams.length - 1) {
                    let newrequestURLParams = [...requestURLParams, { key: '', value: '' }];
                    this.setState({
                        params: {
                            ...this.state.params,
                            requestURLParams: newrequestURLParams
                        }
                    });
                };
                break;

            case 'paramsFormData':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === formDataParams.length - 1) {
                    let newformDataParams = [...formDataParams, { key: '', value: '' }];
                    this.setState({
                        params: {
                            ...this.state.params,
                            formDataParams: newformDataParams
                        }
                    });
                };
                break;

            case 'paramsUrlencoded':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === urlencodedParams.length - 1) {
                    let newUrlencodedParams = [...urlencodedParams, { key: '', value: '' }];
                    this.setState({
                        params: {
                            ...this.state.params,
                            urlencodedParams: newUrlencodedParams
                        }
                    });
                };
                break;

            case 'paramsHeaders':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === requestHeadersParams.length - 1) {
                    let newrequestHeadersParams = [...requestHeadersParams, { key: '', value: '' }];
                    this.setState({
                        params: {
                            ...this.state.params,
                            requestHeadersParams: newrequestHeadersParams
                        }
                    });
                };
                break;

            default: break
        };
    };

    deleteParams = (EO) => {
        const { 
            requestURLParams, 
            formDataParams, 
            urlencodedParams,
            requestHeadersParams
        } = this.state.params;

        switch (EO.target.dataset.name) {

            case 'paramsUrl':
                let newrequestURLParams = remove(requestURLParams, (item, index) => { return index != +EO.target.dataset.id })
                this.setState({ params: {...this.state.params, requestURLParams: newrequestURLParams }});
            break;

            case 'paramsFormData':
                let newFormDataParams = remove(formDataParams, (item, index) => { return index != +EO.target.dataset.id })
                this.setState({ params: {...this.state.params, formDataParams: newFormDataParams }});
            break;

            case 'paramsUrlencoded':
                let newUrlencodedParams = remove(urlencodedParams, (item, index) => { return index != +EO.target.dataset.id })
                this.setState({ params: {...this.state.params, urlencodedParams: newUrlencodedParams}});
            break;

            case 'paramsHeaders':
                let newRequestHeadersParams = remove(requestHeadersParams, (item, index) => { return index != +EO.target.dataset.id })
                this.setState({ params: { ...this.state.params, requestHeadersParams: newRequestHeadersParams }});
            break;

            default: break
        };
    };

    handleCheckButtonParams = (EO) => {

        if (EO.target.dataset.button === 'xwfu') {
            this.setState({ activeButtonParams: { fd: '', xwfu: 'active', r: '' } });
        } else if (EO.target.dataset.button === 'fd') {
            this.setState({ activeButtonParams: { fd: 'active', xwfu: '', r: '' } });
        } else if (EO.target.dataset.button === 'r') {
            this.setState({ activeButtonParams: { fd: '', xwfu: '', r: 'active' } });
        };
    };

    handleChange = (event) => {

        const selectedValue = event.target.value;
        this.setState({
            params: {
                ...this.state.params,
                requestType: selectedValue
            }
        });
    };

    onChange = (EO) => {
        const { 
            requestURLParams,
            formDataParams,
            urlencodedParams,
            requestHeadersParams,
            rawParams
        } = this.state.params;

        let fieldName = EO.target.dataset.field;
        let fieldID = EO.target.dataset.id;
        console.log('--fieldName', fieldName)
        switch(fieldName){
            case '_url': 
                this.setState({params: {...this.state.params, url: EO.target.value}});
            break;
            case '_row': 
                this.setState({params: {...this.state.params, rawParams: EO.target.value}});
            break;
            case '_formDataKey':
                if(fieldName === '_formDataKey') formDataParams[fieldID]['key'] = EO.target.value;
                this.setState({params: {...this.state.params, ...formDataParams}});
            break;
            case '_formDataValue':
                if(fieldName === '_formDataValue') formDataParams[fieldID]['value'] = EO.target.value;
                this.setState({params: {...this.state.params, ...formDataParams}});
            break;
            case '_urlencodedKey':
                if(fieldName === '_urlencodedKey') urlencodedParams[fieldID]['key'] = EO.target.value;
                this.setState({params: {...this.state.params, ...urlencodedParams}});
            break;
            case '_urlencodedValue':
                if(fieldName === '_urlencodedValue') urlencodedParams[fieldID]['value'] = EO.target.value;
                this.setState({params: {...this.state.params, ...urlencodedParams}});
            break;
            case '_urlKey':
                if(fieldName === '_urlKey') requestURLParams[fieldID]['key'] = EO.target.value;
                this.setState({params: {...this.state.params, ...requestURLParams}});
            break;
            case '_urlValue':
                if(fieldName === '_urlValue') requestURLParams[fieldID]['value'] = EO.target.value;
                this.setState({params: {...this.state.params, ...requestURLParams}});
            break;
            case '_headersKey':
                if(fieldName === '_headersKey') requestHeadersParams[fieldID]['key'] = EO.target.value;
                this.setState({params: {...this.state.params, ...requestHeadersParams}});
            break;
            case '_headersValue':
                if(fieldName === '_headersValue') requestHeadersParams[fieldID]['value'] = EO.target.value;
                this.setState({params: {...this.state.params, ...requestHeadersParams}});
            break;

            default: break;
        };
    };

    sendParams = () => {
        const { cbSendRequest } = this.props;
        const { params } = this.state;

        console.log('--параметры', params)
        
        cbSendRequest('test');
    };

    render() {
        const {
            stateUrlParams,
            stateHeadersParams,
            params,
            activeButtonParams
        } = this.state;
        const {
            requestURLParams,
            requestHeadersParams,
            formDataParams,
            urlencodedParams,
            requestType,
            url,
            rawParams
        } = params;
        
        
        return (
            <div className='DataInputComponent'>
                <div className='request-url-wrapper'>
                    <div className='request-url-container'>
                        <p>Your URL</p>
                        <div className='request-url'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">https://example.com/</span>
                                    <input onChange={this.onChange} value={url} data-field='_url' type="text" placeholder='Enter request URL here' className="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='request-modifiers'>
                        <p>Selected params</p>
                        <div className='modifiers'>
                            <select onChange={this.handleChange} className="custom-select">
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select>
                            <button onClick={this.showUrlParams} type="button" className="btn btn-outline-secondary">URL params</button>
                            <button onClick={this.showHeadersParams} type="button" className="btn btn-outline-secondary">Headers</button>
                        </div>
                    </div>
                </div>
                {stateUrlParams && <div className='params-headers'>
                    {requestURLParams.map((item, index) =>
                        <div key={index} className='input-field'>
                            <input onClick={this.handleCheckParams} value={item.key} onChange={this.onChange} data-field='_urlKey' data-name={'paramsUrl'} data-id={index} className="form-control" placeholder='URL Parameter Key' type="text"></input>
                            <input onClick={this.handleCheckParams} value={item.value} onChange={this.onChange} data-field='_urlValue' data-name={'paramsUrl'} data-id={index} className="form-control" placeholder='Value' type="text"></input>
                            {index != 0 && <button onClick={this.deleteParams} data-name={'paramsUrl'} data-id={index} type="button" className="btn btn-outline-secondary">X</button>}
                        </div>
                    )}
                </div>}
                {stateHeadersParams && <div className='params-headers'>
                    {requestHeadersParams.map((item, index) =>
                        <div key={index} className='input-field'>
                            <input onClick={this.handleCheckParams} value={item.key} onChange={this.onChange} data-field='_headersKey' data-name={'paramsHeaders'} data-id={index} className="form-control" placeholder='Header' type="text"></input>
                            <input onClick={this.handleCheckParams} value={item.value} onChange={this.onChange} data-field='_headersValue' data-name={'paramsHeaders'} data-id={index} className="form-control" placeholder='Value' type="text"></input>
                            {index != 0 && <button onClick={this.deleteParams} data-name={'paramsHeaders'} data-id={index} type="button" className="btn btn-outline-secondary">X</button>}
                        </div>
                    )}
                </div>}
                {requestType === 'POST' && <div className='params-field'>
                    <div className='button-field'>
                        <button onClick={this.handleCheckButtonParams} type="button" data-button='fd' className={"btn btn-outline-secondary " + activeButtonParams.fd}>form-data</button>
                        <button onClick={this.handleCheckButtonParams} type="button" data-button='xwfu' className={"btn btn-outline-secondary " + activeButtonParams.xwfu}>x-www-form-urlencoded</button>
                        <button onClick={this.handleCheckButtonParams} type="button" data-button='r' className={"btn btn-outline-secondary " + activeButtonParams.r}>raw</button>
                    </div>
                    {activeButtonParams.fd === 'active' && formDataParams.map((item, index) =>
                        <div key={index} className='input-field'>
                            <input onClick={this.handleCheckParams} value={item.key} onChange={this.onChange} data-field='_formDataKey' className="form-control" data-name={'paramsFormData'} data-id={index} placeholder='Key' type="text"></input>
                            <input onClick={this.handleCheckParams} value={item.value} onChange={this.onChange} data-field='_formDataValue' className="form-control" data-name={'paramsFormData'} data-id={index} placeholder='Value' type="text"></input>
                            {index != 0 && <button onClick={this.deleteParams} data-name={'paramsFormData'} data-id={index} type="button" className="btn btn-outline-secondary">X</button>}
                        </div>
                    )}
                    {activeButtonParams.xwfu === 'active' && urlencodedParams.map((item, index) =>
                        <div key={index} className='input-field'>
                            <input onClick={this.handleCheckParams} value={item.key} onChange={this.onChange} data-field='_urlencodedKey' className="form-control" data-name={'paramsUrlencoded'} data-id={index} placeholder='Key' type="text"></input>
                            <input onClick={this.handleCheckParams} value={item.value} onChange={this.onChange} data-field='_urlencodedValue' className="form-control" data-name={'paramsUrlencoded'} data-id={index} placeholder='Value' type="text"></input>
                            {index != 0 && <button onClick={this.deleteParams} data-name={'paramsUrlencoded'} data-id={index} type="button" className="btn btn-outline-secondary">X</button>}
                        </div>
                    )}
                    {activeButtonParams.r === 'active' && <div className='input-field'>
                        <textarea className="form-control" onChange={this.onChange} value={rawParams} data-field='_row' rows="3"></textarea>
                    </div>}
                </div>}
                <div className='request-actions'>
                    <button onClick={this.sendParams} type="button" className="btn btn-outline-primary">Send</button>
                    <button type="button" className="btn btn-outline-secondary">Preview</button>
                    <button type="button" className="btn btn-outline-danger">Reset</button>
                </div>
            </div>
        );
    };
};

export default DataInputComponent;