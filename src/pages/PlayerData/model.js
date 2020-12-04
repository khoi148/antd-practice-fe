import { queryPlayerDetail, updatePlayer } from './service';

//COLORS from UMI convention: https://ant.design/docs/spec/colors#header
const COLORS = {
  red: '#f5222d',
  blue: '#1890ff',
  green: '#52c41a',
};

const Model = {
  namespace: 'playerInfo',
  state: {
    data: {},
    displayMsg: {
      msg: 'Search for a player!',
      style: {
        color: COLORS.blue,
      },
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPlayerDetail, payload);
      //console.log('fetch resp status: ', response.status);
      const result =
        response && Object.keys(response).length > 0 && response.status === undefined
          ? response
          : {};
      yield put({
        type: 'listPlayer',
        payload: result,
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updatePlayer, payload);
      const result =
        response && Object.keys(response).length > 0 && response.status === undefined
          ? response
          : {};
      console.log('update response', result);
      // const result = yield call(queryPlayerDetail, payload); //get latest DB attributes
      yield put({
        type: 'listPlayer',
        payload: result,
      });
    },
  },
  reducers: {
    listPlayer(state, action) {
      console.log('action log', action);
      return {
        //set the current json being viewed. Player is found if prop data.Item exists
        ...state,
        data: action.payload,
        displayMsg: {
          msg:
            action.payload && Object.keys(action.payload).length > 0
              ? '200: Player Found'
              : '404: No Player Found',
          style: {
            color:
              action.payload && Object.keys(action.payload).length > 0 ? COLORS.green : COLORS.red,
          },
        },
      };
    },
  },
};
export default Model;
