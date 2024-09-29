import { useState, useEffect} from 'react'
import AuthForm from './AuthForm'
import userService from './services/userServices'
import customStorage from './services/customStorage'
import SignupForm from './SignupForm'
import MainPageSupplier from './MainPageSupplier'
import eventService from './services/eventService'

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
    console.log('user', JSON.stringify(loggedUser))
    if(loggedUser){
      const lUser = (loggedUser)
      console.log('luser', lUser)
      setCurUser(lUser)
      console.log("asdjajld", lUser.events)
      userService.getUserEvents(lUser.events).then(e => {
        console.log("data ", e)
        setEvents(e)
      })
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
      setCurUser(logUser);
      customStorage.setItem('localUser', logUser)
      console.log('log ', logUser)
      const fetchEvents = await userService.getUserEvents(logUser.events)
      console.log('fetch ',fetchEvents)
      setEvents(fetchEvents)

      //handle logging in
      setUsername('')
      setPassword('')

    }catch{
      setError('Wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleAddEvent = (ev) => {
    const newEvents = [...curUser.events, ev]; // Create a new array with the existing events and the new event ID
    const newCurUser = {...curUser, events: newEvents}; // Update the curUser with the new events array
    console.log('new local user is ', newCurUser.data);
    window.localStorage.clear()
    customStorage.setItem('localUser', newCurUser); // Store the updated user object
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
        <MainPageSupplier events={events} handleLogout={handleLogout} userId={curUser.id} handleAddEvent={handleAddEvent} />
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