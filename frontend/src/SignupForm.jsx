import { useState } from 'react'
import userService from './services/userServices'
import { Button, Form, Input, Typography } from 'antd';

const { Title } = Typography;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignupForm = ({ togglePage }) => {
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

<<<<<<< Updated upstream
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
=======
    return (
        <div >
          <div >
            <div >
              <p style={{fontFamily: "Courier New, Courier, monospace", fontWeight: "600", textAlign: "center"}}>Welcome new user!</p></div>
              <div >
              <button type="button" onClick={togglePage} style={{padding: "0"}}>Signin</button><div className="p-1" >Already had an account?</div>
              </div>
            <form onSubmit={handleSignup}>
              <div>
                <label htmlFor="inputEmail">Email address</label>
                <div >
                  <input type="text" id="inputEmail" placeholder="name@example.com" value={email} onChange={(e) => {e.preventDefault(); setEmail(e.target.value)}} required />
                </div>
              </div>
              <div >
                <label htmlFor="inputPassword" >Password</label>
                <div >
                  <input type="text" id="inputPassword" aria-describedby="passwordHelpInline" placeholder='Your Password' value={password} onChange={(e) => {e.preventDefault(); setPassword(e.target.value)}} required />
                </div>
              </div>
              <div >
                <label htmlFor="inputConfirmPassword" >Confirm Password</label>
                <div >
                  <input type="text" id="inputConfirmPassword" aria-describedby="passwordHelpInline" placeholder='Confirm Your Password' value={repPassword} onChange={(e) => {e.preventDefault(); setRepPassword(e.target.value)}} required />
                </div>
              </div>
              <div>
                <label htmlFor="inputName">Name</label>
                <div >
                  <input type="text" id="inputName" placeholder="Robert Tran" value={name} onChange={(e) => {e.preventDefault(); setName(e.target.value)}} required />
                </div>
              </div>
              <div>
                <label htmlFor="inputPhoneNumber">Phone Number</label>
                <div >
                  <input type="text" id="inputPhoneNumber" placeholder="Phone number" value={phoneNumber} onChange={(e) => {e.preventDefault(); setPhoneNumber(e.target.value)}} required />
                </div>
              </div>
              <div>
                <button className='btn btn-primary' type='submit'> Signup </button>
                <div>
                  <div>
                      {error}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
>>>>>>> Stashed changes
}

export default SignupForm