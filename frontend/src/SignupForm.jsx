import { useState } from 'react'
import userService from './services/userServices'
import { Button, Form, Input, Typography } from 'antd';

const SignupForm = ({ togglePage }) => {
  const { Title } = Typography;

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')

  const cusThrowError = async (eMsg) => {
    setError(eMsg)
    setTimeout(() => { setError('') }, 2000)
  }
  const handleSignup = async (values) => {
    console.log(values);
    if (values.password !== values.repPassword) {
      cusThrowError("Confirming password unmatches!")
      return
    }
    setEmail(values.email)
    setPhoneNumber(values.phoneNumber)
    setName(values.name)
    setPassword(values.password)

    const submitUser = {
      email, password, name, phoneNumber
    }
    try {
      const newUser = await userService.signup(submitUser)

      console.log('new User is ' + JSON.stringify(newUser))
      setEmail('')
      setPassword('')
      setRepPassword('')
      setPhoneNumber('')
      setName('')
      togglePage()
    } catch (e) {
      console.log(e)
      cusThrowError("something wrong")
    }
  }

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
          Welcome new user!
        </Title>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        id="inputName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        id="inputPhoneNumber"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        id="inputEmail"
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
        label="Confirm Password"
        name="confirmPassword"
        id="inputConfirmPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
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
          Already have an account?
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={(e) => handleSignup(e.values)}>
          Sign up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignupForm