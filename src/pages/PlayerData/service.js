import request from '@/utils/request';
/*
Backend API-Server response: 
  when valid 202: {status:..., message:... , data: {item:...} }
  when error 4XX: {status:... , msg:... } no data prop 
  */
const SERVER_URL = 'https://strapi-backend-kmp.herokuapp.com';

export async function queryPlayerDetail(payload) {
  //note that gameid is in the headers of each request, thats to 'utils/request'
  const { playerid } = payload;
  let url = `${SERVER_URL}/playerinfos/${playerid}`;
  try {
    const result = await request(url, {
      method: 'get',
    });
    console.log('queryPlayerDetail result: ', result);
    return result;
  } catch (err) {
    console.log('queryPlayerDetail unsuccessful, msg: ', err);
    return {};
  }
}

export async function updatePlayer(payload) {
  //note that gameid is in the headers of each request, thats to 'utils/request'
  //console.log('update payload: ', payload);
  try {
    const { updateInfo, playerid } = payload;
    const result = await request(`${SERVER_URL}/playerinfos/${playerid}`, {
      method: 'put',
      data: { ...updateInfo },
    }); //for updateInfo, pass in one key/value pair to be updated
    console.log('update player result: ', result);
    return result;
  } catch (err) {
    console.log('update Player unsuccessful, msg ', err);
    return {};
  }
}
