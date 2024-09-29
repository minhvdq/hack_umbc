import { useState, useEffect} from 'react'
import AuthForm from './AuthForm'
import userService from './services/userServices'
import customStorage from './services/customStorage'
import SignupForm from './SignupForm'
import MainPageSupplier from './MainPageSupplier'

function App() {
  const [curUser, setCurUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  //const [logged, setLogged] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const loggedUser = customStorage.getItem('localUser')
    if(loggedUser){
      const lUser = JSON.parse(loggedUser)
      setCurUser(lUser)
      setEvents(lUser.events)
    }
  },[])

  const handlePassword = (event) => {
    setPassword(event.target.value)
    console.log(event.target.value)
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
    console.log(event.target.value)
  }
  const handleLogin = async(event) => {
    event.preventDefault();
    try{
      const logUser = await userService.login({email: email, password})

      console.log("user logged ", logUser)
      setEvents(logUser.events)

      //handle logging in
      setCurUser(logUser);
      customStorage.setItem('localUser', JSON.stringify(logUser));
      console.log(logUser)
      setUsername('');
      setPassword('');

    }catch{
      setError('Wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setCurUser(null)
    setEmail('')
    setPassword('')
  }

  const loginForm = () => {
    return(
      <div>
        <AuthForm 
          handleLogin={handleLogin} 
          email={email} password={password} 
          handleEmail={handleEmail} 
          handlePassword={handlePassword} 
          error={error}
        /> 

      </div>
    )
  }

  const mainPage = () => {
    return(
      <div>
        <MainPageSupplier events= {events} handleLogout={handleLogout} />
      </div>
    )
  }

  return (
    <>
      <div>
        {curUser == null && loginForm()} 
        {curUser != null && mainPage()}
      </div>
    </>
  )
}

export default App