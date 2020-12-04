import React from 'react';
import ReactJson from 'react-json-view'; //outside API
import { connect } from 'umi';
import { Card } from 'antd';
import _ from 'lodash';

//react-json-view API: https://www.npmjs.com/package/react-json-view
/*  
interface ReactJsonView_Input {
  existing_src: any;
  existing_value: any;
  //namespace is the pre-path of our prop. Always starts with ["Item",...] 
  //i.e. if inventory.stars being changed, ["Item", "inventory"]. Root level change, only ["Item"]
  //namespace is the prop being changed, i.e. "stars"
  name: string; 
  namespace: Array<string>; 
  new_value: any;
  updated_src: any;
  __proto__?: Object;
}*/

const jsonviewer = ({ playerInfo, displayMsg, dispatch }) => {
  const { msg, style } = displayMsg;

  function edit(edit) {
    const { updated_src } = edit; //from API, this prop gives us the full updated JSON
    const payload = {
      //current playerInfo ID is in your state
      playerid: playerInfo.id,
      updateInfo: { ...updated_src },
    };
    dispatch({
      type: 'playerInfo/update',
      payload,
    });
  }
  function addEdit(edit) {
    //TODO
    console.log('addEdit: ', edit);
  }
  function deleteEdit(edit) {
    //TODO
    console.log('deleteEdit: ', edit);
  }
  return (
    <Card title={msg} bordered={true} headStyle={style}>
      {!_.isEmpty(playerInfo) && (
        <ReactJson
          src={playerInfo}
          onEdit={edit}
          // onAdd={addEdit}
          // onDelete={deleteEdit}
          enableClipboard={false}
        />
      )}
    </Card>
  );
};

export default connect(({ playerInfo }) => ({
  playerInfo: playerInfo.data,
  displayMsg: playerInfo.displayMsg,
}))(jsonviewer);
