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
    console.log('-получили', value)
    const { 
      setPreview
  } = this.props.acWindows;

    const params = {
      // url: 'https://www.bps-sberbank.by/Portal/public/deposit/catalog',
      // mothod: 'GET',
      // headers: {
      //   Accept: 'application/json'
      // }
      url: value.url,
      method: value.requestType,
    };

    API.processRequest(value).then((resolve, reject) => {
      if (resolve) {
        setPreview(resolve);
        showNotification('success', '', 'service processRequest');
      } else {
        showNotification('error', '', 'service processRequest')
      }
    });


    const par = {
      requestType: 'POST',
      url: 'http://localhost:4096/api/addNewRequest'
    }

    API.addNewRequest(par).then((resolve, reject) => {
      if (resolve) {
        showNotification('success', '', 'service addNewRequest');
      } else {
        showNotification('error', '', 'service addNewRequest')
      }
    })
  };


  render() {

    return (
      <div className='MainComponent'>
        <Notification />
        <HistoryComponent/>
        <div className="content">
          <DataInputComponent
            cbSendRequest={this.sendRequest}
          />
          <PreviewComponent/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);