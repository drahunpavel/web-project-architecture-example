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
    selectedObj: {}
  };

  sendRequest = (value) => {
    console.log('-получили', value)

    const params = {
      url: 'https://www.bps-sberbank.by/Portal/public/deposit/catalog',
      mothod: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };

    API.processRequest(params).then((resolve, reject) => {

      if (resolve) {
        console.log('Успех', resolve.data);
        showNotification('success', '', 'тест')
      } else {
        console.log('Жопэ', reject)
        showNotification('error', 'test body', 'test title')
      }
    });
  };

  singleClick = (selectedObj) => {
    this.setState({selectedObj})
  };

  render() {
    const { selectedObj } = this.state;

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
          <PreviewComponent />
        </div>
      </div>
    );
  };
};