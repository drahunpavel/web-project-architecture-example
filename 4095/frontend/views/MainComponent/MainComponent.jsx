import React, { PureComponent, Fragment } from 'react';

import DataInputComponent from '../DataInputComponent/DataInputComponent';
import HistoryComponent from '../HistoryComponent/HistoryComponent';
import PreviewComponent from '../PreviewComponent/PreviewComponent';
import Notification from '../Notification/Notification';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as acWindows from '../../action/acWindows';

//utils
import { API } from '../../network/API';
import { showNotification } from '../../utils/notification';

import('./MainComponent.scss');

class MainComponent extends PureComponent {

  state = {
    selectedObj: {},
  };

  sendRequest = (value) => {
    // console.log('--получили', value)
    const {
      setPreview,
      setHistoryList
    } = this.props.acWindows;

    API.processRequest(value).then((resolve, reject) => {
      if (resolve) {
        setPreview(resolve);
        showNotification('success', '', 'service processRequest');
      } else {
        showNotification('error', '', 'service processRequest')
      }
    });

    const par = {};
    if (value.requestType === 'GET') {
      par.requestType = value.requestType;
      par.url = value.url;
      par.requestURLParams = value.requestURLParams ? value.requestURLParams : [{ key: '', value: '' }];
      par.requestHeadersParams = value.requestHeadersParams ? value.requestHeadersParams : [{ key: '', value: '' }];
    } else {
      par.requestType = value.requestType;
      par.url = value.url;
      par.requestURLParams = value.requestURLParams ? value.requestURLParams : [{ key: '', value: '' }];
      par.requestHeadersParams = value.requestHeadersParams ? value.requestHeadersParams : [{ key: '', value: '' }];
      par.type = value.type;
      par.body = JSON.stringify(value.body);
    }

    var regex = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
    if(regex.test(value.url)){
      API.addNewRequest(par).then((resolve, reject) => {
        if (resolve) {
          showNotification('success', '', 'service addNewRequest');
  
          API.getHistoryList().then((resolve, reject) => {
            if (resolve) {
              setHistoryList(resolve.data);
              showNotification('success', '', 'service getHistoryList');
            } else {
              showNotification('error', '', 'service getHistoryList');
            }
          });
  
        } else {
          showNotification('error', '', 'service addNewRequest')
        }
      });
    }
  };


  render() {

    return (
      <div className='MainComponent'>
        <Notification />
        <HistoryComponent />
        <div className="content">
          <DataInputComponent
            cbSendRequest={this.sendRequest}
          />
          <PreviewComponent />
        </div>
      </div>
    );
  };
};

const mapStateToProps = ({ windows }) => ({
  windows
});

const mapDispatchToProps = (dispatch) => ({
  acWindows: bindActionCreators(acWindows, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);