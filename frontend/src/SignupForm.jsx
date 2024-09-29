import {useState} from 'react'
import userService from './services/userServices'
import { Button } from "antd";


const SignupForm = ({togglePage}) => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')

    const cusThrowError = async (eMsg) => {
        setError(eMsg)
        setTimeout(() => {setError('')}, 2000)
    }
    const handleSignup = async () => {
        if( password !== repPassword ){
            cusThrowError("Confirming password unmatches!")
            return
        }  
        const submitUser = {
            email, password, name, phoneNumber
        }
        try{
            const newUser = await userService.signup(submitUser)

            console.log('new User is ' + JSON.stringify(newUser))
            setEmail('')
            setPassword('')
            setRepPassword('')
            setPhoneNumber('')
            setName('')
            togglePage()
        }catch(e) {
            console.log(e)
            cusThrowError("something wrong")
        }
    }

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
                <button type='submit'> Signup </button>
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
}

export default SignupForm