import { Form, Input, Button, Checkbox, Select, Tooltip } from 'antd';
import { connect } from 'umi';

const GameForm = ({ dispatch }) => {
  //layout is umi css styling for components
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 4 },
  };

  const onFinish = (formValues) => {
    //UMI Form component gets the values from the form for us
    const payload = {
      //playerid to find player in DB
      playerid: `${formValues.playerId}`,
    }; //we set current gameId in localStorage
    console.log('onSubmit: ', payload);
    dispatch({ type: 'playerInfo/fetch', payload });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed Submit:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label={
          <Tooltip title="Example: ~0a72nh883a3acwoguouymgw" color={'blue'}>
            Player ID
          </Tooltip>
        }
        name="playerId"
        rules={[
          { required: true, message: 'Please input a player ID. i.e. ~0a72nh883a3acwoguouymgw' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect()(GameForm);
