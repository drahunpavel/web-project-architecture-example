import React, { PureComponent, Fragment } from 'react';

import DataInputComponent from '../DataInputComponent/DataInputComponent';
import HistoryComponent from '../HistoryComponent/HistoryComponent';
import PreviewComponent from '../PreviewComponent/PreviewComponent';
import Notification from '../Notification/Notification';

//utils
import { API } from '../../network/API';
import { showNotification } from '../../utils/notification';

import('./MainComponent.scss');

export default class MainComponent extends PureComponent {

  state = {
    selectedObj: {},
    answer: {}
  };

  sendRequest = (value) => {
    console.log('-получили', value)

    const params = {
      // url: 'https://www.bps-sberbank.by/Portal/public/deposit/catalog',
      // mothod: 'GET',
      // headers: {
      //   Accept: 'application/json'
      // }
      url: value.url,
      method: value.requestType,
    };

    API.processRequest(params).then((resolve, reject) => {
      if (resolve) {
        console.log('Успех', resolve.data);
        this.setState({answer: resolve})
        showNotification('success', '', 'service processRequest');
      } else {
        showNotification('error', '', 'service processRequest')
      }
    });
  };

  singleClick = (selectedObj) => {
    this.setState({ selectedObj })
  };

  render() {
    const { selectedObj, answer } = this.state;

    return (
      <div className='MainComponent'>
        <Notification />
        <HistoryComponent
          cbSingleClick={this.singleClick}
        />
        <div className="content">
          <DataInputComponent
            cbSendRequest={this.sendRequest}
            selectedObj={selectedObj}
          />
          <PreviewComponent 
            answer={answer}
          />
        </div>
      </div>
    );
  };
};