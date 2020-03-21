import React, { PureComponent, Fragment } from 'react';

import DataInputComponent from '../DataInputComponent/DataInputComponent';
import HistoryComponent from '../HistoryComponent/HistoryComponent';
import PreviewComponent from '../PreviewComponent/PreviewComponent';

import { API } from '../../network/API';


import('./MainComponent.scss');

export default class MainComponent extends PureComponent {

  state = {
    
  };

  sendRequest = (value) => {
    console.log('-получили', value)

    API.getTestRequest().then((resolve, reject) => {
            
      if(resolve){
          console.log('Успех', resolve.data);
      }else{
          console.log('Жопэ', reject)
      }
  });
  };

  render() {
    return (
      <div className='MainComponent'>
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