import React, { PureComponent, Fragment } from 'react';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { API } from '../../network/API';
import { showNotification } from '../../utils/notification';

import * as acWindows from '../../action/acWindows';

import('./HistoryComponent.scss');

class HistoryComponent extends PureComponent {

    state = {
        selectedRequest: null,
        historyList: []
    };

    componentDidMount() {

        API.getHistoryList().then((resolve, reject) => {
            if (resolve) {
                this.setState({historyList: resolve.data})
                showNotification('success', '', 'service getHistoryList');
            } else {
                showNotification('error', '', 'service getHistoryList');
            }
        });
    };

    onHandleClick = (event) => {
        const { historyList } = this.state;

        const { 
            setRequestURLParams,
            setRequestHeadersParams,
            setFormDataParams,
            setUrlencodedParams,
            setUrl,
            setRawParams,
            setRequestType
        } = this.props.acWindows;

        let selectedRequest = find(historyList, (item, index) => { return index === +event.target.dataset.id });
        console.log('--selectedRequest', selectedRequest)
        console.log('--requestURLParams', selectedRequest.requestURLParams ? 'да' : 'нет')
        setUrl(selectedRequest.url ? selectedRequest.url : '');
        setRequestType(selectedRequest.requestType ? selectedRequest.requestType : 'GET');

        console.log('--delete', event.target.dataset.delete)
    };

    render() {
        const { historyList } = this.state;

        return (
            <div className="sidebar">
                <div className='HistoryComponent'>
                    <h3>Custom Postman</h3>
                    <button className="btn btn-primary" type="submit">History</button>
                    <button className="btn btn-danger" type="submit">Clear All</button>
                    <div className='list-wrapper'>
                        {historyList.map((item, index) => 
                            <h6 key={index} onClick={this.onHandleClick} data-id={index}>
                                <span className="badge badge-warning" data-id={index}>{item.requestType}</span>
                                <span data-id={index}>{item.url}</span>
                                <span data-delete='1' className="badge badge-secondary">X</span>
                            </h6>
                        )}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryComponent);