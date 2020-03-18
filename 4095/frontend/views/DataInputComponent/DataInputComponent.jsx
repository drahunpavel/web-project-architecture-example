import React, { PureComponent } from 'react';

import('./DataInputComponent.scss');

class DataInputComponent extends PureComponent {

    render() {
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
                            <button type="button" className="btn btn-outline-secondary">URL params</button>
                        </div>
                    </div>
                </div>
                <div className='params-headers'>
                    <div className='input-field'>
                        <input className="form-control" placeholder='Key' type="text"></input>
                        <input className="form-control" placeholder='Value' type="text"></input>
                        <button type="button" class="btn btn-outline-secondary">X</button>
                    </div>
                </div>
                <div className='params-field'>
                    <div className='button-field'>
                        <button type="button" class="btn btn-outline-secondary">form-data</button>
                        <button type="button" class="btn btn-outline-secondary">x-www-form-urlencoded</button>
                        <button type="button" class="btn btn-outline-secondary">raw</button>
                    </div>
                    <div className='input-field'>
                        <input className="form-control" placeholder='Key' type="text"></input>
                        <input className="form-control" placeholder='Value' type="text"></input>
                        <button type="button" class="btn btn-outline-secondary">X</button>
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