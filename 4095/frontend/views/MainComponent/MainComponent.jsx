import React, { PureComponent, Fragment } from 'react';

import DataInputComponent from '../DataInputComponent/DataInputComponent';
import HistoryComponent from '../HistoryComponent/HistoryComponent';
import PreviewComponent from '../PreviewComponent/PreviewComponent';

import('./MainComponent.scss');

export default class MainComponent extends PureComponent {
  render() {
    return (
      <div className='MainComponent'>
        <HistoryComponent/>
        <div className="content">
          <DataInputComponent/>
          <PreviewComponent/>
        </div>
      </div>
    );
  };
};