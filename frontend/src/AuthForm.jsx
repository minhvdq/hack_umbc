import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useState } from "react";

const AuthForm = ({ handleLogin, email, password, handleEmail, handlePassword, error }) => {
  const [inLogin, setInLogin] = useState(true)

  const togglePage = (e) => {
    e.preventDefault()
    setInLogin(!inLogin)
  }

  return (
    <div>
      <div >
        {inLogin ? <LoginForm togglePage={togglePage} handleLogin={handleLogin} email={email} password={password} handleEmail={handleEmail} handlePassword={handlePassword} error={error}/> : <SignupForm togglePage={togglePage} />}
      </div>
    </div>
  )
}
AuthForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEmail: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired
}

export default AuthForm