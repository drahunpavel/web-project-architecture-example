import React, { PureComponent, Fragment } from 'react';
import { remove } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showNotification } from '../../utils/notification';

import * as acWindows from '../../action/acWindows';

import('./DataInputComponent.scss');


class DataInputComponent extends PureComponent {

    showUrlParams = () => {
        const { setRequestURLParams, setStateUrlParams } = this.props.acWindows;
        const { stateUrlParams } = this.props.windows;

        setRequestURLParams([{ key: '', value: '' }]);
        setStateUrlParams(!stateUrlParams)
    };

    showHeadersParams = () => {
        const { setRequestHeadersParams, setStateHeadersParams } = this.props.acWindows;
        const { stateHeadersParams } = this.props.windows;

        setRequestHeadersParams([{ key: '', value: '' }]);
        setStateHeadersParams(!stateHeadersParams);
    };

    handleCheckParams = (EO) => {
        const { 
            requestURLParams,
            requestHeadersParams,
            formDataParams,
            urlencodedParams
        } = this.props.windows;
        const { 
            setRequestURLParams,
            setRequestHeadersParams,
            setFormDataParams,
            setUrlencodedParams
        } = this.props.acWindows;

        switch (EO.target.dataset.name) {
            case 'paramsUrl':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === requestURLParams.length - 1) {
                    let newrequestURLParams = [...requestURLParams, { key: '', value: '' }];
                    setRequestURLParams(newrequestURLParams);
                };
                break;

            case 'paramsFormData':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === formDataParams.length - 1) {
                    let newformDataParams = [...formDataParams, { key: '', value: '' }];
                    setFormDataParams(newformDataParams)
                };
                break;

            case 'paramsUrlencoded':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === urlencodedParams.length - 1) {
                    let newUrlencodedParams = [...urlencodedParams, { key: '', value: '' }];
                    setUrlencodedParams(newUrlencodedParams);
                };
                break;

            case 'paramsHeaders':
                //если клие по последнему элементу, то добавляем новое поле
                if (+EO.target.dataset.id === requestHeadersParams.length - 1) {
                    let newrequestHeadersParams = [...requestHeadersParams, { key: '', value: '' }];
                    setRequestHeadersParams(newrequestHeadersParams);
                };
                break;

            default: break
        };
    };

    deleteParams = (EO) => {
        const { 
            requestURLParams,
            requestHeadersParams,
            formDataParams,
            urlencodedParams
        } = this.props.windows;
        const { 
            setRequestURLParams,
            setRequestHeadersParams,
            setFormDataParams,
            setUrlencodedParams
        } = this.props.acWindows;

        switch (EO.target.dataset.name) {

            case 'paramsUrl':
                let newrequestURLParams = remove(requestURLParams, (item, index) => { return index != +EO.target.dataset.id })
                setRequestURLParams(newrequestURLParams);
            break;

            case 'paramsFormData':
                let newFormDataParams = remove(formDataParams, (item, index) => { return index != +EO.target.dataset.id })
                setFormDataParams(newFormDataParams);
            break;

            case 'paramsUrlencoded':
                let newUrlencodedParams = remove(urlencodedParams, (item, index) => { return index != +EO.target.dataset.id })
                setUrlencodedParams(newUrlencodedParams);
            break;

            case 'paramsHeaders':
                let newRequestHeadersParams = remove(requestHeadersParams, (item, index) => { return index != +EO.target.dataset.id })
                setRequestHeadersParams(newRequestHeadersParams);
                break;

            default: break
        };
    };

    handleCheckButtonParams = (EO) => {
        const { setActiveButtonParams } = this.props.acWindows;

        if (EO.target.dataset.button === 'xwfu') {
            // setActiveButtonParams({ fd: '', xwfu: 'active', r: '' });
            showNotification('info', '', 'button doesnt work :)');
        } else if (EO.target.dataset.button === 'fd') {
            // setActiveButtonParams({ fd: 'active', xwfu: '', r: '' });
            showNotification('info', '', 'button doesnt work :)');
        } else if (EO.target.dataset.button === 'r') {
            setActiveButtonParams({ fd: '', xwfu: '', r: 'active' });
        };
    };

    handleChange = (event) => {
        const selectedValue = event.target.value;
        const { setRequestType } = this.props.acWindows;

        setRequestType(selectedValue);
    };

    onChange = (EO) => {
        const { 
            requestURLParams,
            requestHeadersParams,
            formDataParams,
            urlencodedParams
        } = this.props.windows;
        const { 
            setRequestURLParams,
            setRequestHeadersParams,
            setFormDataParams,
            setUrlencodedParams,
            setUrl,
            setRawParams
        } = this.props.acWindows;

        let fieldName = EO.target.dataset.field;
        let fieldID = EO.target.dataset.id;

        switch(fieldName){
            case '_url': 
                setUrl(EO.target.value);
            break;
            case '_row': 
                setRawParams(EO.target.value);
            break;
            case '_formDataKey':
                if(fieldName === '_formDataKey') formDataParams[fieldID]['key'] = EO.target.value;
                setFormDataParams([...formDataParams]);
            break;
            case '_formDataValue':
                if(fieldName === '_formDataValue') formDataParams[fieldID]['value'] = EO.target.value;
                setFormDataParams([...formDataParams]);
            break;
            case '_urlencodedKey':
                if(fieldName === '_urlencodedKey') urlencodedParams[fieldID]['key'] = EO.target.value;
                setUrlencodedParams([...urlencodedParams]);
            break;
            case '_urlencodedValue':
                if(fieldName === '_urlencodedValue') urlencodedParams[fieldID]['value'] = EO.target.value;
                setUrlencodedParams([...urlencodedParams]);
            break;
            case '_urlKey':
                if(fieldName === '_urlKey') requestURLParams[fieldID]['key'] = EO.target.value;
                setRequestURLParams([...requestURLParams]);
            break;
            case '_urlValue':
                if(fieldName === '_urlValue') requestURLParams[fieldID]['value'] = EO.target.value;
                setRequestURLParams([...requestURLParams]);
            break;
            case '_headersKey':
                if(fieldName === '_headersKey') requestHeadersParams[fieldID]['key'] = EO.target.value;
                setRequestHeadersParams([...requestHeadersParams]);
            break;
            case '_headersValue':
                if(fieldName === '_headersValue') requestHeadersParams[fieldID]['value'] = EO.target.value;
                setRequestHeadersParams([...requestHeadersParams]);
            break;

            default: break;
        };
    };

    sendParams = () => {
        const { cbSendRequest } = this.props;
        const { 
            url,
            requestType,
            requestURLParams,
            requestHeadersParams,
            formDataParams,
            urlencodedParams,
            rawParams,
            activeButtonParams
        } = this.props.windows;
        let newParams = {};

        if(requestType === 'GET'){
            newParams.url = url;
            newParams.requestType = requestType;
            newParams.requestURLParams = requestURLParams;
            newParams.requestHeadersParams = requestHeadersParams;
            
            cbSendRequest(newParams);
        }else if(requestType === 'POST'){
            if(activeButtonParams.fd === 'active'){

            }
            if(activeButtonParams.xwfu === 'active'){
                
            }
            if(activeButtonParams.r === 'active'){  
                newParams.url = url;
                newParams.requestType = requestType;
                newParams.requestURLParams = requestURLParams;
                newParams.requestHeadersParams = requestHeadersParams;
                newParams.body = rawParams.length ? JSON.parse(rawParams) : '';
                newParams.type = 'r';

                cbSendRequest(newParams);
            }
        };
    };

    onClickResetParams = () => {
        const { 
            setRequestURLParams,
            setRequestHeadersParams,
            setFormDataParams,
            setUrlencodedParams,
            setUrl,
            setRawParams,
            setPreview
        } = this.props.acWindows;

        setRequestURLParams([{ key: '', value: '' }]);
        setRequestHeadersParams([{ key: '', value: '' }]);
        setFormDataParams([{ key: '', value: '' }]);
        setUrlencodedParams([{ key: '', value: '' }]);
        setUrl('');
        setRawParams('');
        setPreview('');
    };

    onClickPreview = () => {
        showNotification('info', '', 'Preview button doesnt work :)');
    };


    render() {
        const {
            requestURLParams,
            requestHeadersParams,
            formDataParams,
            urlencodedParams,
            requestType,
            url,
            rawParams,
            stateUrlParams,
            stateHeadersParams,
            activeButtonParams
        } = this.props.windows;

        let butUrl = stateUrlParams ? 'active' : '';
        let butHed = stateHeadersParams ? 'active' : '';

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
                            <select value={requestType} onChange={this.handleChange} className="custom-select">
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select>
                            <button onClick={this.showUrlParams} type="button" data-button='butUrl' className={"btn btn-outline-secondary " + butUrl}>URL params</button>
                            <button onClick={this.showHeadersParams} type="button" data-button='butHed' className={"btn btn-outline-secondary " + butHed}>Headers</button>
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
                    <button onClick={this.onClickPreview} type="button" className="btn btn-outline-success">Preview</button>
                    <button onClick={this.onClickResetParams} type="button" className="btn btn-outline-danger">Reset</button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = ({windows}) => ({
    windows
});

const mapDispatchToProps = (dispatch) => ({
    acWindows: bindActionCreators(acWindows, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataInputComponent);