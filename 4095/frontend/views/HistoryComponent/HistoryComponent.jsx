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
        selectedRequest: null
    };

    componentDidMount() {
        const { setHistoryList } = this.props.acWindows;

        API.getHistoryList().then((resolve, reject) => {
            if (resolve) {
                setHistoryList(resolve.data);
                showNotification('success', '', 'service getHistoryList');
            } else {
                showNotification('error', '', 'service getHistoryList');
            }
        });
    };

    onHandleClick = (event) => {
        const { 
            setRequestURLParams,
            setRequestHeadersParams,
            setFormDataParams,
            setUrlencodedParams,
            setUrl,
            setRawParams,
            setPreview,
            setRequestType,
            setStateUrlParams,
            setStateHeadersParams,
            setActiveButtonParams
        } = this.props.acWindows;
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
            activeButtonParams,
            historyList
        } = this.props.windows;

        let selectedRequest = find(historyList, (item, index) => { return index === +event.target.dataset.id });
        let deleteID = event.target.dataset.delete;
        console.log('--selectedRequest', selectedRequest)
        if(selectedRequest){
            setUrl(selectedRequest.url ? selectedRequest.url : '');
            setRequestType(selectedRequest.requestType ? selectedRequest.requestType : 'GET');
            setPreview('');
            if(selectedRequest.requestURLParams && selectedRequest.requestURLParams.length){
                setRequestURLParams(selectedRequest.requestURLParams);
                setStateUrlParams(true);
            }else{
                setRequestURLParams([{ key: '', value: '' }]);
                setStateUrlParams(false);
            };
            if(selectedRequest.requestHeadersParams && selectedRequest.requestHeadersParams.length){
                setRequestHeadersParams(selectedRequest.requestHeadersParams);
                setStateHeadersParams(true);
            }else{
                setRequestHeadersParams([{ key: '', value: '' }]);
                setStateHeadersParams(false);
            };

            if(selectedRequest.requestType === 'POST'){
                if(selectedRequest.type && selectedRequest.type === 'r'){
                    setActiveButtonParams({ fd: '', xwfu: '', r: 'active' });
                } 
                if(selectedRequest.type && selectedRequest.type === 'xwfu'){
                    setActiveButtonParams({ fd: '', xwfu: 'active', r: '' });
                } 
                if(selectedRequest.type && selectedRequest.type === 'fd'){
                    setActiveButtonParams({ fd: 'active', xwfu: '', r: '' });
                } 
            }
        };

        if(deleteID && typeof selectedRequest === 'undefined'){
            const data = {deleteID: event.target.dataset.delete}

            API.deleteRequest(data).then((resolve, reject) => {
                if (resolve) {
                    showNotification('success', '', 'service deleteRequest');
                    this.getHistoryList();
                } else {
                    showNotification('error', '', 'service deleteRequest');
                }
            });
        };
    };

    getHistoryList = () => {
        const { setHistoryList } = this.props.acWindows;

        API.getHistoryList().then((resolve, reject) => {
            if (resolve) {
                setHistoryList(resolve.data);
                showNotification('success', '', 'service getHistoryList');
            } else {
                showNotification('error', '', 'service getHistoryList');
            }
        });
    };

    onClickClearAll = () => {
        showNotification('info', '', 'Clear All button doesnt work :)');
    };

    render() {
        const { historyList } = this.props.windows;

        return (
            <div className="sidebar">
                <div className='HistoryComponent'>
                    <h3>Custom Postman</h3>
                    <button onClick={this.getHistoryList} className="btn btn-primary" type="submit">History</button>
                    <button onClick={this.onClickClearAll} className="btn btn-danger" type="submit">Clear All</button>
                    <div className='list-wrapper'>
                        {historyList.map((item, index) =>
                            <h6 key={index} onClick={this.onHandleClick} data-id={item.id}>
                                <span className={(item.requestType === 'POST') ? 'badge badge-warning' : 'badge badge-success'} data-id={item.id}>{item.requestType}</span>
                                <span data-id={item.id}>{item.url}</span>
                                <span data-delete={item.id} className="badge badge-secondary">X</span>
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