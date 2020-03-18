import React, { PureComponent, Fragment } from 'react';
import { remove } from 'lodash';

import('./DataInputComponent.scss');

class DataInputComponent extends PureComponent {

    state = {
        params: {
            url: '',
            requestType: 'GET',
            requestHeaderParams: [{key: '', value: ''}],

        },

        stateHeaderRequest: false,
        // headerRequestParams: [],
    };

    showHeaderRequest = () => {

        this.setState({
            stateHeaderRequest: !this.state.stateHeaderRequest,
            params: {
                ...this.state.params,
                requestHeaderParams: [{key: '', value: ''}],
            }
        })
    };


    handleCheckHeaderParams = (EO) => {
        const { requestHeaderParams } = this.state.params;

        //если клие по последнему элементу, то добавляем новое поле
        if(+EO.target.dataset.id === requestHeaderParams.length - 1){

            let newRequestHeaderParams = [...requestHeaderParams, {key: '', value: ''}];

            this.setState({
                params: {
                    ...this.state.params,
                    requestHeaderParams: newRequestHeaderParams
                }
            });
        };
    };

    deleteHeaderParams = (EO) => {
        const { requestHeaderParams } = this.state.params;

        let newRequestHeaderParams = remove(requestHeaderParams, (item, index) => { return index != +EO.target.dataset.id })

        this.setState({
            params: {
                ...this.state.params,
                requestHeaderParams: newRequestHeaderParams
            }
        });
    };

    render() {
        const {
            stateHeaderRequest,
            params
        } = this.state;
        const {
            requestHeaderParams
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
                                    <input type="text" placeholder='Enter request URL here' className="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='request-modifiers'>
                        <p>Selected params</p>
                        <div className='modifiers'>
                            <select className="custom-select">
                                <option selected value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select>
                            <button onClick={this.showHeaderRequest} type="button" className="btn btn-outline-secondary">URL params</button>
                        </div>
                    </div>
                </div>
                {stateHeaderRequest && <div className='params-headers'>
                        {requestHeaderParams.map((item, index) => 
                            <div key={index} className='input-field'>
                                <input onClick={this.handleCheckHeaderParams} data-id={index} className="form-control" placeholder='Key' type="text"></input>
                                <input onClick={this.handleCheckHeaderParams} data-id={index} className="form-control" placeholder='Value' type="text"></input>
                                {index != 0 && <button onClick={this.deleteHeaderParams} data-id={index} type="button" className="btn btn-outline-secondary">X</button>}
                            </div>
                        )}
                </div>}
                <div className='params-field'>
                    <div className='button-field'>
                        <button type="button" className="btn btn-outline-secondary">form-data</button>
                        <button type="button" className="btn btn-outline-secondary">x-www-form-urlencoded</button>
                        <button type="button" className="btn btn-outline-secondary">raw</button>
                    </div>
                    <div className='input-field'>
                        <input className="form-control" placeholder='Key' type="text"></input>
                        <input className="form-control" placeholder='Value' type="text"></input>
                        <button type="button" className="btn btn-outline-secondary">X</button>
                    </div>
                </div>
                <div className='request-actions'>
                    <button type="button" className="btn btn-outline-primary">Send</button>
                    <button type="button" className="btn btn-outline-secondary">Preview</button>
                    <button type="button" className="btn btn-outline-danger">Reset</button>
                </div>
            </div>
        );
    };
};

export default DataInputComponent;