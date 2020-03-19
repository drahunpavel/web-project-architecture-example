import React, { PureComponent, Fragment } from 'react';

import('./HistoryComponent.scss');

class HistoryComponent extends PureComponent {

    state = {
        selectedRequest: null
    };

    onHandleClick = (event) => {

        console.log('--select', event.target.dataset.id)
        console.log('--delete', event.target.dataset.delete)
    };

    render() {
        return (
                <div className="sidebar">
                    <div className='HistoryComponent'>
                        <h3>Custom Postman</h3>
                        <button className="btn btn-primary" type="submit">History</button>
                        <button className="btn btn-danger" type="submit">Clear All</button>
                        <div className='list-wrapper'>
                            <h6 onClick={this.onHandleClick} data-id='1'>
                                <span className="badge badge-warning" data-id='1'>POST</span>
                                <span data-id='1'>http://localhost:3000/api/updateProfile</span>
                                <span data-delete='1' className="badge badge-secondary">X</span>
                            </h6>
                            <h6 onClick={this.onHandleClick} data-id='2'>
                                <span data-id='2' className="badge badge-warning">POST</span>
                                <span data-id='2'>http://localhost:3000/api/updateProfile</span>
                                <span data-delete='2' className="badge badge-secondary">X</span>
                            </h6>
                            <h6 onClick={this.onHandleClick} data-id='3'>
                                <span data-id='3' className="badge badge-warning">POST</span>
                                <span data-id='3'>http://localhost:3000/api/updateProfile</span>
                                <span data-delete='3' className="badge badge-secondary">X</span>
                            </h6>
                            <h6 onClick={this.onHandleClick} data-id='4'>
                                <span data-id='4' className="badge badge-warning">POST</span>
                                <span data-id='4'>http://localhost:3000/api/updateProfile</span>
                                <span data-delete='4' className="badge badge-secondary">X</span>
                            </h6>
                            <h6 onClick={this.onHandleClick} data-id='5'>
                                <span data-id='5' className="badge badge-primary">GET</span>
                                <span data-id='5'>http://localhost:3000/api/updateProfile</span>
                                <span data-delete='5' className="badge badge-secondary">X</span>
                            </h6>
                        </div>
                    </div>
                </div>
        );
    };
};

export default HistoryComponent;