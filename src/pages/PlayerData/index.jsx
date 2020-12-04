import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import GameForm from './components/GameForm';
import JsonViewer from './components/jsonviewer';

class PlayerData extends Component {
  //const { mode, selectKey } = this.state;
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <GameForm />
          <JsonViewer />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PlayerData;
