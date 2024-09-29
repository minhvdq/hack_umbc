

const LoginForm = ({togglePage, handleLogin, email, password, handleEmail, handlePassword, error })=> {
  return(
      <div>
        <div>
          <div>
            <p style={{fontFamily: "Courier New, Courier, monospace", fontWeight: "600", textAlign: "center"}}>Welcome back!</p></div>
            <div >
            <button type="button" onClick={togglePage} style={{padding: "0"}}>Signup</button><div className="p-1" >Don't have an account?</div>
            </div>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <div>
                <input type="email" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={handleEmail} required />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="inputPassword">Password</label>
                <div>
                  <input type="password" id="inputPassword" aria-describedby="passwordHelpInline" placeholder='Your Password' value={password} onChange={handlePassword} required />
                </div>
              </div>
            </div>
            <div>
              <button type='submit'> login </button>
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

export default LoginForm