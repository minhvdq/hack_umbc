import { Button, Form, Input, Typography } from 'antd';

const LoginForm = ({togglePage, handleLogin, email, password, handleEmail, handlePassword, error })=> {
  const { Title } = Typography;

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item>
        <Title>
          Welcome back!
        </Title>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        id="inputEmail"
        onChange={handleEmail}
        value={email}
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        id="inputPassword"
        onChange={handlePassword}
        value={password}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="Password@123" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="link" htmlType="submit" onClick={togglePage}>
          Don't have an account?
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={handleLogin}>
          Sign up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm