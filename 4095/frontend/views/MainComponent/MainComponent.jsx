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
    
  };

  sendRequest = (value) => {
    console.log('-получили', value)

    API.getTestRequest().then((resolve, reject) => {
            
      if(resolve){
          console.log('Успех', resolve.data);
          showNotification('success', '', 'тест')
      }else{
          console.log('Жопэ', reject)
          showNotification('error', 'test body', 'test title')
      }
  });
  };

  render() {
    return (
      <div className='MainComponent'>
        <Notification/>
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