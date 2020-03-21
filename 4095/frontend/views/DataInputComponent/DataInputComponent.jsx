import React, { PureComponent, Fragment } from 'react';
import { remove } from 'lodash';

import('./DataInputComponent.scss');

class DataInputComponent extends PureComponent {

    state = {
        params: {
            url: '',
            requestType: 'GET',
            requestHeaderParams: [{ key: '', value: '' }],
            formDataParams: [{ key: '', value: '' }],
            urlencodedParams: [{ key: '', value: '' }],
            rawParams: ''
        },
        stateHeaderRequest: false,
        activeButtonParams: { fd: 'active', xwfu: '', r: '' }
        // headerRequestParams: [],
    };

    showHeaderRequest = () => {

        this.setState({
            stateHeaderRequest: !this.state.stateHeaderRequest,
            params: {
                ...this.state.params,
                requestHeaderParams: [{ key: '', value: '' }],
            }
        })
    };


    handleCheckParams = (EO) => {
        const { requestHeaderParams, formDataParams, urlencodedParams } = this.state.params;

        switch (EO.target.dataset.name) {
            case 'paramsHeaders':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === requestHeaderParams.length - 1) {
                    let newRequestHeaderParams = [...requestHeaderParams, { key: '', value: '' }];
                    this.setState({
                        params: {
                            ...this.state.params,
                            requestHeaderParams: newRequestHeaderParams
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

            default: break
        };
    };

    deleteParams = (EO) => {
        const { requestHeaderParams, formDataParams, urlencodedParams } = this.state.params;

        switch (EO.target.dataset.name) {
            case 'paramsHeaders':

                let newRequestHeaderParams = remove(requestHeaderParams, (item, index) => { return index != +EO.target.dataset.id })

                this.setState({
                    params: {
                        ...this.state.params,
                        requestHeaderParams: newRequestHeaderParams
                    }
                });
                break;

            case 'paramsFormData':

                let newFormDataParams = remove(formDataParams, (item, index) => { return index != +EO.target.dataset.id })
                console.log('--newFormDataParams', newFormDataParams)
                this.setState({
                    params: {
                        ...this.state.params,
                        formDataParams: newFormDataParams
                    }
                });
                break;

            case 'paramsUrlencoded':

                let newUrlencodedParams = remove(urlencodedParams, (item, index) => { return index != +EO.target.dataset.id })

                this.setState({
                    params: {
                        ...this.state.params,
                        urlencodedParams: newUrlencodedParams
                    }
                });
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
            requestHeaderParams,
            formDataParams,
            urlencodedParams,
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
            case '_headerKey':
                if(fieldName === '_headerKey') requestHeaderParams[fieldID]['key'] = EO.target.value;
                this.setState({params: {...this.state.params, ...requestHeaderParams}});
            break;
            case '_headerValue':
                if(fieldName === '_headerValue') requestHeaderParams[fieldID]['value'] = EO.target.value;
                this.setState({params: {...this.state.params, ...requestHeaderParams}});
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
            stateHeaderRequest,
            params,
            activeButtonParams
        } = this.state;
        const {
            requestHeaderParams,
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
                            <button onClick={this.showHeaderRequest} type="button" className="btn btn-outline-secondary">URL params</button>
                        </div>
                    </div>
                </div>
                {stateHeaderRequest && <div className='params-headers'>
                    {requestHeaderParams.map((item, index) =>
                        <div key={index} className='input-field'>
                            <input onClick={this.handleCheckParams} value={item.key} onChange={this.onChange} data-field='_headerKey' data-filed='header' data-name={'paramsHeaders'} data-id={index} className="form-control" placeholder='Key' type="text"></input>
                            <input onClick={this.handleCheckParams} value={item.value} onChange={this.onChange} data-field='_headerValue' data-name={'paramsHeaders'} data-id={index} className="form-control" placeholder='Value' type="text"></input>
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